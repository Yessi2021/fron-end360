import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadFileService } from 'src/app/intranet/services/upload-file.service';
import { AlertsComponent } from 'src/app/shared/components/alerts/alerts.component';

export interface Fields {
    field_name: string;
    verbose_name: string;
}

interface FieldMapping {
    [key: string]: string;
}

@Component({
    selector: 'app-link-columns',
    templateUrl: './link-columns.component.html',
    styleUrls: ['./link-columns.component.scss'],
})
export class LinkColumnsComponent implements OnChanges, OnInit {
    @Input() sheet: {
        sheetName: string;
        sheetIndex: number;
        data: (string | null)[];
    } = {
        sheetName: '',
        sheetIndex: 0,
        data: [],
    };
    @Input() expected: string | null = '';
    @Input() path: string | undefined = '';
    fields: Fields[] = [];
    fieldMappings: FieldMapping = {};

    constructor(
        private uploadService: UploadFileService,
        private snackBar: MatSnackBar
    ) {}
    ngOnInit(): void {
        this.linkFieldsMappings();
    }

    linkFieldsMappings() {
        this.fields?.forEach((field) => {
            this.fieldMappings[field.field_name] = '';
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        // Check if 'expected' input has changed
        if (changes['expected']) {
            const currentValue = changes['expected'].currentValue;
            const serviceName = currentValue ? currentValue : 'sales';
            this.uploadService.getFieldsByService(serviceName).subscribe({
                next: (res) => {
                    this.fields = res.field_info;
                },
                error: (err) => {
                    this.fields = [];
                },
            });
        }
    }

    storageFile() {
        if (this.isFormValid()) {
            this.uploadService
                .storageData(
                    this.fieldMappings,
                    this.expected || 'sales',
                    this.path || '',
                    this.sheet.sheetName,
                    this.sheet.sheetIndex
                )
                .subscribe({
                    next: (res) => {
                        this.snackBar.openFromComponent(AlertsComponent, {
                            data: {
                                message: '¡Información guardada con exito!',
                            },
                            panelClass: ['custom-snackbar-normal'],
                            horizontalPosition: 'end',
                            verticalPosition: 'top',
                            duration: 3000,
                        });
                    },
                    error: (ev) => {
                        const errorMsg = ev.error.error;
                        this.snackBar.openFromComponent(AlertsComponent, {
                            data: {
                                message:
                                    errorMsg?.length < 40
                                        ? errorMsg
                                        : 'Algo ha salido mal',
                            },
                            panelClass: ['custom-snackbar-danger'],
                            horizontalPosition: 'end',
                            verticalPosition: 'top',
                            duration: 5000,
                        });
                    },
                });
        }
    }

    isFormValid() {
        return Object.values(this.fieldMappings)?.length === this.fields.length;
    }
}
