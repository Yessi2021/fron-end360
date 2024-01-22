import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sheet } from 'src/app/intranet/pages/upload/upload.component';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-check-columns',
    templateUrl: './check-columns.component.html',
    styleUrls: ['./check-columns.component.scss'],
})
export class CheckColumnsComponent {
    @Input() sheetData: Sheet | null = null;
    @Output() selectedSheetEvent = new EventEmitter<{
        sheetName: string;
        sheetIndex: number;
        data: (string | null)[];
    }>();
    @Output() selectedSourceEvent = new EventEmitter<string>();

    selectedSheet = '';
    sheetSource = 'sales';
    selectedInputIndex: number | null = null;
    sources = [
        {
            name: 'Ventas',
            code: 'sales',
        },
        {
            name: 'Clientes',
            code: 'customer',
        },
        {
            name: 'Productos',
            code: 'products',
        },
        {
            name: 'Nomina',
            code: 'payroll',
        },
    ];

    getSheetNames(): string[] {
        return this.sheetData ? Object.keys(this.sheetData.sheets_info) : [];
    }

    getSelectedSheetRows(): any[] | undefined {
        if (this.selectedSheet)
            return this.sheetData?.sheets_info[this.selectedSheet];
        return undefined;
    }

    onCheckboxChange(index: number) {
        this.selectedInputIndex = index;
        const dataSelected = this.getDataSelected();
        if (dataSelected) {
            this.selectedSheetEvent.emit({
                data: dataSelected,
                sheetName: this.selectedSheet,
                sheetIndex: this.selectedInputIndex,
            });
        }
    }

    changeSheet() {
        const dataSelected = this.getDataSelected();
        if (dataSelected) {
            this.selectedSheetEvent.emit({
                data: dataSelected,
                sheetName: this.selectedSheet,
                sheetIndex: this.selectedInputIndex
                    ? this.selectedInputIndex
                    : 0,
            });
        }
    }

    changeSource() {
        if (this.sheetSource) {
            this.selectedSourceEvent.emit(this.sheetSource);
        }
    }

    getDataSelected() {
        if (!this.selectedSheet || !this.selectedInputIndex) return null;
        if (
            this.sheetData?.sheets_info[this.selectedSheet] &&
            this.sheetData?.sheets_info[this.selectedSheet][
                this.selectedInputIndex
            ]
        ) {
            return this.sheetData?.sheets_info[this.selectedSheet][
                this.selectedInputIndex
            ];
        }

        return null;
    }
}
