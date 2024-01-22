import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class RecoveryService {
    private headersToToken = new HttpHeaders({
        'Content-Type': 'application/json',
    });
    constructor(private http: HttpClient) {}

    public sendRequestRecovery(mail: any) {
        return this.http.post<any>(
            `${environment.url}/auth/password-recovery/`,
            mail,
            {
                headers: this.headersToToken,
            }
        );
    }

    public changePasswordOnRecovery(data: any) {
        return this.http.post<any>(
            `${environment.url}/auth/change-password/`,
            data,
            {
                headers: this.headersToToken,
            }
        );
    }
}
