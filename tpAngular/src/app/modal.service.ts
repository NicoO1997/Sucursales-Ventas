// modal.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private displaySubject = new BehaviorSubject<boolean>(false);
  display$ = this.displaySubject.asObservable();

  open() {
    this.displaySubject.next(true);
  }

  close() {
    this.displaySubject.next(false);
  }
}