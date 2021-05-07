import { Observable } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserEmailsComponent } from './../user-emails/user-emails.component';
import { UserContactsComponent } from './../user-contacts/user-contacts.component';
import { ActionHistoriesListComponent } from './action-histories-list/action-histories-list.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UnrService } from './../../unr.service';
import { SharedModule } from './../../../shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatAutocompleteModule, MatNativeDateModule, MatChipsModule } from '@angular/material';

import { UserDetailsComponent } from './user-details.component';

describe('UserDetailsComponent', () => {
    let component: UserDetailsComponent;
    let fixture: ComponentFixture<UserDetailsComponent>;
    let unrService: UnrService;

    const userDetails = {id: 1, full_name: 'Postman Client', display_name: 'Postman Client', emp_code: 'LSE0000',
                        username: 'admin@loansimple.in', first_name: 'Postman', last_name: 'Client', is_active: true,
                        is_superuser: true, is_staff: true};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserDetailsComponent, UserInfoComponent, ActionHistoriesListComponent, UserContactsComponent,
                            UserEmailsComponent],
            imports: [SharedModule, FormsModule, HttpClientModule, RouterModule, RouterTestingModule, BrowserAnimationsModule,
                        MatAutocompleteModule, ReactiveFormsModule, MatNativeDateModule, MatChipsModule],
            providers: [UnrService],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                // NO_ERRORS_SCHEMA
              ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserDetailsComponent);
        component = fixture.componentInstance;
        component.userId = '1';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call ngOnInit() then loadInitalData()', () => {
        spyOn(component, 'ngOnInit');
        component.ngOnInit();
        expect(component.ngOnInit).toHaveBeenCalled();
        expect(component.loadInitalData).toBeTruthy();
    });

    it('should call getNextPageData()', () => {
        unrService = TestBed.get(UnrService);
        const nextPageData = spyOn(unrService, 'getNextPageData').and.returnValue(Observable.from([userDetails]));
        component.loadInitalData();

        expect(nextPageData).toHaveBeenCalled();
        expect(component.usersInfo).toBe(userDetails);
    });

    it('should call current tab and check tab', () => {
        // component.changeCurrentTab('action-histories');
        const button = fixture.debugElement.nativeElement.querySelector('li');
        button.click();

        expect(component.changeCurrentTab).toBeTruthy();
        expect(component.currentTab).toBe('details');
    });
});

