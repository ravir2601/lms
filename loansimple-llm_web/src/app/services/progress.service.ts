import {ElementRef, Injectable} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {Subscription, timer} from 'rxjs';
import {OverlayRef} from '@angular/cdk/overlay';
import {DynamicOverlay} from './overlay/dynamic-overlay.service';
import {ProgressContainerComponent} from '../shared/progress-container/progress-container.component';

@Injectable({
    providedIn: 'root'
})
export class ProgressService {

    constructor(private dynamicOverlay: DynamicOverlay) {
    }

    public showProgress(elRef: ElementRef) {
        if (elRef) {
            const result: ProgressRef = {subscription: null, overlayRef: null};
            result.subscription = timer(500)
                .subscribe(() => {
                    this.dynamicOverlay.setContainerElement(elRef.nativeElement);
                    const positionStrategy = this.dynamicOverlay.position().global().centerHorizontally().centerVertically();
                    result.overlayRef = this.dynamicOverlay.create({
                        positionStrategy,
                        hasBackdrop: true
                    });
                    result.overlayRef.attach(new ComponentPortal(ProgressContainerComponent));
                });
            return result;
        } else {
            return null;
        }
    }

    detach(result: ProgressRef) {
        if (result) {
            result.subscription.unsubscribe();
            if (result.overlayRef) {
                result.overlayRef.detach();
            }
        }
    }
}

export declare interface ProgressRef {
    subscription: Subscription;
    overlayRef: OverlayRef;
}
