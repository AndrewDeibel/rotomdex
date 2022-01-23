import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { APIResponse, buildUrl } from '@app/models';
import { ScannerList, Card } from '@app/pages';
import {
  NotificationsService,
  Notification,
  AlertType,
  defaultDuration,
  LoaderService,
} from '@app/controls';

@Injectable({
  providedIn: 'root',
})
export class ScannerService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService,
    private loaderService: LoaderService
  ) {}

  // TempId
  private tempId = 0;
  getTempId() {
    return this.tempId++;
  }

  // Scan single card
  private scanSubject = new BehaviorSubject<Card | null>(null);
  scanObservable() {
    this.scanSubject = new BehaviorSubject<Card | null>(null);
    return this.scanSubject.asObservable();
  }
  scan(image: string) {
    this.loaderService.addItemLoading('scan');
    this.http
      .post<APIResponse>(buildUrl('scanner/detect'), { image })
      .subscribe((res) => {
        this.loaderService.clearItemLoading('scan');
        if (res.success) {
          const card = new Card(res.data.card.card);
          if (card.id > 0) {
            this.scanSubject.next(card);
          }
        } else {
          this.notificationService.addNotifications([
            new Notification({
              message: res.data,
              alertType: AlertType.error,
              duration: defaultDuration,
            }),
          ]);
          this.scanSubject.next(null);
        }
      });
  }

  // Scan cache
  private _scannerList: ScannerList = new ScannerList();
  get scannerList() {
    return this._scannerList;
  }
  set scannerList(scannerList) {
    this._scannerList = scannerList;
  }

  // Clear cache
  clearScans() {
    this._scannerList = new ScannerList();
  }

  // Scan cache
  private scansSubject = new BehaviorSubject<Card[]>([]);
  getScansObservable() {
    this.scansSubject = new BehaviorSubject<Card[]>([]);
    return this.scansSubject.asObservable();
  }
  getScans() {
    this.scansSubject.next(this._scannerList.cards);
  }

  changeVersion(cardOld: Card, cardNew: Card) {
    // Remove old card via tempId
    // this._scannerList.cards = this._scannerList.cards.filter(card => {
    // 	return card.tempId != cardOld.tempId;
    // });
    const updatedScannerListCards: Card[] = [];
    this._scannerList.cards.forEach((card) => {
      if (card.tempId === cardOld.tempId) {
        updatedScannerListCards.push(cardNew);
      } else {
        updatedScannerListCards.push(card);
      }
    });

    this._scannerList.cards = updatedScannerListCards;

    // Add new card
    //cardNew.tempId = cardOld.tempId++;
    //this._scannerList.cards.push(cardNew);

    // Update subscriptions
    this.scansSubject.next(this._scannerList.cards);
  }

  removeCard(card: Card) {
    this._scannerList.cards = this._scannerList.cards.filter((_card) => {
      return _card.tempId != card.tempId;
    });

    // Update subscriptions
    this.scansSubject.next(this._scannerList.cards);

    this.notificationService.addNotifications([
      new Notification({
        alertType: AlertType.success,
        message: 'Removed ' + card.name + ' from results',
      }),
    ]);
  }
}
