import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ScrollService } from '../../services/scroll.service';
import { TranslationService } from 'src/app/translation-service.service';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements AfterViewInit, OnInit {
    screenHeight = 0;
    offsetSubscription: Subscription;
    locationSubscription!: Subscription;
    initOffset = 0;
    @ViewChild('sidenav') sidenavElement!: ElementRef;
    location = 'home';

    constructor(
        private scrollService: ScrollService,
        private cdr: ChangeDetectorRef,
        private translationService: TranslationService
    ) {
        this.offsetSubscription = this.scrollService.offset$.subscribe(
            (newOffset) => {
                if (this.sidenavElement) {
                    this.updatePaddingTop(newOffset);
                }
            }
        );
    }
    ngOnInit(): void {
        this.locationSubscription = this.scrollService.location$.subscribe(
            (newLocation: string) => {
                this.location = newLocation;
                this.cdr.detectChanges();
            }
        );
    }
    ngAfterViewInit(): void {
        this.screenHeight = window.innerHeight;
        this.initOffset = window.innerHeight + 130;
    }

    ngOnDestroy() {
        this.offsetSubscription.unsubscribe();
        this.locationSubscription.unsubscribe();
    }

    updatePaddingTop(newOffset: number) {
        const offset = this.initOffset - newOffset;
        const newValue = offset < 0 ? 0 : offset;
        const width = window.innerWidth;
        const valueToApply = width < 900 ? 0 : newValue;
        this.sidenavElement.nativeElement.style.paddingTop = `${valueToApply}px`;
    }

    translate(key: string): string {
        return this.translationService.translate(key);
    }
}
