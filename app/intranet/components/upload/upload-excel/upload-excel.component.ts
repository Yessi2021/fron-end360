import { HttpEventType, HttpResponse } from '@angular/common/http';
import {
    Component,
    ElementRef,
    EventEmitter,
    Output,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sheet } from 'src/app/intranet/pages/upload/upload.component';
import { UploadFileService } from 'src/app/intranet/services/upload-file.service';

@Component({
    selector: 'app-upload-excel',
    templateUrl: './upload-excel.component.html',
    styleUrls: ['./upload-excel.component.scss'],
})
export class UploadExcelComponent {
    @ViewChild('fileDropRef') fileDropRef!: ElementRef;
    @Output() sheetDataLoaded = new EventEmitter<Sheet>();
    file: any;

    public fileForm: FormGroup = this._formBuilder.group({
        file: [null, Validators.required],
    });

    constructor(
        private _formBuilder: FormBuilder,
        private _fileService: UploadFileService
    ) {}

    /**
     * on file drop handler
     */
    onFileDropped($event: any) {
        this.prepareFilesList($event);
        this.setFile($event);
    }

    /**
     * handle file from browsing
     */
    fileBrowseHandler(target: any) {
        const files = target.files;
        console.log(files);
        this.setFile(files);
        this.prepareFilesList(files);
    }

    /**
     *
     * @param files array of files with unique file
     */
    setFile(files: any) {
        if (files.length > 0) {
            const file = files[0];
            this.fileForm.get('file')?.setValue(file);
            this.file = file;
            this.uploadFile();
        }
    }

    /**
     * Delete file from files list
     *
     */
    deleteFile() {
        this.file = undefined;
        this.fileForm.reset();
    }

    /**
     * Convert Files list to normal array list
     * @param files (Files List)
     */
    prepareFilesList(files: Array<any>) {
        for (const item of files) {
            item.progress = 0;
            this.file = item;
        }
    }

    /**
     * format bytes
     * @param bytes (File size in bytes)
     * @param decimals (Decimals point)
     */
    formatBytes(bytes: any, decimals: any = 0) {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const dm = decimals <= 0 ? 0 : decimals || 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return (
            parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
        );
    }

    uploadFile() {
        if (this.fileForm.valid) {
            const formData = new FormData();
            formData.append('file', this.fileForm.get('file')?.value);

            this._fileService.uploadExcel(formData).subscribe(
                (event) => {
                    // Si el evento es un evento de progreso de subida, actualiza el progreso.
                    console.log(event);

                    if (
                        event.type === HttpEventType.UploadProgress &&
                        event.total
                    ) {
                        this.file.progress = Math.round(
                            (100 * event.loaded) / event.total
                        );
                    } else if (event instanceof HttpResponse) {
                        this.sheetDataLoaded.emit(event.body);
                        // Lógica adicional después de la carga exitosa
                    }
                },
                (error) => {
                    console.error('Ocurrió un error durante la carga: ', error);
                    // Manejo de errores
                }
            );
        }
    }
}
