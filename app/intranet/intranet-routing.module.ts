import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntranetComponent } from './intranet.component';
import { UploadComponent } from './pages/upload/upload.component';
import { ReportsComponent } from './pages/reports/reports.component';

const routes: Routes = [
    {
        path: '',
        component: IntranetComponent,
        children: [
            {
                path: 'upload',
                component: UploadComponent,
            },
            {
                path: 'reports/:service',
                component: ReportsComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class IntranetRoutingModule {}
