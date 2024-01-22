import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RequestDemoService {
    private apiDemo = `${environment.url}/auth/request-demo/`;

    constructor(private http: HttpClient) {}

    addUser(usuario: any): Observable<any> {
        return this.http.post<any>(this.apiDemo, usuario);
    }
}
