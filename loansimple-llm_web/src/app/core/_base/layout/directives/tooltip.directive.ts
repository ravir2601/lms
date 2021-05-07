import { AfterViewInit, Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
    selector: '[toolTip]',
    exportAs: 'toolTip'
})

export class TooltipDirective implements AfterViewInit {

    constructor(private el: ElementRef) { }

    @HostListener('mouseenter')
    onMouseEnter(): void {

    }

    ngAfterViewInit(): void {
    }
}
