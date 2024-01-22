import { Component, OnInit, ViewChild } from '@angular/core';
import { PowerBIReportEmbedComponent } from 'powerbi-client-angular';
import {
    IReportEmbedConfiguration,
    models,
    service,
    Embed,
} from 'powerbi-client';
import {
    EmbedCredential,
    PowerbiService,
} from '../../services/powerbi.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertsComponent } from 'src/app/shared/components/alerts/alerts.component';
@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
    businessIds: number[] = [];

    constructor(
        private powerbiService: PowerbiService,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const serviceName = params.get('service');
            this.reportConfig.accessToken = undefined;
            this.powerbiService
                .getReportCredentials(serviceName ? serviceName : '')
                .subscribe({
                    next: (res: EmbedCredential) => {
                        this.reportConfig.accessToken = res.embedToken;
                        this.reportConfig.embedUrl = res.embedUrl;
                        this.reportConfig.id = res.reportId;
                        this.businessIds = res.businessIds;
                    },
                    error: () => {
                        this.snackBar.openFromComponent(AlertsComponent, {
                            data: {
                                message:
                                    'La conexión ha fallado, inténtalo nuevamente',
                            },
                            panelClass: ['custom-snackbar-danger'],
                            horizontalPosition: 'end',
                            verticalPosition: 'top',
                            duration: 5000,
                        });
                    },
                });
        });
    }

    @ViewChild(PowerBIReportEmbedComponent)
    reportObj!: PowerBIReportEmbedComponent;
    reportConfig: IReportEmbedConfiguration = {
        type: 'report',
        tokenType: models.TokenType.Embed,
        settings: {
            filterPaneEnabled: false,
            navContentPaneEnabled: false,
        },
    };

    // CSS Class to be passed to the wrapper
    reportClass = 'report-container';

    // Flag which specify the type of embedding
    phasedEmbeddingFlag = false;

    eventHandlersMap = new Map([
        [
            'loaded',
            () => {
                const report = this.reportObj.getReport();
                report.setComponentTitle('Embedded report');
                this.applyBusinessIdFilter(this.businessIds);
            },
        ],
        [
            'error',
            (event?: service.ICustomEvent<any>) => {
                if (event) {
                    this.snackBar.openFromComponent(AlertsComponent, {
                        data: {
                            message: event.detail,
                        },
                        panelClass: ['custom-snackbar-danger'],
                        horizontalPosition: 'end',
                        verticalPosition: 'top',
                        duration: 5000,
                    });
                }
            },
        ],
    ]) as Map<
        string,
        (
            event?: service.ICustomEvent<any>,
            embeddedEntity?: Embed
        ) => void | null
    >;

    async applyBusinessIdFilter(businessIds: number[]): Promise<void> {
        const report = this.reportObj.getReport();
        const filter: models.IBasicFilter = {
            $schema: 'http://powerbi.com/product/schema#basic',
            filterType: models.FilterType.Basic,
            target: {
                table: 'public business_business',
                column: 'id',
            },
            operator: 'In',
            values: businessIds,
        };

        try {
            await report.updateFilters(models.FiltersOperations.Add, [filter]);
            await report.refresh();
        } catch (err: unknown) {
            if (err instanceof Error) {
                this.snackBar.openFromComponent(AlertsComponent, {
                    data: {
                        message: err.message,
                    },
                    panelClass: ['custom-snackbar-danger'],
                    horizontalPosition: 'end',
                    verticalPosition: 'top',
                    duration: 5000,
                });
            }
        }
    }
}
