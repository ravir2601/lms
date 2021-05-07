import { Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UnrService } from './../../unr.service';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { SharedModule } from './../../../shared/shared.module';
import { ActionHistoriesComponent } from './../action-histories/action-histories.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionHistoriesPopupComponent } from './action-histories-popup.component';

describe('ActionHistoriesPopupComponent', () => {
    let component: ActionHistoriesPopupComponent;
    let fixture: ComponentFixture<ActionHistoriesPopupComponent>;

    const userData = {id: 902, action: 'login', datetime: '2020-01-14T11:21:56', app_name: 'team', version: '2.7.9-alpha',
                        platform: 'android', lat: '28.4793359', long: '77.0900794', os: '9', vendor: 'samsung', model: 'SM-M205F',
                        user: 1};

    const bottomSheetRefMock = { dismiss: () => { } };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActionHistoriesPopupComponent, ActionHistoriesComponent],
            imports: [SharedModule, HttpClientModule, RouterModule, RouterTestingModule],
            providers: [{ provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }, { provide: MatBottomSheetRef, useValue: bottomSheetRefMock},
                            UnrService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActionHistoriesPopupComponent);
        component = fixture.componentInstance;
        component.userId = 1;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call loadActionHistories() when ngOnInit() is called', () => {
        spyOn(component, 'loadActionHistories');
        component.ngOnInit();

        expect(component.loadActionHistories).toHaveBeenCalled();
    });

    it('should userCurrentActionHistories() when loadActionHistories() is called', () => {
        const unrService: UnrService = TestBed.get(UnrService);
        const actionHistory = spyOn(unrService, 'userCurrentActionHistories').and.returnValue(Observable.from([userData]));
        component.loadActionHistories();
        expect(actionHistory).toHaveBeenCalled();
        expect(component.actionHistoriesList).toBe(userData);
    });

    it('should call dismiss()', () => {
        const button = fixture.debugElement.nativeElement.querySelector('button');
        button.click();
        expect(component.dismiss).toBeTruthy();
    });

});
