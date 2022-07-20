import { AuthenticationService } from './../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  AlertType,
  Button,
  Notification,
  NotificationsService,
} from '@app/controls';
import { User } from '@app/models';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  buttonResend: Button;
  token: string;
  showResend: boolean;
  showSignIn: boolean;
  buttonSignIn: Button = new Button({
    text: 'Sign In',
    route: '/signin',
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationsService,
    private router: Router
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
        const subscription = this.authenticationService
          .currentUserObservable()
          .subscribe((user) => {
            if (user) {
              this.showSignIn = false;
              this.authenticationService.verify(this.token).subscribe((res) => {
                if (res?.success) {
                  subscription.unsubscribe();
                  this.authenticationService.currentUserValue = new User(
                    res.data
                  );
                  this.notificationService.addNotifications([
                    new Notification({
                      message: 'Successfully verified',
                      alertType: AlertType.success,
                    }),
                  ]);
                  this.router.navigateByUrl('/');
                }
              });
            } else {
              this.showSignIn = true;
            }
          });
      }
    });
  }
  ngOnDestroy() {}
}
