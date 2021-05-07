// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { SessionService } from '../../../services/session.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private sessionService: SessionService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.sessionService.isLoggedIn()) {
            return true;
        } else {
            return this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        }
    }
}
