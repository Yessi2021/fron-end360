import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
    Contact,
    FormContact,
    FormVal,
    Valoration,
} from '../interfaces/customer.interface';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(private http: HttpClient) {}

    public contact(data: FormContact) {
        return this.http.post<Contact>(
            `${environment.url}/customer/contact/`,
            data,
            {
                headers: this.headers,
            }
        );
    }

    public valuation(data: FormVal) {
        return this.http.post<Valoration>(
            `${environment.url}/customer/valuation/`,
            data,
            {
                headers: this.headers,
            }
        );
    }
}
