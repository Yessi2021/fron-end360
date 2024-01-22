import { Component } from '@angular/core';
import { TranslationService } from 'src/app/translation-service.service';

@Component({
    selector: 'app-uniques',
    templateUrl: './uniques.component.html',
    styleUrls: ['./uniques.component.scss'],
})
export class UniquesComponent {
    uniques: any[] = [];
    title_unique1 = '';
    title_unique2 = '';
    title_unique3 = '';
    title_unique4 = '';
    title_unique5 = '';
    title_unique6 = '';
    title_unique_content1 = '';
    title_unique_content2 = '';
    title_unique_content3 = '';
    title_unique_content4 = '';
    title_unique_content5 = '';
    title_unique_content6 = '';
    constructor(private translationService: TranslationService) {
        this.translate('clave_inicial');
    }

    translate(key: string): string {
        this.title_unique1 = this.translationService.translate('unique_title1');
        this.title_unique_content1 =
            this.translationService.translate('unique_title2');

        this.title_unique2 = this.translationService.translate('unique_title3');
        this.title_unique_content2 =
            this.translationService.translate('unique_title4');

        this.title_unique3 = this.translationService.translate('unique_title5');
        this.title_unique_content3 =
            this.translationService.translate('unique_title6');

        this.title_unique4 = this.translationService.translate('unique_title7');
        this.title_unique_content4 =
            this.translationService.translate('unique_title8');

        this.title_unique5 = this.translationService.translate('unique_title9');

        this.title_unique_content5 =
            this.translationService.translate('unique_title10');

        this.title_unique6 =
            this.translationService.translate('unique_title11');

        this.title_unique_content6 =
            this.translationService.translate('unique_title12');

        this.uniques = [
            {
                img: 'aws.svg',
                title: this.title_unique1 || 'Cargando el titulo',
                msg: this.title_unique_content1 || 'Cargando el contenido',
            },
            {
                img: 'solutions.svg',
                title: this.title_unique2 || 'Cargando el titulo',
                msg: this.title_unique_content2 || 'Cargando el contenido',
            },
            {
                img: 'views.svg',
                title: this.title_unique3 || 'Cargando el titulo',
                msg: this.title_unique_content3 || 'Cargando el contenido',
            },
            {
                img: 'auto.svg',
                title: this.title_unique4 || 'Cargando el titulo',
                msg: this.title_unique_content4 || 'Cargando el contenido',
            },
            {
                img: 'models.svg',
                title: this.title_unique5 || 'Cargando el titulo',
                msg: this.title_unique_content5 || 'Cargando el contenido',
            },
            {
                img: 'data-analysis.svg',
                title: this.title_unique6 || 'Cargando el titulo',
                msg: this.title_unique_content6 || 'Cargando el contenido',
            },
        ];

        return this.translationService.translate(key);
    }
}
