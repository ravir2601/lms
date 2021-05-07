import { GetConstantPipe } from '../../../shared/pipes/get-constant.pipe';
import { ActionHistoriesComponent } from './action-histories/action-histories.component';
import { ActionHistoriesPopupComponent } from './action-histories-popup/action-histories-popup.component';
import { FormsModule } from '@angular/forms';
import { AuthNoticeComponent } from '../../../views/pages/auth/auth-notice/auth-notice.component';
import { AddUserComponent } from './add-user/add-user.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Observable } from 'rxjs';
import { By } from '@angular/platform-browser';
import { LoginService } from '../../../views/pages/auth/login/services/login.service';
import { SessionService } from '../../../services/session.service';
import { InterceptService } from '../../../core/_base/crud/utils/intercept.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicOverlayContainer } from '../../../services/overlay/dynamic-overlay-container.service';
import { DynamicOverlay } from '../../../services/overlay/dynamic-overlay.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FiService } from './../unr.service';
import { ClassPipe } from '../../../shared/pipes/class.pipe';
import { MatPaginatorModule, MatBottomSheetModule, MatSnackBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
    let component: UsersComponent;
    let fixture: ComponentFixture<UsersComponent>;
    let unrService: FiService;
    let loginService: LoginService;
    let sessionService: SessionService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                            UsersComponent, AddUserComponent, AuthNoticeComponent, ActionHistoriesPopupComponent,
                            ActionHistoriesComponent, ClassPipe, GetConstantPipe
                          ],
            imports: [
                        RouterModule, RouterTestingModule, MatPaginatorModule, MatBottomSheetModule, HttpClientModule,
                        MatSnackBarModule, BrowserAnimationsModule, FormsModule
                     ],
            providers: [ FiService, DynamicOverlay, DynamicOverlayContainer, LoginService, SessionService,
                            {
                                provide: HTTP_INTERCEPTORS,
                                useClass: InterceptService,
                                multi: true
                            }
                        ]
        })
        .overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [AddUserComponent, ActionHistoriesPopupComponent],
                exports: [RouterModule]
            }
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UsersComponent);
        component = fixture.componentInstance;
        loginService = TestBed.get(LoginService);
        sessionService = TestBed.get(SessionService);
        unrService = TestBed.get(FiService);
        const username = 'admin@loansimple.in';
        const password = 'admin';

        loginService.login(username, password).subscribe(user => {
            sessionService.storeUserDetails(user);
        });
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call getList() when ngOnInit() is called', () => {
        spyOn(component, 'getList');
        component.ngOnInit();
        expect(component.getList).toHaveBeenCalled();
    });

    it('should call getUsers() when getList() is called', () => {
        const getUser = spyOn(unrService, 'getUsers').and.returnValue(Observable.from([]));
        component.getList();

        expect(getUser).toHaveBeenCalled();
    });

    it('should call search', () => {
        spyOn(component, 'search');

        const button = fixture.debugElement.query(By.css('input'));
        button.triggerEventHandler('keyup.enter', null);
        fixture.detectChanges();

        expect(component.search).toHaveBeenCalled();
    });

    it('should call getList() when seach() is called', () => {
        spyOn(component, 'getList');
        component.search('searchString');

        expect(component.getList).toHaveBeenCalled();
        expect(component.options.page).toBe(1);
        expect(component.options.search).toBe('searchString');
    });

    it('should call paginate()', () => {
        const data = { previousPageIndex: 0, pageIndex: 1, pageSize: 15, length: 19 };
        component.paginate(data);

        expect(component.paginate).toBeTruthy();
        expect(component.options.page_size).toBe(data.pageSize);
        expect(component.options.page).toBe(data.pageIndex + 1);
    });

    it('should call openUserForm()', () => {
        const button = fixture.debugElement.nativeElement.querySelector('button');
        button.click();
        expect(component.openUserForm).toBeTruthy();
    });

    it('should call openActionHistories()', () => {
        const user = { id: 1, full_name: 'Postman Client', emp_code: 'LSE0000', username: 'admin@loansimple.in',
                        is_active: true, reporting_manager: null, primary_email: {email: 'dgfhhf@yahoo.co.in'},
                        primary_mobile: {mobile: '09761604698'}};

        component.openActionHistories(user);
        expect(component.openActionHistories).toBeTruthy();
    });
});
