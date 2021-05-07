// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';
import { AuthGuard } from './core/auth/_guards/auth.guard';
// Auth

const routes: Routes = [

    {
        path: '',
        component: BaseComponent,
        children: [
            {
                path: 'leads',
                loadChildren: () => import('./leads/leads.module').then(m => m.LeadsModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'applications',
                loadChildren: () => import('./applications/applications.module').then(m => m.ApplicationsModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'underwriting',
                loadChildren: () => import('app/underwriting/underwriting.module').then(m => m.UnderwritingModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'lms',
                loadChildren: () => import('./lms/lms.module').then(m => m.LmsModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'fi',
                loadChildren: () => import('./fi/fi.module').then(m => m.FiModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'unr',
                loadChildren: () => import('./unr/unr.module').then(m => m.UnrModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'auth',
                loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule)
            },
            {
                path: 'error/403',
                component: ErrorPageComponent,
                data: {
                    type: 'error-v6',
                    code: 403,
                    title: '403... Access forbidden',
                    desc: 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
                }
            },
            { path: 'error/:type', component: ErrorPageComponent },
            { path: '**', redirectTo: 'applications', pathMatch: 'full' }
        ]
    },

    { path: '**', redirectTo: 'error/403', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
