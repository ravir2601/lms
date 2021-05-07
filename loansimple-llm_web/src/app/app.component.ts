import { Subscription, Observable, fromEvent } from 'rxjs';
// Angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationStart, NavigationEnd, Router } from '@angular/router';
// Layout
import { LayoutConfigService, SplashScreenService, TranslationService } from './core/_base/layout';
// language application-list
import { locale as enLang } from './core/_config/i18n/en';
import { locale as chLang } from './core/_config/i18n/ch';
import { locale as esLang } from './core/_config/i18n/es';
import { locale as jpLang } from './core/_config/i18n/jp';
import { locale as deLang } from './core/_config/i18n/de';
import { locale as frLang } from './core/_config/i18n/fr';
import { PushNotificationService } from './services/push-notification.service';
import { Title } from '@angular/platform-browser';
import { ConstantService } from './services/constant.service';
import { CommonService } from './services/common.service';
import { MatDialog } from '@angular/material';
import { LsReleaseNotesComponent } from './shared/partials/ls-release-notes/ls-release-notes.component';

@Component({
    selector: 'body[kt-root]',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    // Public properties
    loader: boolean;
    private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
    onlineEvent: Observable<Event>;
    offlineEvent: Observable<Event>;
    isOnline = true;
    dialogRef: any;


    /**
     * Component constructor
     *
     * @param translationService: TranslationService
     * @param router: Router
     * @param layoutConfigService: LayoutCongifService
     * @param splashScreenService: SplashScreenService
     */
    constructor(
        private translationService: TranslationService,
        private router: Router,
        private activateRoute: ActivatedRoute,
        private layoutConfigService: LayoutConfigService,
        private constantService: ConstantService,
        private commonService: CommonService,
        private splashScreenService: SplashScreenService,
        private pushNotificationService: PushNotificationService,
        public dialog: MatDialog,
        private title: Title
    ) {
        // register translations
        this.translationService.loadTranslations(enLang, chLang, esLang, jpLang, deLang, frLang);
        this.constantService.constants_subject.subscribe(res => { });
        this.constantService.los_constants_subject.subscribe(res => { });
    }

    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */

    /**
     * On init
     */
    ngOnInit(): void {
        // enable/disable loader
        this.loader = this.layoutConfigService.getConfig('loader.enabled');

        this.registerPushNotification();

        const routerSubscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                // hide splash screen
                this.splashScreenService.hide();

                // scroll to top on every route change
                window.scrollTo(0, 0);

                // to display back the body content
                setTimeout(() => {
                    document.body.classList.add('kt-page--loaded');
                }, 500);
            }

            if (event instanceof ActivationStart) {
                if (event.snapshot.data.title) {
                    this.title.setTitle(event.snapshot.data.title);
                }
            }
        });

        this.onlineEvent = fromEvent(window, 'online');
        this.offlineEvent = fromEvent(window, 'offline');

        this.unsubscribe.push(this.onlineEvent.subscribe(e => {
            this.isOnline = true;
        }));

        this.unsubscribe.push(this.offlineEvent.subscribe(e => {
            this.isOnline = false;
        }));

        this.unsubscribe.push(routerSubscription);
    }


    registerPushNotification() {
        const appVersion = localStorage.getItem('appVersion');
        this.pushNotificationService.requestPermission();
        this.pushNotificationService.receiveMessage();
        this.pushNotificationService.remoteConfig.subscribe(res => {
            res = this.commonService.objectify(res);
            if (!this.dialogRef && res['releaseNotes'] && appVersion !== res['appVersion']['_value']) {
                localStorage.setItem('appVersion', res['appVersion']['_value'])
                this.dialogRef = this.dialog.open(LsReleaseNotesComponent, {
                    data: res
                });
            }
        });
    }

    /**
     * On Destroy
     */
    ngOnDestroy() {
        this.unsubscribe.forEach(sb => sb.unsubscribe());
    }
}
