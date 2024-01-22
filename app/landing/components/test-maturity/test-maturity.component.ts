import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ShowLevelMaturityComponent } from '../show-level-maturity/show-level-maturity.component';
import { CustomerService } from '../../services/customer.service';
import { TranslationService } from 'src/app/translation-service.service';

@Component({
    selector: 'app-test-maturity',
    templateUrl: './test-maturity.component.html',
    styleUrls: ['./test-maturity.component.scss'],
})
export class TestMaturityComponent {
    questions: FormGroup = new FormGroup({
        tools: new FormControl('', Validators.required),
        standars: new FormControl('', Validators.required),
        avaliability: new FormControl('', Validators.required),
        level: new FormControl('', Validators.required),
        management: new FormControl('', Validators.required),
    });

    customer: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.email, Validators.required]),
        business: new FormControl(''),
    });

    constructor(
        public dialog: MatDialog,
        private customerService: CustomerService,
        private translationService: TranslationService
    ) {}

    translate(key: string): string {
        return this.translationService.translate(key);
    }

    openDialog(data: any) {
        this.dialog.open(ShowLevelMaturityComponent, {
            autoFocus: false,
            data: data,
        });
    }

    submitSurvey() {
        const totalPuntos = this.sumaValores(this.questions.getRawValue());
        const levelData = this.getLevel(totalPuntos);
        this.customerService
            .valuation({
                ...this.questions.getRawValue(),
                ...this.customer.getRawValue(),
            })
            .subscribe({
                next: () => {
                    this.openDialog(levelData);
                },
                error: () => {
                    this.openDialog(levelData);
                },
                complete: () => {
                    this.questions.reset();
                    this.customer.reset();
                },
            });
    }

    sumaValores(objeto: any) {
        let suma = 0;

        for (const clave in objeto) {
            if (!isNaN(objeto[clave])) {
                suma += parseInt(objeto[clave]);
            }
        }

        return suma;
    }

    getLevel(puntos: number) {
        let nivel = '';
        let diagnostico = '';
        let oportunidad = '';

        if (puntos >= 1 && puntos <= 5) {
            nivel = 'level-1';
            diagnostico = 'Necesita mejorar la estructura de sus informes';
            oportunidad =
                'Trabaje en la organización y presentación de sus datos';
        } else if (puntos >= 6 && puntos <= 10) {
            nivel = 'level-2';
            diagnostico = 'Tiene un nivel básico de generación de informes';
            oportunidad =
                'Explore herramientas de reporting más avanzadas para mejorar sus informes';
        } else if (puntos >= 11 && puntos <= 15) {
            nivel = 'level-3';
            diagnostico = 'Capacidad para crear tableros directivos';
            oportunidad =
                'Refine sus habilidades de visualización de datos para hacerlos más impactantes';
        } else if (puntos >= 16 && puntos <= 20) {
            nivel = 'level-4';
            diagnostico = 'Habilidad en generación de informes avanzados';
            oportunidad =
                'Considere la incorporación de análisis predictivos para llevar sus informes al siguiente nivel';
        } else if (puntos >= 21 && puntos <= 24) {
            nivel = 'level-5';
            diagnostico =
                'Capacidad para realizar predicciones a partir de datos';
            oportunidad =
                'Explore técnicas de machine learning para mejorar sus predicciones';
        } else if (puntos === 25) {
            nivel = 'level-6';
            diagnostico = 'Experto en análisis y predicción de datos';
            oportunidad = '¡Felicitaciones por alcanzar el nivel más alto!';
        } else {
            nivel = 'Nivel no definido';
            diagnostico = 'Puntos fuera de rango';
            oportunidad = '';
        }

        const resultado = {
            nivel: nivel,
            diagnostico: diagnostico,
            oportunidad: oportunidad,
        };

        return resultado;
    }
}
