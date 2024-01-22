import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecoveryService } from '../../services/recovery.service';
import { AlertsComponent } from 'src/app/shared/components/alerts/alerts.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-change',
    templateUrl: './change.component.html',
    styleUrls: ['./change.component.scss'],
})
export class ChangeComponent {
    public hidePassword1 = true;
    public hidePassword2 = true;
    form: FormGroup = new FormGroup({
        password1: new FormControl('', [Validators.required]),
        password2: new FormControl('', [Validators.required]),
        token: new FormControl('', [Validators.required]),
    });

    constructor(
        private route: ActivatedRoute,
        private recoveryService: RecoveryService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            const token = params.get('token');
            this.form.get('token')?.setValue(token);
        });
    }

    togglePasswordVisibility(isFirstPass = true) {
        if (isFirstPass) this.hidePassword1 = !this.hidePassword1;
        else this.hidePassword2 = !this.hidePassword2;
    }

    savePass() {
        this.recoveryService
            .changePasswordOnRecovery(this.form.getRawValue())
            .subscribe({
                next: (res) => {
                    this.snackBar.openFromComponent(AlertsComponent, {
                        data: {
                            message: res.message,
                        },
                        panelClass: ['custom-snackbar-normal'],
                        horizontalPosition: 'end',
                        verticalPosition: 'top',
                        duration: 5000,
                    });
                    this.router.navigateByUrl('/login');
                },
                error: (ev) => {
                    const errorMsg = ev.error.message;
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
}
