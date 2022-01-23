import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppSettings } from '@app/app';
import { AlertType, Notification, NotificationsService } from '@app/controls';
import { Menu } from '@app/controls/menu';
import { Card } from '@app/pages/cards/card';
import { ScannerService } from '@app/pages/scanner/scanner.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { last, Observable, Subject } from 'rxjs';

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
  scans: Card[] = [];
  scansVisible: Card[] = [];
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
    if (this.scannerService.scans.length)
      this.scans = this.scannerService.scans;
  }

  setupService() {
    this.scannerService.scansObservable().subscribe((scans) => {
      this.scans = scans;
      // Limit visible to 6
      this.scansVisible = this.scans.slice(0, 6);
    });
  }

  runScan() {
    if (this.trigger) this.trigger.next();
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
    this.soundEffect.play();
    const kilobytes = (webcamImage.imageAsBase64.length * (3 / 4) - 2) / 1000;
    this.scannerService.scan(webcamImage.imageAsBase64);
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
}
