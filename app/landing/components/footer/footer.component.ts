import { Component } from '@angular/core';
import { TranslationService } from 'src/app/translation-service.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
    constructor(private translationService: TranslationService) {}

    translate(key: string): string {
        return this.translationService.translate(key);
    }
}
