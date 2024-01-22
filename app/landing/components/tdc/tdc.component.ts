import { Component } from '@angular/core';
import { TranslationService } from 'src/app/translation-service.service';

@Component({
    selector: 'app-tdc',
    templateUrl: './tdc.component.html',
    styleUrls: ['./tdc.component.scss'],
})
export class TdcComponent {
    constructor(private translationService: TranslationService) {}

    translate(key: string): string {
        return this.translationService.translate(key);
    }
}
