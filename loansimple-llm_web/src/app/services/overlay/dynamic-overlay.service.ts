import {Overlay, OverlayKeyboardDispatcher, OverlayPositionBuilder, ScrollStrategyOptions} from '@angular/cdk/overlay';
import {ComponentFactoryResolver, Inject, Injector, NgZone, Renderer2, RendererFactory2} from '@angular/core';
import {DynamicOverlayContainer} from './dynamic-overlay-container.service';
import {Directionality} from '@angular/cdk/bidi';
import {DOCUMENT} from '@angular/common';

export class DynamicOverlay extends Overlay {

    private readonly dynamicOverlayContainer: DynamicOverlayContainer;
    private renderer: Renderer2;

    constructor(scrollStrategies: ScrollStrategyOptions,
                overlayContainer: DynamicOverlayContainer,
                componentFactoryResolver: ComponentFactoryResolver,
                positionBuilder: OverlayPositionBuilder,
                keyboardDispatcher: OverlayKeyboardDispatcher,
                injector: Injector,
                ngZone: NgZone,
                @Inject(DOCUMENT) document: any,
                directionality: Directionality,
                rendererFactory: RendererFactory2
    ) {
        super(
            scrollStrategies, overlayContainer, componentFactoryResolver, positionBuilder,
            keyboardDispatcher, injector, ngZone, document, directionality
        );
        this.renderer = rendererFactory.createRenderer(null, null);

        this.dynamicOverlayContainer = overlayContainer;
    }

    public setContainerElement(containerElement: HTMLElement): void {
        this.renderer.setStyle(containerElement, 'transform', 'translateZ(0)');
        this.dynamicOverlayContainer.setContainerElement(containerElement);
    }
}
