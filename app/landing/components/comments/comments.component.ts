import { Component } from '@angular/core';
import { TranslationService } from 'src/app/translation-service.service';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
    public index = 0;

    title_comment1 = '';
    title_comment2 = '';
    title_comment3 = '';

    title_content1_comment = '';
    title_content2_comment = '';
    title_content3_comment = '';
    comments: any[] = [];

    constructor(private translationService: TranslationService) {
        this.translate('clave_inicial');
    }

    translate(key: string): string {
        this.title_comment1 = this.translationService.translate('mark_title1');
        this.title_comment2 = this.translationService.translate('mark_title2');
        this.title_comment3 = this.translationService.translate('mark_title3');
        // this.title_unique_content1 =
        //     this.translationService.translate('unique_title2');

        this.comments = [
            {
                content: this.title_comment1 || 'Cargando...',
                avatar: 'Avatar.png',
                name: 'Factoring Divisa',
                rol: 'CEO',
            },
            {
                content: this.title_comment2,
                avatar: 'avatar-confirming.png',
                name: 'Confirming',
                rol: 'Presidente',
            },
            {
                content: this.title_comment3,
                avatar: 'avatar-gg.png',
                name: 'Gutierrez Group',
                rol: 'Grte. Financiero',
            },
        ];

        return this.translationService.translate(key);
    }

    previous() {
        if (this.index > 0) {
            this.index--;
        } else {
            this.index = this.comments.length - 1; // Ir al último elemento
        }
    }

    next() {
        if (this.index < this.comments.length - 1) {
            this.index++;
        } else {
            this.index = 0; // Volver al primer elemento
        }
    }
}
