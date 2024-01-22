import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/services/auth.service';
import { environment } from 'src/environments/environment';

export interface EmbedCredential {
    embedUrl: string;
    embedToken: string;
    reportId: string;
    businessIds: number[];
}

@Injectable({
    providedIn: 'root',
})
export class PowerbiService {
    private baseUrl: string = environment.url;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    getReportCredentials(serviceName: string): Observable<EmbedCredential> {
        return this.http.get<EmbedCredential>(
            `${this.baseUrl}/powerbi/auth-token/${serviceName}/`,
            {
                headers: this.authService.getAuthHeaders(),
            }
        );
    }
}
