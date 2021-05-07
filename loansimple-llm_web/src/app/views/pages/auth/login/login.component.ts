// Angular
import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Auth
import { AuthNoticeService } from '../../../../core/auth';
import { LoginService } from './services/login.service';
import { SessionService } from '../../../../services/session.service';

declare const gapi: any;


@Component({
    selector: 'kt-login',
    templateUrl: './login.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
    // Public params
    loginForm: FormGroup;
    loading = false;
    private returnUrl: any;
    private gapi: any;


    /**
     * Component constructor
     *
     * @param router: Router
     * @param auth: AuthService
     * @param authNoticeService: AuthNoticeService
     * @param translate: TranslateService
     * @param fb: FormBuilder
     * @param cdr
     * @param route
     */
    constructor(
        private router: Router,
        private loginService: LoginService,
        private authNoticeService: AuthNoticeService,
        private translate: TranslateService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private sessionService: SessionService
    ) {
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.initLoginForm();

        // redirect back to the returnUrl before login
        this.route.queryParams.subscribe(params => {
            this.returnUrl = params['returnUrl'] || '/';
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this.authNoticeService.setNotice(null);
        this.loading = false;
    }

    /**
     * Form initalization
     * Default params, validators
     */
    initLoginForm() {

        this.loginForm = this.fb.group({
            email: [null, Validators.compose([
                Validators.required,
                Validators.email,
                Validators.minLength(3),
                Validators.maxLength(320)
            ])
            ],
            password: [null, Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(100)
            ])
            ]
        });
    }

    /**
     * Form Submit
     */
    submit() {
        const controls = this.loginForm.controls;
        /** check form */
        if (this.loginForm.invalid) {
            Object.keys(controls).forEach(controlName =>
                controls[controlName].markAsTouched()
            );
            return;
        }

        this.loading = true;

        const authData = {
            email: controls['email'].value,
            password: controls['password'].value
        };
        this.loginService
            .login(authData.email, authData.password)
            .subscribe(user => {
                this.loading = false;
                this.router.navigateByUrl(this.returnUrl); // Main page
                this.sessionService.storeUserDetails(user);
            }, err => {
                this.loading = false;
            });
    }

    /**
     * Checking control validation
     *
     * @param controlName: string => Equals to formControlName
     * @param validationType: string => Equals to valitors name
     */
    isControlHasError(controlName: string, validationType: string): boolean {
        const control = this.loginForm.controls[controlName];
        if (!control) {
            return false;
        }

        const result = control.hasError(validationType) && (control.dirty || control.touched);
        return result;
    }

    public googleInit() {
        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: '909304879403-n3buc19p3bk6r6l909fr9pdf09ol5pjv.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                scope: 'profile email'
            }).attachClickHandler(document.getElementById('googleAuthBtn'), {}, (googleUser) => {
                console.log(googleUser);
                // const access_token = googleUser.Zi.id_token;
                // console.log('inside attach init');
                // this.loginService.gmailLogin(access_token).subscribe(user => {
                //     console.log('response from attach init');
                //     this.sessionService.storeUserDetails(user);
                //     this.router.navigateByUrl(this.returnUrl);
                // });

            }, (error) => {
                console.log('error', error);
            });
        });
    }

    ngAfterViewInit() {
        this.googleInit();
    }
}
