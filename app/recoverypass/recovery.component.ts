import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RecoveryService } from './services/recovery.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertsComponent } from '../shared/components/alerts/alerts.component';

@Component({
    selector: 'app-recovery',
    templateUrl: './recovery.component.html',
    styleUrls: ['./recovery.component.scss'],
})
export class RecoveryComponent {
    constructor(
        private recoveryService: RecoveryService,
        private snackBar: MatSnackBar
    ) {}

    form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
    });

    requestRecovery() {
        if (this.form.valid) {
            this.recoveryService
                .sendRequestRecovery(this.form.getRawValue())
                .subscribe({
                    next: (res) => {
                        this.snackBar.openFromComponent(AlertsComponent, {
                            data: {
                                message: res.message,
                            },
                            panelClass: ['custom-snackbar-normal'],
                            horizontalPosition: 'end',
                            verticalPosition: 'top',
                            duration: 3000,
                        });
                    },
                    error: (ev) => {
                        const errorMsg = ev.error.message;
                        this.snackBar.openFromComponent(AlertsComponent, {
                            data: {
                                message: errorMsg
                                    ? errorMsg
                                    : 'Algo ha salido mal',
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
}
