import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule } from '@angular/forms';

import { RequestDemoRoutingModule } from './request-demo-routing.module';
import { RequestDemoComponent } from './request-demo.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [RequestDemoComponent],
    imports: [
        CommonModule,
        RequestDemoRoutingModule,
        MaterialModule,
        SharedModule,
        MatStepperModule,
        MatButtonModule,
        FormsModule,
    ],
})
export class RequestDemoModule {}
