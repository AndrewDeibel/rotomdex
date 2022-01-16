import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dialog } from './dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor() {}

  private dialogSubject = new BehaviorSubject<Dialog | null>(null);
  getDialogObservable() {
    this.dialogSubject = new BehaviorSubject<Dialog | null>(null);
    return this.dialogSubject.asObservable();
  }

  setDialog(dialog: Dialog) {
    this.dialogSubject.next(dialog);
  }
}
