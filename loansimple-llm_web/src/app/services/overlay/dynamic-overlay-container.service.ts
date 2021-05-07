import {OverlayContainer} from '@angular/cdk/overlay';

export class DynamicOverlayContainer extends OverlayContainer {
    public setContainerElement(containerElement: HTMLElement): void {
        this._containerElement = containerElement;
    }
}
