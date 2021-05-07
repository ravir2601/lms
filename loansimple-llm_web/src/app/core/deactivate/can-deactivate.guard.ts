import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ComponentCanDeactivate } from './component-can-deactivate';
@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
    canDeactivate(component: ComponentCanDeactivate): boolean {
        if (!component.canDeactivate()) {
            if (confirm('You have unsaved changes! If you leave, your changes will be lost.')) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    }
}
// https://medium.com/better-programming/angular-how-keep-user-from-lost-his-data-by-accidentally-leaving-the-page-before-submit-4eeb74420f0d