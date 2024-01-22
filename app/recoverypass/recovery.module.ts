import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoveryRoutingModule } from './recovery-routing.module';
import { RecoveryComponent } from './recovery.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ChangeComponent } from './pages/change/change.component';

@NgModule({
    declarations: [RecoveryComponent, ChangeComponent],
    imports: [CommonModule, MaterialModule, RecoveryRoutingModule],
})
export class RecoveryModule {}
