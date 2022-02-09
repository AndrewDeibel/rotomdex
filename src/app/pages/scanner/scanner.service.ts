import { Card } from '@app/pages/cards';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AlertType,
  defaultDuration,
  Notification,
  NotificationsService,
} from '@app/controls';
import { APIResponse, buildUrl } from '@app/models';
import { ScanCard } from '@app/pages';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from './../../controls/loader/loader.service';
import { APIGetPaged } from './../../models/api';
import { ProcessScan } from './scan-card';

export interface ResScans {
  total_value?: number;
  total_results: number;
  total_pages: number;
  scans?: ScanCard[];
}

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
  scan(image: string) {
    this.http
      .post<APIResponse>(buildUrl('scanner/detect'), { image })
      .subscribe((res) => {
        if (res.success) {
          this.addScan(
            new ScanCard({
              ...res.data.results.result,
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

  // Recent scans (locally cache)
  private recentScansSubject = new BehaviorSubject<ScanCard[]>([]);
  recentScansObservable() {
    return this.recentScansSubject.asObservable();
  }
  set recentScans(scans: ScanCard[]) {
    this.recentScansSubject.next(scans.slice(Math.max(scans.length - 6, 0)));
  }
  addScan(scan: ScanCard) {
    this.recentScansSubject.next([...this.recentScansSubject.value, scan]);
  }

  // Get scans
  private getScansSubject = new BehaviorSubject<ResScans | null>(null);
  getScansObservable() {
    return this.getScansSubject.asObservable();
  }
  getScans(params: APIGetPaged) {
    this.loaderService.addItemLoading('getScans');
    this.http
      .get<APIResponse>(params.buildUrl('scanner/scans'))
      .subscribe((res) => {
        const scans = res.data.map((scan: any) => new ScanCard(scan));
        this.getScansSubject.next({
          scans,
          total_pages: res.meta.last_page,
          total_results: res.meta.total,
        });
        this.recentScans = scans;
        this.loaderService.clearItemLoading('getScans');
      });
  }

  // Update scan
  private updateScanSubject = new BehaviorSubject<Card | null>(null);
  updateScanObservable() {
    this.updateScanSubject = new BehaviorSubject<Card | null>(null);
    return this.updateScanSubject.asObservable();
  }
  updateScan(scan: ScanCard) {
    this.loaderService.addItemLoading('updateScan');
    this.http
      .post<APIResponse>(buildUrl('scanner/update'), scan)
      .subscribe((res) => {
        this.loaderService.clearItemLoading('updateScan');
        if (res.success) {
          this.updateScanSubject.next(new Card(res.data));
          this.notificationService.addNotifications([
            new Notification({
              message: 'Updated',
              alertType: AlertType.success,
            }),
          ]);
        }
      });
  }

  // Process scans
  private processScansSubject = new BehaviorSubject<boolean | null>(null);
  processScansObservable() {
    return this.processScansSubject.asObservable();
  }
  processScans(scans: ProcessScan[]) {
    this.loaderService.addItemLoading('processScans');
    this.http
      .post<APIResponse>(buildUrl('scanner/process'), { scans })
      .subscribe((res) => {
        this.loaderService.clearItemLoading('processScans');
        this.processScansSubject.next(res.success);
        if (res.success) {
          this.notificationService.addNotifications([
            new Notification({
              message: 'Cards added',
              alertType: AlertType.success,
            }),
          ]);
        }
      });
  }
}
