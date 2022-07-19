import { Component } from '@angular/core';
import {
  Alert,
  AlertType,
  Button,
  Notification,
  NotificationsService,
} from '@app/controls';
import { Icons } from '@app/models';
import { AuthenticationService } from '@app/pages';

@Component({
  selector: 'unverified',
  templateUrl: './unverified.component.html',
  styleUrls: ['./unverified.component.scss'],
})
export class UnverifiedComponent {
  alertUnverified: Alert = new Alert({
    type: AlertType.warning,
    message:
      'Your account is not verified. Please check your email for a verification link.',
    button: new Button({
      text: 'Resend Link',
      icon: Icons.sync,
      click: () => {
        this.authenticationService.verify().subscribe(() => {
          this.notificationService.addNotifications([
            new Notification({
              alertType: AlertType.success,
              message: 'Verification link sent.',
            }),
          ]);
        });
      },
    }),
  });

  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotificationsService
  ) {}
}
