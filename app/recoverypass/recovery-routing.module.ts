import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecoveryComponent } from './recovery.component';
import { ChangeComponent } from './pages/change/change.component';

const routes: Routes = [
    {
        path: '',
        component: RecoveryComponent,
    },
    {
        path: 'change/:token',
        component: ChangeComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RecoveryRoutingModule {}
