import { Injectable } from '@angular/core';
import { Notification } from './notification';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor() {}

  // Notifications
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notificationsObservable() {
    this.notificationsSubject = new BehaviorSubject<Notification[]>([]);
    return this.notificationsSubject.asObservable();
  }
  addNotifications(notifications: Notification[]) {
    this.notificationsSubject.next([
      // Current value
      ...this.notificationsSubject.value,
      // + new value
      ...notifications,
    ]);
  }
}
