import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material';
import { GetConstantPipe } from './../../../shared/pipes/get-constant.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionHistoriesComponent } from './action-histories.component';

describe('ActionHistoriesComponent', () => {
    let component: ActionHistoriesComponent;
    let fixture: ComponentFixture<ActionHistoriesComponent>;

    const userData = {id: 902, action: 'login', datetime: '2020-01-14T11:21:56', app_name: 'team', version: '2.7.9-alpha',
                        platform: 'android', lat: '28.4793359', long: '77.0900794', os: '9', vendor: 'samsung', model: 'SM-M205F',
                        user: 1};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActionHistoriesComponent, GetConstantPipe],
            imports: [MatSnackBarModule, HttpClientModule, RouterModule, RouterTestingModule],
            providers: []
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActionHistoriesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call openMap()', () => {
        component.actionHistoriesList = [userData];
        component.openMap(userData);

        expect(component.openMap).toBeTruthy();
    });
});
