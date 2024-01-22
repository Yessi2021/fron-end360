import { Component } from '@angular/core';
import { TranslationService } from 'src/app/translation-service.service';

@Component({
    selector: 'app-weare',
    templateUrl: './weare.component.html',
    styleUrls: ['./weare.component.scss'],
})
export class WeareComponent {
    title_weare1 = '';
    title_weare2 = '';
    title_weare3 = '';
    title_weare_content1 = '';
    title_weare_content2 = '';
    title_weare_content3 = '';

    cards: any[] = []; // Inicializamos cards como un array vacío

    constructor(private translationService: TranslationService) {
        // Llamamos a translate para inicializar cards con el valor correcto
        this.translate('clave_inicial');
    }

    translate(key: string): string {
        this.title_weare1 = this.translationService.translate('ware_title3');
        this.title_weare_content1 =
            this.translationService.translate('ware_title4');
        this.title_weare2 = this.translationService.translate('ware_title5');
        this.title_weare_content2 =
            this.translationService.translate('ware_title6');
        this.title_weare3 = this.translationService.translate('ware_title7');
        this.title_weare_content3 =
            this.translationService.translate('ware_title8');

        this.cards = [
            {
                img: 'ep_data-line.svg',
                title: this.title_weare1 || 'cargando titulo...',
                content: this.title_weare_content1 || 'cargando contenido ...',
            },
            {
                img: 'values.svg',
                title: this.title_weare2 || 'Cargando titulo...',
                content: this.title_weare_content2 || 'cargando contenido ...',
            },
            {
                img: 'programming 1.svg',
                title: this.title_weare3 || 'Cargando titulo...',
                content: this.title_weare_content3 || 'cargando contenido ...',
            },
        ];

        return this.translationService.translate(key);
    }
}
