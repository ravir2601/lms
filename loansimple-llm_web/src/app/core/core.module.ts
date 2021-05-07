import { TooltipDirective } from './_base/layout/directives/tooltip.directive';
// Anglar
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// Layout Directives
// Services
import {
    ContentAnimateDirective,
    FirstLetterPipe,
    GetObjectPipe,
    HeaderDirective,
    JoinPipe,
    MenuDirective,
    OffcanvasDirective,
    ScrollTopDirective,
    SparklineChartDirective,
    StickyDirective,
    TabClickEventDirective,
    TimeElapsedPipe,
    ToggleDirective,
} from './_base/layout';
import {PrefixPipe} from '../shared/pipes/prefix.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [
        // directives
        ScrollTopDirective,
        HeaderDirective,
        OffcanvasDirective,
        ToggleDirective,
        MenuDirective,
        TabClickEventDirective,
        SparklineChartDirective,
        ContentAnimateDirective,
        StickyDirective,
        TooltipDirective,
        // pipes
        TimeElapsedPipe,
        JoinPipe,
        PrefixPipe,
        GetObjectPipe,
        FirstLetterPipe,

    ],
    exports: [
        // directives
        ScrollTopDirective,
        HeaderDirective,
        OffcanvasDirective,
        ToggleDirective,
        MenuDirective,
        TabClickEventDirective,
        SparklineChartDirective,
        ContentAnimateDirective,
        StickyDirective,
        TooltipDirective,
        // pipes
        TimeElapsedPipe,
        JoinPipe,
        PrefixPipe,
        GetObjectPipe,
        FirstLetterPipe,
    ],
    providers: []
})
export class CoreModule {
}
