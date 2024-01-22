import { Component } from '@angular/core';
import { TranslationService } from 'src/app/translation-service.service';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
    constructor(private translationService: TranslationService) {}

    translate(key: string): string {
        return this.translationService.translate(key);
    }
}
