import { Component } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../../services/customer.service';
import { TranslationService } from 'src/app/translation-service.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
    contact: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required, this.lettersOnly]),
        email: new FormControl('', [Validators.required, Validators.email]),
        business: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        message: new FormControl('', Validators.required),
    });

    constructor(
        public dialog: MatDialog,
        private customerService: CustomerService,
        private translationService: TranslationService
    ) {}

    translate(key: string): string {
        return this.translationService.translate(key);
    }

    lettersOnly(control: AbstractControl): ValidationErrors | null {
        if (!/^[a-zA-Z]+$/.test(control.value)) {
            return { lettersOnly: true };
        }
        return null;
    }

    submitSurvey() {
        this.customerService
            .contact({
                ...this.contact.getRawValue(),
            })
            .subscribe({
                next: () => {
                    alert('Pronto estaremos en contacto contigo');
                },
                error: (er) => {
                    // #TODO: Manage errors
                    alert('Algo salió mal. Intenta nuevamente');
                },
                complete: () => {
                    this.contact.reset();
                },
            });
    }
}
