import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { TRANSLATIONS } from './translation-service/translations';

@Injectable({
    providedIn: 'root',
})
export class TranslationService {
    private translations: { [lang: string]: { [key: string]: string } } =
        TRANSLATIONS;
    currentLanguage = 'es';

    constructor(private http: HttpClient) {}

    loadTranslations(lang: string): Observable<void> {
        console.log('Cargando traducciones para el idioma:', lang);
        return this.http.get(`assets/i18n/${lang}.json`).pipe(
            tap(
                (translations) => {
                    this.translations[lang] = translations as {
                        [key: string]: string;
                    };
                    console.log('Traducciones almacenadas:', this.translations);
                },
                (error) => {
                    console.error('Error al cargar traducciones:', error);
                }
            )
        );
    }
    setLanguage(lang: string) {
        console.log('Cambiando idioma a:', lang);
        this.currentLanguage = lang;
        this.loadTranslations(lang);
        console.log('Traducciones cargadas:', this.translations);
    }

    translate(key: string, lang: string = this.currentLanguage): string {
        const translation = this.translations[lang];
        if (translation && translation[key]) {
            return translation[key];
        }
        // Si la traducción no está disponible, devolver la clave como valor predeterminado
        return key;
    }
}
