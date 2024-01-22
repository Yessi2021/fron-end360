import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public headersToToken = new HttpHeaders({
        'Content-Type': 'application/json',
    });
    constructor(private http: HttpClient) {}

    public login(credentials: any) {
        return this.http.post<any>(
            `${environment.url}/auth/login/`,
            credentials,
            {
                headers: this.headersToToken,
            }
        );
    }

    public verifyToken(token: string) {
        return this.http.post(
            `${environment.url}/auth/token-verify/`,
            { token },
            {
                headers: this.headersToToken,
            }
        );
    }

    public verifyAuth(permission: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        });
        return this.http.get(
            `${environment.url}/auth/verify-permission/${permission}`,
            {
                headers: headers,
            }
        );
    }

    public getPermissions() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        });
        return this.http.get(`${environment.url}/permissions`, {
            headers: headers,
        });
    }

    public refreshToken(refresh: any) {
        return this.http.post(
            `${environment.url}/auth/token-refresh/`,
            { refresh },
            {
                headers: this.headersToToken,
            }
        );
    }

    extractDataFromToken(token: string): any | null {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        } catch (error) {
            console.error('Error decoding the JWT token:', error);
            return null;
        }
    }

    public getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('accessToken');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
        return headers;
    }
}
