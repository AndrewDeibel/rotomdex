import { AuthenticationService } from './../auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  AlertType,
  Button,
  Notification,
  NotificationsService,
} from '@app/controls';
import { User } from '@app/models';

@Component({
  selector: 'verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  buttonResend: Button;
  token: string;
  showResend: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    // Get token
    this.activatedRoute.params.subscribe((params) => {
      this.token = params['token'];
      // Resend email mode
      if (!this.token) {
        this.showResend = true;
        this.buttonResend = new Button({
          text: 'Resend Verification Email',
          click: () => {
            this.authenticationService.verify().subscribe((res) => {
              if (res?.success) {
                this.notificationService.addNotifications([
                  new Notification({
                    message: 'Verification email sent',
                    alertType: AlertType.success,
                  }),
                ]);
              }
            });
          },
        });
      }
      //
      else {
        this.authenticationService.verify(this.token).subscribe((res) => {
          if (res?.success) {
            this.authenticationService.currentUserValue = new User(res.data);
            this.notificationService.addNotifications([
              new Notification({
                message: 'Successfully verified',
                alertType: AlertType.success,
              }),
            ]);
          }
        });
      }
    });
  }
}
