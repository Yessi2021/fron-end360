import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { ScrollService } from './services/scroll.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ModalCommunicationService } from './services/modal-communication.service';
import { AlertsComponent } from '../shared/components/alerts/alerts.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslationService } from '../translation-service.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, AfterViewInit {
    @ViewChild('sidenav') sidenav!: MatSidenav;
    @ViewChild(CdkScrollable) scrollable!: CdkScrollable;
    @ViewChild('main') mainElement!: MatSidenavContainer;
    @ViewChild('maturity') maturity!: ElementRef;

    specialBG: HTMLElement | null = null;
    offsetSubscription: Subscription;
    isMobile = false;
    offset = 0;
    sections: HTMLElement[] = [];
    sectionSelected: string | null = '';

    constructor(
        private el: ElementRef,
        private breakpointObserver: BreakpointObserver,
        private scrollService: ScrollService,
        private route: ActivatedRoute,
        private modalCommunicationService: ModalCommunicationService,
        private snackBar: MatSnackBar,
        private router: Router,
        private translationService: TranslationService
    ) {
        this.offsetSubscription = this.scrollService.offset$.subscribe(
            (newOffset) => {
                this.updateOffset(newOffset);

                this.updateSidenav(newOffset);
            }
        );
    }

    translate(key: string): string {
        return this.translationService.translate(key);
    }

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
                this.updateOffset(this.scrollService.getCurrentOffset());
            });
        this.route.paramMap.subscribe((params) => {
            this.sectionSelected = params.get('section');
        });
    }

    ngAfterViewInit() {
        this.offset = this.scrollable.measureScrollOffset('top');
        this.scrollable.elementScrolled().subscribe((scrolled) => {
            this.offset = this.scrollable.measureScrollOffset('top');
            this.scrollService.updateOffset(this.offset);
        });
        this.specialBG =
            this.mainElement.scrollable.getElementRef().nativeElement;
        this.updateOffset(this.scrollService.getCurrentOffset());

        this.sections = this.el.nativeElement.querySelectorAll('section');

        this.execSection();
    }

    updateOffset(newOffset: number) {
        if (this.specialBG?.parentElement) {
            this.specialBG.parentElement.style.backgroundPositionY = `${
                this.isMobile ? -newOffset + 64 : -newOffset
            }px`;
        }
    }

    updateSidenav(scrollPosition: number) {
        this.sections.forEach((section) => {
            const offsetTop = section.offsetTop - 150;
            const offsetHeight = section.offsetHeight;

            if (
                scrollPosition >= offsetTop &&
                scrollPosition < offsetTop + offsetHeight
            ) {
                if (this.scrollService.getCurrentLocation() != section.id)
                    this.scrollService.updateLocation(section.id);
            }
        });
    }

    execSection() {
        if (this.sectionSelected === 'maturity') {
            if (this.maturity) {
                this.scrollToElement(this.maturity);
                this.openModalMaturity();
            }
        }
    }

    scrollToElement(elementoScroll: ElementRef) {
        if (elementoScroll) {
            const elementoHTML = elementoScroll.nativeElement;
            elementoHTML.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
        }
    }

    openModalMaturity() {
        this.modalCommunicationService.openModalMaturity();
    }

    requestDemo() {
        // this.snackBar.openFromComponent(AlertsComponent, {
        //     data: {
        //         message: '¡No disponible en el momento!',
        //     },
        //     panelClass: ['custom-snackbar-normal'],
        //     horizontalPosition: 'end',
        //     verticalPosition: 'bottom',
        //     duration: 3000,
        // });
        this.router.navigate(['/request-demo']);
    }
}
