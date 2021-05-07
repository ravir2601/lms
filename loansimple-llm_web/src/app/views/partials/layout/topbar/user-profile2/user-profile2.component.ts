// Angular
import {Component, Input, OnInit} from '@angular/core';
// RxJS
import {Observable} from 'rxjs';
// NGRX
import {select, Store} from '@ngrx/store';
// State
import {AppState} from '../../../../../core/reducers';
import {currentUser, User} from '../../../../../core/auth';
import {SessionService} from '../../../../../services/session.service';
import {Router} from '@angular/router';
import { CommonService } from '../../../../../services/common.service';

@Component({
    selector: 'kt-user-profile2',
    templateUrl: './user-profile2.component.html',
})
export class UserProfile2Component implements OnInit {
    // Public properties
    user$: Observable<User>;
    userData = {};

    @Input() avatar = true;
    @Input() greeting = true;
    @Input() badge: boolean;
    @Input() icon: boolean;

    /**
     * Component constructor
     *
     * @param store: Store<AppState>
     */
    constructor(
        private store: Store<AppState>,
        private sessionService: SessionService,
        private commonService: CommonService,
        private router: Router
    ) {
    }

    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */

    /**
     * On init
     */
    ngOnInit(): void {
        this.user$ = this.store.pipe(select(currentUser));
        this.userData = this.sessionService.getUserDetails();
    }

    /**
     * Log out
     */
    logout() {
        this.commonService.confirm('Do you really want to Logout?', () => {
            return this.sessionService.logout();
        });
    }
}
