import { Component, OnInit } from '@angular/core';
import { TestMaturityComponent } from '../test-maturity/test-maturity.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalCommunicationService } from '../../services/modal-communication.service';
import { TranslationService } from 'src/app/translation-service.service';

@Component({
    selector: 'app-maturity',
    templateUrl: './maturity.component.html',
    styleUrls: ['./maturity.component.scss'],
})
export class MaturityComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        private modalCommunicationService: ModalCommunicationService,
        private translationService: TranslationService
    ) {}

    translate(key: string): string {
        return this.translationService.translate(key);
    }

    ngOnInit() {
        this.modalCommunicationService.openModalEmitter.subscribe(() => {
            this.openDialog();
        });
    }

    openDialog() {
        this.dialog.open(TestMaturityComponent, {
            autoFocus: false,
        });
    }
}
