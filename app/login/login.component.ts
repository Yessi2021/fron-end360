import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AlertsComponent } from '../shared/components/alerts/alerts.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslationService } from '../translation-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    hidePassword = true;
    form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar,
        private translationService: TranslationService
    ) {}

    ngOnInit(): void {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) this.refreshLogin(refreshToken);
    }

    translate(key: string): string {
        return this.translationService.translate(key);
    }

    togglePasswordVisibility() {
        this.hidePassword = !this.hidePassword;
    }

    login() {
        if (this.form.invalid) return;
        //TODO: show errors
        this.authService.login(this.form.getRawValue()).subscribe({
            next: (res: any) => {
                localStorage.setItem('accessToken', res.access);
                localStorage.setItem('refreshToken', res.refresh);
                this.snackBar.openFromComponent(AlertsComponent, {
                    data: {
                        message: '¡Ingreso exitoso!',
                    },
                    panelClass: ['custom-snackbar-normal'],
                    horizontalPosition: 'end',
                    verticalPosition: 'top',
                    duration: 3000,
                });
                this.router.navigateByUrl('/intranet');
            },
            error: (ev: any) => {
                const errorMsg = ev.error.detail;
                this.snackBar.openFromComponent(AlertsComponent, {
                    data: {
                        message: errorMsg ? errorMsg : 'Algo ha salido mal',
                    },
                    panelClass: ['custom-snackbar-danger'],
                    horizontalPosition: 'end',
                    verticalPosition: 'top',
                    duration: 5000,
                });
            },
        });
    }

    checkLogin(token: string) {
        this.authService.verifyToken(token).subscribe({
            next: (value: any) => {
                this.router.navigateByUrl('/');
            },
            error: (ev: any) => {
                this.router.navigateByUrl('/login');
            },
        });
    }

    refreshLogin(refreshToken: string) {
        this.authService.refreshToken(refreshToken).subscribe({
            next: (res: any) => {
                localStorage.setItem('accessToken', res.accessToken);
                this.router.navigateByUrl('/intranet');
            },
            error: (err: any) => {
                localStorage.removeItem('refreshToken');
            },
        });
    }

    activeAccount() {
        this.snackBar.openFromComponent(AlertsComponent, {
            data: {
                message: '¡No disponible en el momento!',
            },
            panelClass: ['custom-snackbar-normal'],
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000,
        });
    }
}
