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
} from '@app/controls';

@Injectable({
  providedIn: 'root',
})
export class ScannerService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService
  ) {}

  // TempId
  private tempId = 0;
  getTempId() {
    return this.tempId++;
  }

  // Scan single card
  scan(image: string) {
    const tempId = this.getTempId();
    this.addScan(new Card({ placeholder: true, tempId }));
    this.http
      .post<APIResponse>(buildUrl('scanner/detect'), { image })
      .subscribe((res) => {
        this.removeScan(tempId);
        if (res.success) {
          this.addScan(
            new Card({
              ...res.data.results[0].card,
              other_results:
                res.data.results.length > 1 ? res.data.results.splice(1) : [],
              tempId: this.getTempId(),
            })
          );
        } else {
          this.notificationService.addNotifications([
            new Notification({
              message: res.data,
              alertType: AlertType.error,
              duration: defaultDuration,
            }),
          ]);
        }
      });
  }

  // Scanned cards
  private scansSubject = new BehaviorSubject<Card[]>([]);
  scansObservable() {
    return this.scansSubject.asObservable();
  }
  clearScans() {
    this.scansSubject = new BehaviorSubject<Card[]>([]);
  }
  addScan(scan: Card) {
    const scans = [...this.scansSubject.value, scan];
    this.scansSubject.next(scans);
  }
  removeScan(tempId: number) {
    const scans = this.scansSubject.value.filter(
      (scan) => scan.tempId !== tempId
    );
    this.scansSubject.next(scans);
  }
  get scans() {
    return this.scansSubject.value;
  }
  set scans(scans: Card[]) {
    this.scansSubject.next(scans);
  }
}
