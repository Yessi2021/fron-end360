import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestDemoComponent } from './request-demo.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: RequestDemoComponent,
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RequestDemoRoutingModule {}
