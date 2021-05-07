import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {SummaryComponent} from './summary/summary.component';
import {CoreModule} from '../core/core.module';

const routes = [
    {
        path: 'dashboard',
        children: [
            {path: ':id', component: SummaryComponent, pathMatch: 'full'},
        ]
    }
];

@NgModule({
    declarations: [SummaryComponent],
    imports: [
        CommonModule,
        SharedModule,
        CoreModule,
        RouterModule.forChild(routes),
    ]
})
export class UnderwritingModule {
}
