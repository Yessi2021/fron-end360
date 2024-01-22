import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UploadFileService {
    private baseUrl: string = environment.url;
    private apiUpload = `${environment.url}/auth/api.../`;
    public headers = new HttpHeaders({
        'Content-Type': 'multipart/form-data',
    });

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    uploadExcel(file: FormData): Observable<HttpEvent<any>> {
        return this.http.post<any>(`${this.baseUrl}/draft/check-excel/`, file, {
            reportProgress: true,
            observe: 'events',
            headers: this.authService.getAuthHeaders(),
        });
    }

    storageData(
        mapping: any,
        serviceName: string,
        path: string,
        sheetName: string,
        sheetIndex: number
    ) {
        console.log({ mapping, path, sheetName, sheetIndex });
        return this.http.post<any>(
            `${this.baseUrl}/${serviceName}/save/`,
            { mapping, path, sheetName, sheetIndex },
            {
                headers: this.authService.getAuthHeaders(),
            }
        );
    }

    getFieldsByService(serviceName: string): Observable<any> {
        return this.http.get<any>(
            `${this.baseUrl}/${serviceName}/fields-info/`,
            {
                headers: this.authService.getAuthHeaders(),
            }
        );
    }

    configAddUpload(datosUpload: any): Observable<any> {
        return this.http.post<any>(this.apiUpload, datosUpload);
    }
}
