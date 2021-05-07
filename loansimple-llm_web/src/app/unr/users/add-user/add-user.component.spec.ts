import { AuthNoticeService } from './../../../core/auth/auth-notice/auth-notice.service';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UnrService } from './../../unr.service';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatSnackBarModule } from '@angular/material';
import { AuthNoticeComponent } from './../../../views/pages/auth/auth-notice/auth-notice.component';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';

describe('AddUserComponent', () => {
    let component: AddUserComponent;
    let fixture: ComponentFixture<AddUserComponent>;
    let unrService: UnrService;

    const bottomSheetRefMock = { dismiss: () => { } };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddUserComponent, AuthNoticeComponent],
            imports: [FormsModule, HttpClientModule, RouterModule, RouterTestingModule, MatSnackBarModule],
            providers: [{ provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }, { provide: MatBottomSheetRef, useValue: bottomSheetRefMock},
                        UnrService, AuthNoticeService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call dismiss()', () => {
        const button = fixture.debugElement.nativeElement.querySelector('button');
        button.click();
        expect(component.dismiss).toBeTruthy();
    });

    it('should call addNewUser()', () => {
        component.userName = 'ravi.kumar@loansimple.in';
        component.firstName = 'Ravi';
        component.lastName = 'Ranjan';

        unrService = TestBed.get(UnrService);
        spyOn(unrService, 'addNewUser');

        const button = fixture.debugElement.query(By.css('.btn'));
        button.triggerEventHandler('click', null);

        expect(component.addNewUser).toBeTruthy();
        expect(unrService.addNewUser).toHaveBeenCalled();
    });
});
