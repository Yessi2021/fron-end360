import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './components/alerts/alerts.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
    declarations: [AlertsComponent],
    imports: [CommonModule, MaterialModule],
})
export class SharedModule {}
