import { FormsModule } from '@angular/forms';
import { AuthNoticeComponent } from './../../views/pages/auth/auth-notice/auth-notice.component';
import { AddFunctionalityComponent } from './add-functionality/add-functionality.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/from';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBottomSheetModule, MatSnackBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UnrService } from './../unr.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalitiesComponent } from './functionalities.component';

describe('FunctionalitiesComponent', () => {
    let component: FunctionalitiesComponent;
    let fixture: ComponentFixture<FunctionalitiesComponent>;
    let unrService: UnrService;
    const baseUrl = 'http://stagls.loansimple.in/api/v1/unr/functionalities/?';
    const userDetail = {id: 1, update_url: 'http://stagls.loansimple.in/api/v1/unr/functionalities/1/',
                        permissions: ['crm_lead_transfer_mail_receives'], code: 'LS-FUNC001', name: 'Ajay'};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FunctionalitiesComponent, AddFunctionalityComponent, AuthNoticeComponent],
            imports: [ FormsModule, HttpClientModule, RouterTestingModule, RouterModule, MatBottomSheetModule, MatSnackBarModule,
                        BrowserAnimationsModule
                        ] ,
            providers: [UnrService]
        })
        .overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [AddFunctionalityComponent],
                exports: [RouterModule]
            }
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FunctionalitiesComponent);
        component = fixture.componentInstance;
        unrService = TestBed.get(UnrService);
        component.baseUrl = baseUrl;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call NgOnInit', () => {
        spyOn(component, 'ngOnInit');
        component.ngOnInit();
        expect(component.ngOnInit).toHaveBeenCalled();
    });

    it('should call loadInitalData', () => {
        spyOn(component, 'loadInitalData');
        component.ngOnInit();
        expect(component.loadInitalData).toHaveBeenCalled();
    });

    it('should call getNextPageData', () => {
        const pageData = spyOn(unrService, 'getNextPageData').and.returnValue(Observable.from(['Success']));
        component.loadInitalData();
        expect(pageData).toHaveBeenCalled();
        expect(component.functionalitiesData).toBe('Success');
    });

    it('should call searchUser ', () => {
        spyOn(component, 'searchUsers');

        const button = fixture.debugElement.query(By.css('input'));
        button.triggerEventHandler('keyup.enter', null);
        fixture.detectChanges();

        expect(component.searchUsers).toHaveBeenCalled();
    });

    it('should call getNextPageData when search and set functionalitiesData and loadingSearchData value', () => {
        const pageData = spyOn(unrService, 'getNextPageData').and.returnValue(Observable.from(['Success']));
        component.searchUsers({target: {value: 'ajay'}});

        expect(component.loadingSearchData).toBe(false);
        expect(pageData).toHaveBeenCalled();
        expect(component.functionalitiesData).toBe('Success');
    });

    it('should click button openFunctionalityForm ', () => {
        spyOn(component, 'openFunctionalityForm');

        const button = fixture.debugElement.nativeElement.querySelector('button');
        button.click();
        expect(component.openFunctionalityForm).toHaveBeenCalled();
    });

    xit('should open bottomSheet AddFunctionalityComponent', () => {
        // const open = spyOn(component, 'bottomSheet')
        component.openFunctionalityForm();
        expect(component.openFunctionalityForm).toBeTruthy();
    });

    it('should call updateFunctionalityForm', () => {
        spyOn(component, 'updateFunctionalityForm');
        component.updateFunctionalityForm(userDetail);

        expect(component.updateFunctionalityForm).toHaveBeenCalledWith(userDetail);
    });
});
