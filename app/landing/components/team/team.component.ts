import { Component } from '@angular/core';
import { TranslationService } from 'src/app/translation-service.service';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
    constructor(private translationService: TranslationService) {}

    translate(key: string): string {
        return this.translationService.translate(key);
    }
}
