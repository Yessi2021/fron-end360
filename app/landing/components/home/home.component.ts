import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleComponent } from '../schedule/schedule.component';
import { TranslationService } from 'src/app/translation-service.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    constructor(
        public dialog: MatDialog,
        private translationService: TranslationService
    ) {}

    translate(key: string): string {
        return this.translationService.translate(key);
    }

    openDialog() {
        this.dialog.open(ScheduleComponent, {
            autoFocus: false,
            minWidth: '90vw',
            minHeight: '90vh',
        });
    }
}
