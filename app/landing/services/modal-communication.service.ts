import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ModalCommunicationService {
    openModalEmitter: EventEmitter<void> = new EventEmitter<void>();

    openModalMaturity() {
        this.openModalEmitter.emit();
    }
}
