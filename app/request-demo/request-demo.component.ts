import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RequestDemoService } from './service/request-demo.service';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AlertsComponent } from '../shared/components/alerts/alerts.component';

@Component({
    selector: 'app-request-demo',
    templateUrl: './request-demo.component.html',
    styleUrls: ['./request-demo.component.scss'],
})
export class RequestDemoComponent {
    constructor(
        private apidemo: RequestDemoService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {}

    form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        nombre: new FormControl('', [Validators.required]),
        nitEmpresa: new FormControl('', [Validators.required]),
        nEmpresa: new FormControl('', [Validators.required]),
        telefonoEmpresa: new FormControl('', [Validators.required]),
    });

    condicionBtn = false;
    showAuthorization = false;
    showAuthorizationEvent() {
        this.showAuthorization = true;
    }

    isChecked = false;

    changeStatusChecbox() {
        this.isChecked = !this.isChecked;
        this.condicionBtn = !this.condicionBtn;
    }

    authorizationSendData() {
        if (this.isChecked) {
            if (this.form.valid) {
                const valuesForm = this.form.value;
                this.apidemo.addUser(valuesForm).subscribe(
                    (response) => {
                        this.snackBar.openFromComponent(AlertsComponent, {
                            data: {
                                message: `${response.status}! Por favor revisar el correo registrado`,
                            },
                            panelClass: ['custom-snackbar-normal'],
                            horizontalPosition: 'end',
                            verticalPosition: 'top',
                            duration: 3000,
                        });
                    },
                    (error) => {
                        const responseError = error.error.error;

                        this.snackBar.openFromComponent(AlertsComponent, {
                            data: {
                                message: responseError,
                            },
                            panelClass: ['custom-snackbar-normal'],
                            horizontalPosition: 'end',
                            verticalPosition: 'top',
                            duration: 3000,
                        });
                    }
                );

                this.router.navigateByUrl('/');
            } else {
                this.snackBar.openFromComponent(AlertsComponent, {
                    data: {
                        message: 'Debe llenar los campos de los formularios',
                    },
                    panelClass: ['custom-snackbar-normal'],
                    horizontalPosition: 'end',
                    verticalPosition: 'top',
                    duration: 3000,
                });
            }
        } else {
            this.snackBar.openFromComponent(AlertsComponent, {
                data: {
                    message: 'Debe estar de acuerdo',
                },
                panelClass: ['custom-snackbar-normal'],
                horizontalPosition: 'end',
                verticalPosition: 'top',
                duration: 3000,
            });
        }
    }

    validAuthorization() {
        this.authorizationSendData();
    }
}
