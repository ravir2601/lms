import { InterceptService } from './../../../core/_base/crud/utils/intercept.service';
import { SessionService } from './../../../services/session.service';
import { LoginService } from './../../../views/pages/auth/login/services/login.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthNoticeComponent } from './../../../views/pages/auth/auth-notice/auth-notice.component';
import { UnrService } from './../../unr.service';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { MatBottomSheetModule, MatSnackBarModule, MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegionComponent } from './add-region.component';

describe('AddRegionComponent', () => {
    let component: AddRegionComponent;
    let fixture: ComponentFixture<AddRegionComponent>;
    let unrService: UnrService;
    let loginService: LoginService;
    let sessionService: SessionService;
    let search: Observable<string>;
    const infoDataSet = {info: {id: 1, update_url: 'http://stagls.loansimple.in/api/v1/unr/functionalities/1/',
                            permissions: ['crm_lead_transfer_mail_receives'], code: 'LS-FUNC001', name: 'Ajay'},
                            actionType: 'UPDATE', pincode: 110015, type: 'Cluster' };

    const data = {id: 11, update_url: 'http://stagls.loansimple.in/api/v1/unr/regions/11/', kyc_pincodes: [], code: 'LS_REGN00011',
                    name: 'Ballabhgarh', type: 'locality', pincode: '121004', is_approved: false, unapproved_reason: null, state_code: null,
                    state_short_code: null, cluster_id: '5', belongs_to: { id: 9, code: 'LS_REGN00009', name: 'Faridabad', type: 'city',
                    pincode: null, is_approved: false, kyc_pincodes: '[]', state_code: null, state_short_code: null, cluster_id: null,
                    belongs_to: 8}
                  };

    const bottomSheetRefMock = {
        dismiss: () => { }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddRegionComponent, AuthNoticeComponent],
            imports: [FormsModule, MatBottomSheetModule, MatSnackBarModule, RouterModule, RouterTestingModule, NgbModule,
                        InfiniteScrollModule, HttpClientModule, BrowserAnimationsModule
                    ],
            providers: [UnrService, { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
                        { provide: MatBottomSheetRef, useValue: bottomSheetRefMock}, LoginService, SessionService,
                            {
                                provide: HTTP_INTERCEPTORS,
                                useClass: InterceptService,
                                multi: true
                            }
                        ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddRegionComponent);
        component = fixture.componentInstance;
        unrService = TestBed.get(UnrService);
        component.name = 'sanjay';
        component.regionType = 'locality';
        loginService = TestBed.get(LoginService);
        sessionService = TestBed.get(SessionService);
        const username = 'admin@loansimple.in';
        const password = 'admin';

        loginService.login(username, password).subscribe(user => {
            sessionService.storeUserDetails(user);
        });
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call ngOnInit', () => {
        spyOn(component, 'ngOnInit');
        component.ngOnInit();
        expect(component.ngOnInit).toHaveBeenCalled();
    });

    it('should call evaluteRequest when actionType is UPDATE', () => {
        // spyOn(component, 'updateNewDepartment');
        component.infoDataSet = infoDataSet;
        component.evaluteRequest();

        expect(component.evaluteRequest).toBeTruthy();
    });

    it('should call dismiss', () => {
        const button = fixture.debugElement.nativeElement.querySelector('button');
        button.click();
        expect(component.dismiss).toBeTruthy();
    });

    it('should call assignRegion', () => {
        component.infoDataSet = infoDataSet;
        const button = fixture.debugElement.query(By.css('.btn'));
        button.triggerEventHandler('click', null);

        expect(component.assignRegion).toBeTruthy();
    });

    it('should call addNewRegion when actionType is ADD', () => {
        spyOn(component, 'addNewRegion');
        component.infoDataSet.actionType = 'ADD';
        component.assignRegion();

        expect(component.addNewRegion).toHaveBeenCalled();
    });

    it('should call addNewDepartment when actionType is UPDATE', () => {
        spyOn(component, 'updateNewRegion');
        component.infoDataSet.actionType = 'UPDATE';
        component.assignRegion();

        expect(component.updateNewRegion).toHaveBeenCalled();
    });

    it('should call addNewDepartment', () => {
        const addDepartment = spyOn(unrService, 'addNewRegion').and.returnValue(Observable.from(['Success']));
        component.infoDataSet.actionType = 'ADD';
        component.name = 'Sanjay';
        component.regionType = 'Cluster';
        component.assignRegion();

        expect(addDepartment).toHaveBeenCalled();
    });

    it('should call updateNewDepartment', () => {
        const addDepartment = spyOn(unrService, 'updateNewRegion').and.returnValue(Observable.from(['Success']));
        component.infoDataSet = infoDataSet;
        component.name = 'Sanjay';
        component.regionType = 'Cluster';
        component.assignRegion();

        expect(addDepartment).toHaveBeenCalled();
    });

    it('should call nextPageData when loadInitialBelongsToLocationData is called', () => {
        const belongsToLocationUrl = 'http://stagls.loansimple.in/api/v1/unr/regions/?expand=belongs_to';
        const locationData = spyOn(unrService, 'getNextPageData').and.returnValue(Observable.from([{results: [infoDataSet]}]));
        component.loadInitialBelongsToLocationData();
        unrService.getNextPageData( belongsToLocationUrl, 1, 15, '').subscribe((res: any) => {
                if (res.results && res.results.length > 0) {
                    component.belongsToLocationList = res.results;
                }
            });

        expect(locationData).toHaveBeenCalled();
        expect(component.belongsToLocationList).toEqual([infoDataSet]);
    });

    it('should call nextPageData when searchBelongsToLocation is called', () => {
        component.currentPageIndex = 0;
        const locationData = spyOn(unrService, 'getNextPageData').and.returnValue(Observable.from([{results: [infoDataSet]}]));
        component.searchBelongsToLocation({target: {value: 'search'}});

        expect(locationData).toHaveBeenCalled();
    });

    it('should call showlistPopover', () => {
        component.showlistPopover();

        expect(component.showBelongsToLocation).toBe(true);
    });

    it('should call getNextPageData when getNextBelongsToLocationData is called', () => {
        const nextPageData = spyOn(unrService, 'getNextPageData').and.returnValue(Observable.from([]));
        component.getNextBelongsToLocationData();

        expect(nextPageData).toHaveBeenCalled();
    });

    it('should check response when getNextPageData is called', () => {
        component.getNextBelongsToLocationData();

        expect(component.belongsToLocationList.length).toBeGreaterThan(-1);
    });

    it('should call saveCurrentBelongsToLocation', () => {
        component.saveCurrentBelongsToLocation(data);

        expect(component.saveCurrentBelongsToLocation).toBeTruthy();
        expect(component.belongsToLocationId).toBe(11);
        expect(component.showlistPopover).toBeTruthy();
    });

    it('should call addKycPincodeInList when  addKycPincode is called', () => {
        spyOn(component, 'addKycPincodeInList');
        component.addKycPincode({target: {value: '110015'}});

        expect(component.addKycPincode).toBeTruthy();
        expect(component.addKycPincodeInList).toHaveBeenCalled();
    });

    it('should call addKycPincodeInList', () => {
        component.addKycPincodeInList('110015');

        expect(component.addKycPincodeInList).toBeTruthy();
        expect(component.kyc_pincode).toBe('');
    });

    it('should call addKycPincodeInList when addKycPincodeFromDropDown', () => {
        spyOn(component, 'addKycPincodeInList');
        component.addKycPincodeFromDropDown({item: '110015'});

        expect(component.addKycPincodeFromDropDown).toBeTruthy();
        expect(component.addKycPincodeInList).toHaveBeenCalled();
    });

    it('should call deleteKycPinCode', () => {
        component.deleteKycPinCode(0);
        expect(component.deleteKycPinCode).toBeTruthy();
    });

});
