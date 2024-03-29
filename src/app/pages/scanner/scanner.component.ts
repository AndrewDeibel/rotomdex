import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppSettings } from '@app/app';
import {
  Alert,
  AlertType,
  Button,
  Notification,
  NotificationsService,
} from '@app/controls';
import { APIGetPaged, Icons } from '@app/models';
import { AuthenticationService } from '@app/pages/auth/auth.service';
import { ScannerService } from '@app/pages/scanner/scanner.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { User } from '..';
import { ScanResult } from './scan-card';

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
    private notificationService: NotificationsService,
    private authenticationService: AuthenticationService,
    private router: Router
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
  totalScans: number;
  recentScans: ScanResult[] = [];
  soundEffect: HTMLAudioElement;
  alertInstructions: Alert;
  showAlert: boolean;
  buttonRemoveLastScanned: Button;

  ngOnInit() {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigateByUrl('/signin');
    } else {
      this.setupControls();
      this.setupSubscriptions();
      this.getInitData();
    }
  }
  ngOnDestroy() {}

  getInitData() {
    this.scannerService.getScans(
      new APIGetPaged({
        page: 1,
        page_size: 12,
      })
    );
  }

  goToRearCamera() {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        if (!this.deviceId) {
          this.multipleWebcamsAvailable =
            mediaDevices && mediaDevices.length > 1;
          if (this.authenticationService.currentUserValue?.device_id) {
            this.showNextWebcam(
              this.authenticationService.currentUserValue.device_id
            );
          } else if (this.multipleWebcamsAvailable) {
            this.showNextWebcam(mediaDevices[1].deviceId);
          }
        }
      }
    );
  }

  setupControls() {
    this.goToRearCamera();

    // Load sound effect
    this.soundEffect = new Audio();
    this.soundEffect.src = '../../assets/audio/soundeffect.mp3';
    this.soundEffect.load();

    // Page title
    this.titleService.setTitle(AppSettings.titlePrefix + 'Scanner');

    // Remove last scan button
    this.buttonRemoveLastScanned = new Button({
      icon: Icons.trash,
      text: 'Last Scan',
      classes: 'xsmall round-small width-12',
      click: () => {
        this.removeLastScanned();
      },
    });
  }

  removeLastScanned() {}

  setupSubscriptions() {
    // Total scans
    this.scannerService.totalScansObservable().subscribe((totalScans) => {
      this.totalScans = totalScans;
    });

    // Receive recent scans
    this.scannerService.recentScansObservable().subscribe((scans) => {
      this.recentScans = scans.slice(0, 12);
    });

    // Receive user
    this.authenticationService.currentUserObservable().subscribe((user) => {
      if (user && !user.closed_scanner_instructions) {
        this.showAlert = true;
        this.alertInstructions = new Alert({
          message:
            'Tap your screen to scan for cards. For best results align one card at a time with all text visible.',
          classes: 'square',
          type: AlertType.info,
          icon: Icons.close,
          clickIcon: () => {
            this.alertInstructions;
            this.showAlert = false;

            // Save preference
            this.authenticationService.currentUserValue = new User({
              ...this.authenticationService.currentUserValue,
              closed_scanner_instructions: true,
            });
          },
        });
      }
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

  cameraWasSwitched(device_id: string): void {
    this.deviceId = device_id;
    this.authenticationService.currentUserValue = new User({
      ...this.authenticationService.currentUserValue,
      device_id,
    });
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
}
