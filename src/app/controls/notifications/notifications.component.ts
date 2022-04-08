import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Notification } from './notification';
import { NotificationsService } from './notifications.service';

@AutoUnsubscribe()
@Component({
  selector: 'notifications',
  templateUrl: 'notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationsService) {}

  ngOnInit() {
    this.notificationService
      .notificationsObservable()
      .subscribe((notifications) => {
        this.notifications = notifications;
      });
  }
  ngOnDestroy() {}

  removeNotification(id: number) {
    this.notifications = this.notifications.filter((notification) => {
      return notification.id != id;
    });
  }
}
