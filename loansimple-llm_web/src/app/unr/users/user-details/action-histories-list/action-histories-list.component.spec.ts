import { InterceptService } from './../../../../core/_base/crud/utils/intercept.service';
import { SessionService } from './../../../../services/session.service';
import { LoginService } from './../../../../views/pages/auth/login/services/login.service';
import { Observable } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnrService } from './../../../unr.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../../../shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionHistoriesListComponent } from './action-histories-list.component';

describe('ActionHistoriesListComponent', () => {
    let component: ActionHistoriesListComponent;
    let fixture: ComponentFixture<ActionHistoriesListComponent>;
    let unrService: UnrService;
    let loginService: LoginService;
    let sessionService: SessionService;

    const userHistory = {id: 902, action: 'login', app_name: 'team', version: '2.7.9-alpha', platform: 'android',
                        lat: '28.4793359', long: '77.0900794', os: 9, vendor: 'samsung', model: 'SM-M205F', user: 1,
                        created_at: '2020-01-14T11:23:48.969325', updated_at: '2020-01-14T11:23:48.969332',
                        datetime: '2020-01-14T11:21:56'};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActionHistoriesListComponent],
            imports: [SharedModule, RouterModule, RouterTestingModule, HttpClientModule, BrowserAnimationsModule],
            providers: [UnrService, LoginService, SessionService,
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
        fixture = TestBed.createComponent(ActionHistoriesListComponent);
        component = fixture.componentInstance;
        unrService = TestBed.get(UnrService);
        loginService = TestBed.get(LoginService);
        sessionService = TestBed.get(SessionService);

        component.userId = '1';
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

    it('should call userActionHistories() when getList() is called', () => {
        const getHistory = spyOn(unrService, 'userActionHistories').and.returnValue(Observable.from(
                                    [{count: 1, next: '', previous: '', results: [userHistory]}]));
        component.getList();
        expect(getHistory).toHaveBeenCalled();
        expect(component.list).toEqual([userHistory]);
    });

    it('should call paginate()', () => {
        const data = { previousPageIndex: 0, pageIndex: 1, pageSize: 15, length: 900 };
        component.paginate(data);

        expect(component.paginate).toBeTruthy();
        expect(component.options.page_size).toBe(data.pageSize);
        expect(component.options.page).toBe(data.pageIndex + 1);
        expect(component.getList).toBeTruthy();
    });

    it('should call openMap()', () => {
        component.list = [userHistory];
        component.openMap(userHistory);

        expect(component.openMap).toBeTruthy();
    });
});
