import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatSidenavModule,
} from '@angular/material';
// NgBootstrap
import {NgbDropdownModule, NgbTabsetModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
// Perfect Scrollbar
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
// Core module
import {CoreModule} from '../../core/core.module';
// CRUD Partials
import {
    ActionNotificationComponent,
    AlertComponent,
    DeleteEntityDialogComponent,
    FetchEntityDialogComponent,
    UpdateStatusDialogComponent,
} from './content/crud';
// Layout partials
import {
    ContextMenu2Component,
    ContextMenuComponent,
    LanguageSelectorComponent,
    QuickActionComponent,
    QuickPanelComponent,
    ScrollTopComponent,
    SearchDefaultComponent,
    SearchDropdownComponent,
    SearchResultComponent,
    SplashScreenComponent,
    StickyToolbarComponent,
    Subheader1Component,
    Subheader2Component,
    Subheader3Component,
    Subheader4Component,
    Subheader5Component,
    SubheaderSearchComponent,
    UserProfile2Component,
    UserProfile3Component,
    UserProfileComponent,
} from './layout';
// General
import {NoticeComponent} from './content/general/notice/notice.component';
import {PortletModule} from './content/general/portlet/portlet.module';
// Errpr
import {ErrorComponent} from './content/general/error/error.component';
// Extra module
import {WidgetModule} from './content/widgets/widget.module';
// SVG inline
import {InlineSVGModule} from 'ng-inline-svg';
import {CartComponent} from './layout/topbar/cart/cart.component';
import { SharedModule } from '../../shared/shared.module';
import {NotificationComponent} from './layout/topbar/notification/notification.component';
import {NotificationDetailComponent} from './layout/topbar/notification/notification-detail/notification-detail.component';
import { FilterSearchComponent } from "./layout/filter-search/filter-search.component";
import { ListFilterPipe } from "../../shared/pipes/list-filter.pipe";


@NgModule({
    declarations: [
        ScrollTopComponent,
        NoticeComponent,
        ActionNotificationComponent,
        DeleteEntityDialogComponent,
        FetchEntityDialogComponent,
        UpdateStatusDialogComponent,
        AlertComponent,

        // topbar components
        ContextMenu2Component,
        ContextMenuComponent,
        QuickPanelComponent,
        ScrollTopComponent,
        SearchResultComponent,
        SplashScreenComponent,
        StickyToolbarComponent,
        Subheader1Component,
        Subheader2Component,
        Subheader3Component,
        Subheader4Component,
        Subheader5Component,
        SubheaderSearchComponent,
        LanguageSelectorComponent,
        QuickActionComponent,
        SearchDefaultComponent,
        SearchDropdownComponent,
        UserProfileComponent,
        UserProfile2Component,
        UserProfile3Component,
        CartComponent,
        ErrorComponent,
        NotificationComponent,
        NotificationDetailComponent,
        FilterSearchComponent,
        ListFilterPipe
    ],
    exports: [
        // WidgetModule,
        PortletModule,

        ScrollTopComponent,
        NoticeComponent,
        ActionNotificationComponent,
        DeleteEntityDialogComponent,
        FetchEntityDialogComponent,
        UpdateStatusDialogComponent,
        AlertComponent,

        // topbar components
        ContextMenu2Component,
        ContextMenuComponent,
        QuickPanelComponent,
        ScrollTopComponent,
        SearchResultComponent,
        SplashScreenComponent,
        StickyToolbarComponent,
        Subheader1Component,
        Subheader2Component,
        Subheader3Component,
        Subheader4Component,
        Subheader5Component,
        SubheaderSearchComponent,
        LanguageSelectorComponent,
        QuickActionComponent,
        SearchDefaultComponent,
        SearchDropdownComponent,
        UserProfileComponent,
        UserProfile2Component,
        UserProfile3Component,
        CartComponent,
        ErrorComponent,
        NotificationComponent,
        NotificationDetailComponent,
        FilterSearchComponent,
        ListFilterPipe
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        PerfectScrollbarModule,
        InlineSVGModule,
        CoreModule,
        PortletModule,
        SharedModule,
        // WidgetModule,

        // angular material modules
        MatButtonModule,
        MatMenuModule,
        MatSelectModule,
        MatInputModule,
        MatTableModule,
        MatAutocompleteModule,
        MatRadioModule,
        MatIconModule,
        MatNativeDateModule,
        MatProgressBarModule,
        MatDatepickerModule,
        MatCardModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatTabsModule,
        MatTooltipModule,
        MatDialogModule,

        // ng-bootstrap modules
        NgbDropdownModule,
        NgbTabsetModule,
        NgbTooltipModule,
        MatSidenavModule,

    ],
    providers:[
        QuickPanelComponent
    ],
    // entryComponents: [NotificationDetailComponent],
})
export class PartialsModule {
}
