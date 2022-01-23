import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppSettings } from '@app/app';
import { AlertType, Notification, NotificationsService } from '@app/controls';
import { Menu } from '@app/controls/menu';
import { Card } from '@app/pages/cards/card';
import { ScannerService } from '@app/pages/scanner/scanner.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@AutoUnsubscribe()
@Component({
  selector: 'scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit {
  constructor(
    private titleService: Title,
    private scannerService: ScannerService,
    private notificationService: NotificationsService
  ) {}

  // Webcam options
  public deviceId: string;
  public multipleWebcamsAvailable = false;
  public videoOptions: MediaTrackConstraints = {};
  public errors: WebcamInitError[] = [];
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();

  // Options
  matches: Card[] = [];
  visibleMatches: Card[] = [];
  scanned: boolean;
  showResult: boolean;
  scannerResultMenu: Menu;
  menuScannerOptions: Menu;
  soundEffect: HTMLAudioElement;

  ngOnDestroy() {}

  ngOnInit() {
    this.setupControls();
    this.setupService();
  }

  setupControls() {
    // Load sound effect
    this.soundEffect = new Audio();
    this.soundEffect.src = '../../assets/audio/soundeffect.mp3';
    this.soundEffect.load();

    // Go to rear camera
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
        if (this.multipleWebcamsAvailable) {
          this.showNextWebcam(mediaDevices[1].deviceId);
        }
      }
    );

    // Page title
    this.titleService.setTitle(AppSettings.titlePrefix + 'Scanner');

    // Cached results
    if (this.scannerService.scannerList.cards.length) {
      this.addMatches(this.scannerService.scannerList.cards);
    }
  }

  setupService() {
    this.scannerService.scanObservable().subscribe((card: any) => {
      if (card) this.addMatches([card]);
    });
  }

  addMatches(cards: Card[]) {
    if (this.scanned) this.soundEffect.play();
    cards.forEach((card) => this.addMatch(card));
  }

  addMatch(card: Card) {
    card.tempId = this.scannerService.getTempId();

    // Limit tray to 10
    if (this.visibleMatches.length >= 6) this.visibleMatches.shift();
    this.visibleMatches.push(card);
    this.matches.push(card);

    // Update cache
    this.scannerService.scannerList.cards = this.matches;
  }

  handleWebcamInitError(error: WebcamInitError): void {
    this.notificationService.addNotifications([
      new Notification({
        message: error.message,
        alertType: AlertType.error,
      }),
    ]);
  }

  showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true = next device, false = previous device, string = deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  handleWebcamImage(webcamImage: WebcamImage): void {
    this.scanned = true;
    const kilobytes = (webcamImage.imageAsBase64.length * (3 / 4) - 2) / 1000;
    this.scannerService.scan(webcamImage.imageAsBase64);
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  runScan() {
    if (this.trigger) this.trigger.next();
  }
}
