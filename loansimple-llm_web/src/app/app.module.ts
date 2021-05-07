import { LeadsService } from './leads/leads.service';
import { LeadsModule } from './leads/leads.module';
// Angular
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, ErrorHandler, Injectable } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GestureConfig, MatProgressSpinnerModule, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';

// Angular in memory
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// Perfect Scroll bar
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
// SVG inline
import { InlineSVGModule } from 'ng-inline-svg';
// Env
import { environment } from '../environments/environment';
// Hammer JS
import 'hammerjs';
// NGX Permissions
import { NgxPermissionsModule } from 'ngx-permissions';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// State
import { metaReducers, reducers } from './core/reducers';
// Copmponents
import { AppComponent } from './app.component';
// Modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ThemeModule } from './views/theme/theme.module';
// Partials
import { PartialsModule } from './views/partials/partials.module';
// Layout Services
import {
    DataTableService,
    KtDialogService,
    LayoutConfigService,
    LayoutRefService,
    MenuAsideService,
    MenuConfigService,
    MenuHorizontalService,
    PageConfigService,
    SplashScreenService,
    SubheaderService
} from './core/_base/layout';
// Auth
import { AuthModule } from './views/pages/auth/auth.module';
import { AuthService } from './core/auth';
// CRUD
import { HttpUtilsService, LayoutUtilsService, TypesUtilsService } from './core/_base/crud';
// Config
import { LayoutConfig } from './core/_config/layout.config';
// Highlight JS
import { HIGHLIGHT_OPTIONS, HighlightLanguage } from 'ngx-highlightjs';

import * as typescript from 'highlight.js/lib/languages/typescript';
import * as scss from 'highlight.js/lib/languages/scss';
import * as xml from 'highlight.js/lib/languages/xml';
import * as json from 'highlight.js/lib/languages/json';
import { PushNotificationService } from './services/push-notification.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireRemoteConfigModule, DEFAULTS, SETTINGS } from '@angular/fire/remote-config';
import { AngularFireModule } from '@angular/fire';
import { HttpManagerService } from './services/http-manager.service';
import { SessionService } from './services/session.service';
import { UnrModule } from './unr/unr.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppDateAdapter, APP_DATE_FORMATS } from './shared/format-datepicker/format-datepicker';
import { OtpVerificationComponent } from './core/_partials/otp-verification/otp-verification.component';
import { DatePipe } from '@angular/common';
import { ConstantService } from './services/constant.service';
import { FiService } from './fi/fi.service';
import { FiModule } from './fi/fi.module';
import { CanDeactivateGuard } from './core/deactivate/can-deactivate.guard';
import * as Sentry from '@sentry/browser';
import { SuccessComponent } from './success/success.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

Sentry.init({
    dsn: 'https://80cd7e0d24604f9d91a836320bc19c78@sentry.io/1879192'
});

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    wheelSpeed: 0.5,
    swipeEasing: true,
    minScrollbarLength: 40,
    maxScrollbarLength: 300,
};

export function initializeLayoutConfig(appConfig: LayoutConfigService) {
    // initialize app by loading default demo layout config
    return () => {
        if (appConfig.getConfig() === null) {
            appConfig.loadConfigs(new LayoutConfig().configs);
        }
    };
}

export function hljsLanguages(): HighlightLanguage[] {
    return [
        { name: 'typescript', func: typescript },
        { name: 'scss', func: scss },
        { name: 'xml', func: xml },
        { name: 'json', func: json }
    ];
}

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
    constructor() { }
    handleError(error) {
        const eventId = Sentry.captureException(error.originalError || error);
        // Sentry.showReportDialog({ eventId });
    }
}

@NgModule({
    declarations: [AppComponent, SuccessComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgxPermissionsModule.forRoot(),
        PartialsModule,
        CoreModule,
        OverlayModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([]),
        SweetAlert2Module.forRoot(),
        StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
        StoreDevtoolsModule.instrument(),
        AuthModule.forRoot(),
        TranslateModule.forRoot(),
        MatProgressSpinnerModule,
        InlineSVGModule.forRoot(),
        ThemeModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireMessagingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireRemoteConfigModule,
        UnrModule,
        LeadsModule,
        FiModule,
        InfiniteScrollModule
    ],
    exports: [],
    providers: [
        AuthService,
        ConstantService,
        LayoutConfigService,
        LayoutRefService,
        MenuConfigService,
        PageConfigService,
        KtDialogService,
        DataTableService,
        CanDeactivateGuard,
        DatePipe,
        SplashScreenService,
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
        PushNotificationService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: GestureConfig
        },
        {
            provide: APP_INITIALIZER,
            useFactory: initializeLayoutConfig,
            deps: [LayoutConfigService], multi: true
        },
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: { languages: hljsLanguages }
        },
        { provide: DEFAULTS, useValue: {} },
        {
            provide: SETTINGS,
            useValue: { fetchTimeoutMillis: 10000 }
        },
        {
            provide: ErrorHandler,
            useClass: environment.production ? SentryErrorHandler : ErrorHandler
        },
        SubheaderService,
        MenuHorizontalService,
        MenuAsideService,
        HttpUtilsService,
        TypesUtilsService,
        LayoutUtilsService,
        HttpManagerService,
        SessionService,
        LeadsService,
        FiService
    ],
    bootstrap: [AppComponent],
    entryComponents: [OtpVerificationComponent]
})
export class AppModule {
}
