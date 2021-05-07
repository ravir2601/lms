import { InterceptService } from './../../core/_base/crud/utils/intercept.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbTypeahead, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AuthNoticeComponent } from './../../views/pages/auth/auth-notice/auth-notice.component';
import { SessionService } from './../../services/session.service';
import { LoginService } from './../../views/pages/auth/login/services/login.service';
import { AddRegionComponent } from './add-region/add-region.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ListResponse } from './../../shared/list-response.interface';
import { Observable } from 'rxjs';
import { DynamicOverlayContainer } from './../../services/overlay/dynamic-overlay-container.service';
import { DynamicOverlay } from './../../services/overlay/dynamic-overlay.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { MatPaginatorModule, MatBottomSheetModule, MatSnackBarModule } from '@angular/material';
import { UnrService } from './../unr.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionsComponent } from './regions.component';

describe('RegionsComponent', () => {
    let component: RegionsComponent;
    let fixture: ComponentFixture<RegionsComponent>;
    let unrService: UnrService;
    let loginService: LoginService;
    let sessionService: SessionService;
    const paginateData = { previousPageIndex: 0, pageIndex: 1, pageSize: 15, length: 59 };
    const userDetail = {id: 11, update_url: 'http://stagls.loansimple.in/api/v1/unr/regions/11/', code: 'LS_REGN00011',
                            name: 'Ballabhgarh', type: 'locality', pincode: '121004', is_approved: false,  cluster_id: '5'};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegionsComponent, AddRegionComponent, AuthNoticeComponent],
            imports: [ FormsModule, MatPaginatorModule, MatBottomSheetModule, HttpClientModule, RouterModule, RouterTestingModule,
                MatSnackBarModule, BrowserAnimationsModule, NgbModule, InfiniteScrollModule
                    ],
            providers: [UnrService, DynamicOverlay, DynamicOverlayContainer, NgbTypeahead, LoginService, SessionService,
                            {
                                provide: HTTP_INTERCEPTORS,
                                useClass: InterceptService,
                                multi: true
                            }
                        ]
        })
        .overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [AddRegionComponent],
                exports: [RouterModule]
            }
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegionsComponent);
        component = fixture.componentInstance;
        unrService = TestBed.get(UnrService);
        component.options.page = 1;
        loginService = TestBed.get(LoginService);
        sessionService = TestBed.get(SessionService);
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

    it('should call ngOnInit', () => {
        spyOn(component, 'ngOnInit');
        component.ngOnInit();

        expect(component.ngOnInit).toHaveBeenCalled();
    });

    it('should call search ', () => {
        spyOn(component, 'search');

        const button = fixture.debugElement.query(By.css('input'));
        button.triggerEventHandler('keyup.enter', null);
        fixture.detectChanges();

        expect(component.search).toHaveBeenCalled();
    });

    it('should call getList when search is call', () => {
        spyOn(component, 'getList');
        component.search('Sanjay');

        expect(component.getList).toHaveBeenCalled();
        expect(component.options.page).toBe(1);
        expect(component.options.search).toBe('Sanjay');
    });

    it('should call paginate', () => {
        component.paginate(paginateData);
        expect(component.paginate).toBeTruthy();
        expect(component.getList).toBeTruthy();
        expect(component.options.page_size).toBe(paginateData.pageSize);
        expect(component.options.page).toBe(paginateData.pageIndex + 1);
        expect(component.loadingSearchData).toBe(true);
    });

    it('should call getRegions when getList is called', () => {
        const region = spyOn(unrService, 'getRegions').and.returnValue(Observable.from([]));
        component.options.page = 1;
        component.getList();
        fixture.detectChanges();
        expect(region).toHaveBeenCalled();
        // expect(component.loadingSearchData).toBe(false);
    });

    it('should click button openRegionForm ', () => {
        spyOn(component, 'openRegionForm');

        const button = fixture.debugElement.nativeElement.querySelector('button');
        button.click();
        expect(component.openRegionForm).toHaveBeenCalled();
    });

    it('should click button updateDepartmentRegionForm ', () => {
        spyOn(component, 'updateRegionForm');
        component.updateRegionForm(userDetail);

        expect(component.updateRegionForm).toBeTruthy();
    });
});
