import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './intranet/guards/auth.guard';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () =>
            import('./login/login.module').then((m) => m.LoginModule),
    },
    {
        path: 'demo',
        loadChildren: () =>
            import('./request-demo/request-demo.module').then(
                (m) => m.RequestDemoModule
            ),
    },
    {
        path: 'intranet',
        loadChildren: () =>
            import('./intranet/intranet.module').then((m) => m.IntranetModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'recovery',
        loadChildren: () =>
            import('./recoverypass/recovery.module').then(
                (m) => m.RecoveryModule
            ),
    },
    {
        path: '',
        loadChildren: () =>
            import('./landing/landing.module').then((m) => m.LandingModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
