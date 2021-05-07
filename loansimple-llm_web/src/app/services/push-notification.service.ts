import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireRemoteConfig } from '@angular/fire/remote-config';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { LsSnackBarComponent } from '../shared/partials/ls-snack-bar/ls-snack-bar.component';
declare var gapi: any;
@Injectable()
export class PushNotificationService {

    public currentMessage = new BehaviorSubject(null);
    public remoteConfig = new BehaviorSubject(null);

    constructor(
        private angularFireDB: AngularFireDatabase,
        private angularFireAuth: AngularFireAuth,
        private angularFireMessaging: AngularFireMessaging,
        private snackBar: MatSnackBar,
        private remote: AngularFireRemoteConfig
    ) {
        remote.parameters.subscribe(res => {
            this.remoteConfig.next(res);
        });
        this.angularFireMessaging.messaging.subscribe((messaging) => {
            messaging.onMessage = messaging.onMessage.bind(messaging);
            messaging.onTokenRefresh = messaging.onTokenRefresh.bind(messaging);
            // messaging.usePublicVapidKey('BBLGWoV6rs9Op9C5d1T1f7oMPm3yrCQVqiMVnmdVD0jDylgEpxNJLcC6InjrvwhSRI8Cl9XJN9hl3KidEDGgIiY');
        });
    }

    updateToken(token) {
        console.log(token);
        this.angularFireAuth.authState.pipe(take(1)).subscribe(user => {
            if (!user) {
                return;
            }
            const data = { [user.uid]: token };
            this.angularFireDB.object('fcmTokens/').update(data);
        }, err => {
            console.log(err);
        });
    }

    requestPermission() {
        this.angularFireMessaging.requestToken.subscribe(token => {
            this.updateToken(token);
        }, err => {
            console.log('Unable to get permission to notify.');
        });
    }

    receiveMessage() {
        this.angularFireMessaging.messages.subscribe((payload) => {
            console.log(payload);
            this.snackBar.openFromComponent(LsSnackBarComponent, {
                data: {
                    heading: payload['notification']['title'],
                    text: payload['notification']['body']
                },
                verticalPosition: 'top',
                horizontalPosition: 'right',
                duration: 10000,
                panelClass: ['alert-info', 'alert']
            });
            this.currentMessage.next(payload);
        });
    }
}
