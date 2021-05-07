import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import {
    MatAutocompleteModule,
    MatBottomSheetModule,
    MatChipsModule,
    MatFormFieldModule, MatIconModule,
    MatPaginatorModule,
    MatSlideToggleModule, MatTooltipModule
} from "@angular/material";
import { CoreModule } from "../core/core.module";
import { SharedModule } from "../shared/shared.module";
import { AuthModule } from "../views/pages/auth/auth.module";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";
import { FiService } from "./fi.service";
import { FiTasksComponent } from "./fi-tasks/fi-tasks.component";
import { FiTaskDetailsComponent } from "./fi-tasks/fi-task-details/fi-task-details.component";

const routes = [
    { path: 'tasks',
        children: [
            { path: '', component: FiTasksComponent },
            { path: ':id/details', component: FiTaskDetailsComponent, data: {source: 'leads'}}
        ]
    },
    {
        path: "**",
        redirectTo: 'tasks'
    }
];


@NgModule({
    declarations: [
        FiTasksComponent,
        FiTaskDetailsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatPaginatorModule,
        CoreModule,
        MatBottomSheetModule,
        SharedModule,
        MatFormFieldModule,
        AuthModule,
        InfiniteScrollModule,
        NgbModule,
        MatSlideToggleModule,
        MatChipsModule,
        MatIconModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatTooltipModule
    ],
    providers: [
        FiService
    ],
    entryComponents: [
        FiTaskDetailsComponent
    ]
})
export class FiModule {
}
