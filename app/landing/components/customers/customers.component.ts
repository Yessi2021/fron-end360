import { Component } from '@angular/core';
import { TranslationService } from 'src/app/translation-service.service';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent {
    constructor(private translationService: TranslationService) {}

    translate(key: string): string {
        return this.translationService.translate(key);
    }
}
