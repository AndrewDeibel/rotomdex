import { AlertType } from './../../../../controls/alert/alert';
import { buildUrl } from './../../../../models/api';
import { APIResponse } from '@app/models';
import { HttpClient } from '@angular/common/http';
import { Icons } from './../../../../models/icons';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Button, Notification, NotificationsService } from '@app/controls';
import { AuthenticationService } from '@app/pages/auth';

@Component({
  selector: 'edit-subscription',
  templateUrl: 'edit-subscription.component.html',
})
export class EditSubscriptionComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private notificationService: NotificationsService
  ) {}
  user_level: string;
  buttonManageSubscription: Button;

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue?.account_level)
      this.user_level =
        this.authenticationService.currentUserValue.account_level;

    this.buttonManageSubscription = new Button({
      text: 'Manage Subscription',
      icon: Icons.externalLink,
      click: () => {
        this.http
          .get<APIResponse>(buildUrl('subscriptions/billing-portal'))
          .subscribe((res) => {
            if (res?.data?.url) window.location = res.data.url;
          });
      },
    });

    this.authenticationService.getUserObservable().subscribe((user) => {
      if (user?.account_level) this.user_level = user.account_level;
      this.route.queryParams.subscribe((params) => {
        if (params['fromstripe'] === '1') {
          this.notificationService.addNotifications([
            new Notification({
              message: 'Subscription updated',
              alertType: AlertType.success,
            }),
          ]);
        }
      });
    });
    this.authenticationService.getUser();
  }
}
