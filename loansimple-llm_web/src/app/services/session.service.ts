import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private sessionId: string;
    private userDetails: object;

    constructor(private router: Router) {
    }

    getSessionId() {
        return this.sessionId || localStorage.getItem('sessionId') || '';
    }

    setSessionId(sessionId) {
        this.sessionId = sessionId;
    }

    storeUserDetails(user) {
        this.setSessionId(user.sessionid);
        this.storeSessionIdInCookies(user);
        if (!user.photo) {
            user.photo = environment.assets_root_host + '/placeholders/avatars/' + user.user.full_name[0].toLowerCase() + '.png';
        }
        localStorage.setItem('user', JSON.stringify(user));
        this.userDetails = user.user;
    }

    getUserDetails() {
        let data = null;
        try {
            data = JSON.parse(localStorage.getItem('user'));
        } catch {
            data = {};
        }
        return data;
    }

    storeSessionIdInCookies(param) {
        localStorage.setItem('sessionId', param.sessionid);
    }

    isLoggedIn() {
        return localStorage.getItem('sessionId') ? true : false;
    }

    logout() {
        localStorage.removeItem('sessionId');
        localStorage.removeItem('user');
        return this.router.navigate(['/auth/login']).finally();
    }
}
