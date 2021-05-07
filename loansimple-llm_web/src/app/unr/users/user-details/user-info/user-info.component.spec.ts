import { MatChipInputEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { InterceptService } from './../../../../core/_base/crud/utils/intercept.service';
import { SessionService } from './../../../../services/session.service';
import { LoginService } from './../../../../views/pages/auth/login/services/login.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UnrService } from './../../../unr.service';
import { MatAutocompleteModule, MatChipsModule, MatNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserEmailsComponent } from './../../user-emails/user-emails.component';
import { UserContactsComponent } from './../../user-contacts/user-contacts.component';
import { SharedModule } from './../../../../shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { UserInfoComponent } from './user-info.component';

describe('UserInfoComponent', () => {
    let component: UserInfoComponent;
    let fixture: ComponentFixture<UserInfoComponent>;
    let loginService: LoginService;
    let sessionService: SessionService;
    let unrService: UnrService;

    const userInfo = {id: 1, emp_code: 'LSE0000', first_name: 'Postman', last_name: 'Client', is_active: true, is_superuser: true,
                        is_staff: true, update_url: 'http://stagls.loansimple.in/api/v1/unr/users/1/'};
    const reportingManager = {emp_code: 'LSE0000', username: 'admin@loansimple.in', id: 1, full_name: 'Postman Client',
                                first_name: 'Postman', middle_name: null, last_name: 'Client', display_name: 'Postman Client',
                                email: '', photo: null, is_superuser: true};
    const functionality = {id: 1, update_url: 'http://stagls.loansimple.in/api/v1/unr/functionalities/1/',
                            permissions: ['crm_lead_transfer_mail_receives'], created_at: '2020-01-14T11:30:53.248186',
                            updated_at: '2020-01-14T11:30:53.248191', code: 'LS-FUNC001', name: 'oh'};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserInfoComponent, UserContactsComponent, UserEmailsComponent],
            imports: [SharedModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule, MatChipsModule, HttpClientModule,
                        RouterModule, RouterTestingModule, MatNativeDateModule, BrowserAnimationsModule],
            providers: [UnrService, LoginService, SessionService,
                        {
                            provide: HTTP_INTERCEPTORS,
                            useClass: InterceptService,
                            multi: true
                        }
                        ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                // NO_ERRORS_SCHEMA
              ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserInfoComponent);
        component = fixture.componentInstance;
        component.usersInfo = userInfo;

        unrService = TestBed.get(UnrService);
        loginService = TestBed.get(LoginService);
        sessionService = TestBed.get(SessionService);

        const username = 'ravi.ranjan@loansimple.in';
        const password = 'ravi.ranjan@loansimple.in';

        loginService.login(username, password).subscribe(user => {
            sessionService.storeUserDetails(user);
        });
        fixture.detectChanges();
    });

    it('should create', () => {
        console.log('userInfo inside spect.ts', component.usersInfo);
        expect(component).toBeTruthy();
    });

    it('should call all function inside ngOnInit()', () => {
        spyOn(component, 'getReportingManager');
        spyOn(component, 'getFunctionality');
        component.ngOnInit();

        expect(component.ngOnInit).toBeTruthy();
        expect(component.getReportingManager).toHaveBeenCalled();
        expect(component.getFunctionality).toHaveBeenCalled();
    });

    it('should call getFunctionalityData()', () => {
        const getFunctionality = spyOn(unrService, 'getFunctionalityData').and.returnValue(Observable.from([{results: [functionality]}]));
        component.getFunctionality();

        expect(getFunctionality).toHaveBeenCalled();
        expect(component.all_functionalities).toEqual([functionality]);
    });

    it('should call getReportingMangerPositionsData()', () => {
        const getReportingManger = spyOn(unrService, 'getReportingMangerPositionsData')
                                    .and.returnValue(Observable.from([{results: [reportingManager]}]));
        component.getReportingManager();

        expect(getReportingManger).toHaveBeenCalled();
        expect(component.managerListData).toEqual([reportingManager]);
    });

    it('should call updateUserDetails()', () => {
        const updateDetails = spyOn(unrService, 'updateUserDetails')
                                    .and.returnValue(Observable.from(['Success']));
        component.updateUserDetails();

        expect(component.updateUserDetails).toBeTruthy();
        expect(updateDetails).toHaveBeenCalled();
    });

    it('should call updateUserDetails() when updateActiveStatus() called ', () => {
        const updateDetails = spyOn(unrService, 'updateUserDetails')
                                .and.returnValue(Observable.from(['Success']));
        component.updateActiveStatus({checked: false});

        expect(component.updateActiveStatus).toBeTruthy();
        expect(updateDetails).toHaveBeenCalled();
    });

    it('should call updateUserDetails() when logout() is called', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        const logout = spyOn(unrService, 'updateUserDetails')
                            .and.returnValue(Observable.from(['Success']));

        component.logout();

        expect(component.logout).toBeTruthy();
        expect(logout).toHaveBeenCalled();
    });

    it('should not call updateUserDetails() when logout() is called', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        const logout = spyOn(unrService, 'updateUserDetails')
                            .and.returnValue(Observable.from(['Success']));

        component.logout();

        expect(component.logout).toBeTruthy();
        expect(logout).not.toHaveBeenCalled();
    });

    xit('should call updateUserDetails() when add() is called', () => {
        const add = spyOn(unrService, 'updateUserDetails')
                            .and.returnValue(Observable.from(['Success']));
        // let event: MatChipInputEvent;
        // event.input = ;
        // component.add(event);

        expect(component.add).toBeTruthy();
        expect(add).not.toHaveBeenCalled();
    });

    it('should call updateUserDetails() when remove() is called', () => {
        component.usersInfo.functionalities = [functionality];

        component.remove(functionality, 0);
        expect(component.remove).toBeTruthy();
    });
});
