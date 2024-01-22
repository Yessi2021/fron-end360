import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ScrollService {
    private offsetSubject = new BehaviorSubject<number>(0);
    offset$: Observable<number> = this.offsetSubject.asObservable();
    private offsetLocation = new BehaviorSubject<string>('home');
    location$: Observable<string> = this.offsetLocation.asObservable();

    updateOffset(offset: number) {
        this.offsetSubject.next(offset);
    }

    getCurrentOffset(): number {
        return this.offsetSubject.value;
    }

    updateLocation(location: string) {
        this.offsetLocation.next(location);
    }

    getCurrentLocation(): string {
        return this.offsetLocation.value;
    }
}
