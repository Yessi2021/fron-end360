import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../translation-service.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-translation-service',
    templateUrl: './translation-service.component.html',
    styleUrls: ['./translation-service.component.scss'],
})
export class TranslationServiceComponent implements OnInit {
    constructor(private translationService: TranslationService) {}

    imagePath =
        'https://c0.klipartz.com/pngpicture/764/991/gratis-png-bandera-de-inglaterra-bandera-del-reino-unido-bandera-inglesa-de-gran-bretana-inglaterra.png';

    selectedLanguage = 'es';

    changeLanguage() {
        console.log('Cambiando idioma a:', this.selectedLanguage);
        this.translationService.setLanguage(this.selectedLanguage);

        if (this.selectedLanguage === 'en') {
            this.imagePath =
                'https://c0.klipartz.com/pngpicture/764/991/gratis-png-bandera-de-inglaterra-bandera-del-reino-unido-bandera-inglesa-de-gran-bretana-inglaterra.png';
        } else if (this.selectedLanguage === 'es') {
            this.imagePath =
                'https://w7.pngwing.com/pngs/699/656/png-transparent-foreign-language-language-acquisition-learning-word-spanish-language-word-foreign-language-symbol.png';
        }
    }

    translate(key: string): string {
        return this.translationService.translate(key);
    }

    ngOnInit() {
        console.log('Componente TranslationServiceComponent inicializado.');
    }
}
