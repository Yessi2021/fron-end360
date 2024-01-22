import { Component } from '@angular/core';

export interface Sheet {
    sheets_info: SheetsInfo;
    path: string;
}

export interface SheetsInfo {
    [key: string]: Array<Array<null | string>>;
}

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
    sheetData: Sheet | null = null;
    dataSelectedSheet: (string | null)[] = [];
    dataSourceSheet = '';
    sheet: {
        sheetName: string;
        sheetIndex: number;
        data: (string | null)[];
    } = {
        sheetName: '',
        sheetIndex: 0,
        data: [],
    };
}
