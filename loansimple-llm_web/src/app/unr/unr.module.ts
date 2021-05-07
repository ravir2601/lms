import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersComponent } from "./users/users.component";
import { RouterModule } from "@angular/router";
import { UnrService } from "./unr.service";
import {
    MatAutocompleteModule,
    MatBottomSheetModule,
    MatChipsModule,
    MatFormFieldModule, MatIconModule,
    MatPaginatorModule,
    MatSlideToggleModule
} from "@angular/material";
import { CoreModule } from "../core/core.module";
import { FunctionalitiesComponent } from "./functionalities/functionalities.component";
import { RegionsComponent } from "./regions/regions.component";
import { AddUserComponent } from "./users/add-user/add-user.component";
import { SharedModule } from "../shared/shared.module";
import { AddFunctionalityComponent } from "./functionalities/add-functionality/add-functionality.component";
import { AddRegionComponent } from "./regions/add-region/add-region.component";
import { AuthModule } from "../views/pages/auth/auth.module";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UserDetailsComponent } from "./users/user-details/user-details.component";
import { ActionHistoriesComponent } from "./users/action-histories/action-histories.component";
import { UserInfoComponent } from "./users/user-details/user-info/user-info.component";
import { ActionHistoriesPopupComponent } from "./users/action-histories-popup/action-histories-popup.component";
import { ActionHistoriesListComponent } from "./users/user-details/action-histories-list/action-histories-list.component";
import { ReactiveFormsModule } from "@angular/forms";

const routes = [
    {
        path: "users/:id/detail",
        component: UserDetailsComponent
    },
    {
        path: "users",
        component: UsersComponent
    },
    {
        path: "functionalities",
        component: FunctionalitiesComponent
    },
    {
        path: "regions",
        component: RegionsComponent
    },
    {
        path: "**",
        redirectTo: "users"
    }
];


@NgModule({
    declarations: [
        UsersComponent,
        UserDetailsComponent,
        FunctionalitiesComponent,
        RegionsComponent,
        AddUserComponent,
        AddFunctionalityComponent,
        AddRegionComponent,
        ActionHistoriesComponent,
        UserInfoComponent,
        ActionHistoriesPopupComponent,
        ActionHistoriesListComponent,
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
        ReactiveFormsModule
    ],
    providers: [
        UnrService
    ],
    entryComponents: [
        ActionHistoriesPopupComponent,
        AddUserComponent,
        AddRegionComponent,
        AddFunctionalityComponent,
    ]
})
export class UnrModule {
}
