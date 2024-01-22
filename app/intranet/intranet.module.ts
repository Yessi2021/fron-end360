import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntranetRoutingModule } from './intranet-routing.module';
import { IntranetComponent } from './intranet.component';
import { MaterialModule } from '../material/material.module';
import { UploadComponent } from './pages/upload/upload.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { DndDirective } from './pages/upload/dnd.directive';
import { ProgressComponent } from './components/upload/progress/progress.component';
import { UploadExcelComponent } from './components/upload/upload-excel/upload-excel.component';
import { CheckColumnsComponent } from './components/upload/check-columns/check-columns.component';
import { FormsModule } from '@angular/forms';
import { LinkColumnsComponent } from './components/upload/link-columns/link-columns.component';
import { SalesReportComponent } from './components/reports/sales-report/sales-report.component';
import { PowerBIEmbedModule } from 'powerbi-client-angular';
import { ProductsReportComponent } from './components/reports/products-report/products-report.component';
import { CustomersReportComponent } from './components/reports/customers-report/customers-report.component';

import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [
        IntranetComponent,
        UploadComponent,
        ReportsComponent,
        DndDirective,
        ProgressComponent,
        UploadExcelComponent,
        CheckColumnsComponent,
        LinkColumnsComponent,
        SalesReportComponent,
        ProductsReportComponent,
        CustomersReportComponent,
    ],
    imports: [
        CommonModule,
        IntranetRoutingModule,
        MaterialModule,
        FormsModule,
        PowerBIEmbedModule,
        MatCardModule,
        MatCheckboxModule,
        FormsModule,
        MatRadioModule,
    ],
})
export class IntranetModule {}
