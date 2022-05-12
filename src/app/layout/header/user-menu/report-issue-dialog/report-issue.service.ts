import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AlertType,
  LoaderService,
  Notification,
  NotificationsService,
} from '@app/controls';
import { APIResponse, buildUrl } from '@app/models';
import { Issue } from './issue';

@Injectable({
  providedIn: 'root',
})
export class ReportIssueService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService,
    private loaderService: LoaderService
  ) {}

  reportIssue(issue: Issue, onSuccess: any) {
    this.loaderService.addItemLoading('report-issue');
    this.http
      .post<APIResponse>(buildUrl('report'), { ...issue })
      .subscribe((res) => {
        this.loaderService.clearItemLoading('report-issue');
        if (res.success) {
          this.notificationService.addNotifications([
            new Notification({
              message: 'Issue reported',
              alertType: AlertType.success,
            }),
          ]);
          onSuccess();
        }
      });
  }
}
