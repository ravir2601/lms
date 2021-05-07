import { UnrService } from './../../unr.service';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatSnackBarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AuthNoticeComponent } from './../../../views/pages/auth/auth-notice/auth-notice.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFunctionalityComponent } from './add-functionality.component';

describe('AddFunctionalityComponent', () => {
    let component: AddFunctionalityComponent;
    let fixture: ComponentFixture<AddFunctionalityComponent>;
    const infoDataSet = {info: {id: 1, update_url: 'http://stagls.loansimple.in/api/v1/unr/functionalities/1/',
                            permissions: ['crm_lead_transfer_mail_receives'], code: 'LS-FUNC001', name: 'Ajay'},
                            actionType: 'UPDATE' };

    const bottomSheetRefMock = { dismiss: () => { } };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddFunctionalityComponent, AuthNoticeComponent],
            imports: [ FormsModule, RouterTestingModule, RouterModule, HttpClientModule, MatSnackBarModule],
            providers: [{ provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }, { provide: MatBottomSheetRef, useValue: bottomSheetRefMock},
                        UnrService
                    ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddFunctionalityComponent);
        component = fixture.componentInstance;

    });

    it('should create', () => {
        // fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should call ngOnInit', () => {
        spyOn(component, 'ngOnInit');
        component.ngOnInit();
        expect(component.ngOnInit).toHaveBeenCalled();
    });

    it('should call evalutePermissionsFields when evaluteRequest is called and actionType is UPDATE and set values', () => {
        spyOn(component, 'evalutePermissionsFields');
        component.infoDataSet = infoDataSet;
        component.evaluteRequest();

        expect(component.evaluteRequest).toBeTruthy();
        expect(component.evalutePermissionsFields).toHaveBeenCalled();
        expect(component.name).toBe(infoDataSet.info.name);
        expect(component.unique_code).toBe(infoDataSet.info.code);
        expect(component.selectedPermissions).toBe(infoDataSet.info.permissions);
    });

    it('should call dismiss', () => {
        // spyOn(component, 'dismiss');
        const button = fixture.debugElement.nativeElement.querySelector('button');
        button.click();
        expect(component.dismiss).toBeTruthy();
    });

    it('should call addNewDepartment when actionType is ADD', () => {
        spyOn(component, 'addNewFunctionality');
        component.infoDataSet.actionType = 'ADD';
        component.assignFuctionality();

        expect(component.addNewFunctionality).toHaveBeenCalled();
    });

    it('should call addNewDepartment when actionType is UPDATE', () => {
        spyOn(component, 'updateNewFunctionality');
        component.infoDataSet.actionType = 'UPDATE';
        component.assignFuctionality();

        expect(component.updateNewFunctionality).toHaveBeenCalled();
    });
});
