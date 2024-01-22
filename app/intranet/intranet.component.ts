import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { TranslationService } from '../translation-service.service';

@Component({
    selector: 'app-intranet',
    templateUrl: './intranet.component.html',
    styleUrls: ['./intranet.component.scss'],
})
export class IntranetComponent implements OnInit {
    @ViewChild('sidenav') sidenav!: MatSidenav;
    isMobile = false;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router,
        private translationService: TranslationService
    ) {}
    ngOnInit(): void {
        this.breakpointObserver
            .observe(['(max-width: 900px)'])
            .subscribe((result: BreakpointState) => {
                if (result.matches) {
                    this.isMobile = true;
                    this.sidenav?.close();
                } else {
                    this.isMobile = false;
                    this.sidenav?.open();
                }
            });
    }

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        this.router.navigateByUrl('/login');
    }

    translate(key: string): string {
        return this.translationService.translate(key);
    }
}
