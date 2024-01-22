import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from 'src/app/translation-service.service';

export interface Valoration {
    nivel: string;
    diagnostico: string;
    oportunidad: string;
}

@Component({
    selector: 'app-show-level-maturity',
    templateUrl: './show-level-maturity.component.html',
    styleUrls: ['./show-level-maturity.component.scss'],
})
export class ShowLevelMaturityComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Valoration,
        private translationService: TranslationService
    ) {}

    translate(key: string): string {
        return this.translationService.translate(key);
    }
}
