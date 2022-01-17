import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notification, NotificationsService } from '@app/controls';
import { APIGetPaged, APIResponse, buildUrl } from '@app/models';
import { BehaviorSubject } from 'rxjs';
import { UserCardGroup } from './../../cards/card/card';

export interface ResUserCardGroups {
  total_results: number;
  total_pages: number;
  user_card_groups: UserCardGroup[];
}

@Injectable({ providedIn: 'root' })
export class UserCardGroupService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService
  ) {}

  // Get user card groups
  private getUserCardGroupsSubject =
    new BehaviorSubject<ResUserCardGroups | null>(null);
  getUserCardGroupsObservable() {
    this.getUserCardGroupsSubject =
      new BehaviorSubject<ResUserCardGroups | null>(null);
    return this.getUserCardGroupsSubject.asObservable();
  }
  getUserCardGroups(params: APIGetPaged) {
    this.http
      .get<APIResponse>(params.buildUrl('card-groups'))
      .subscribe((res) => {
        this.getUserCardGroupsSubject.next({
          user_card_groups: res.data.map(
            (userCardGroup: any) => new UserCardGroup(userCardGroup)
          ),
          total_pages: res.meta.last_page,
          total_results: res.meta.total,
        });
      });
  }

  // Add user card groups
  private addUserCardGroupSubject = new BehaviorSubject<UserCardGroup | null>(
    null
  );
  addUserCardGroupObservable() {
    this.addUserCardGroupSubject = new BehaviorSubject<UserCardGroup | null>(
      null
    );
    return this.addUserCardGroupSubject.asObservable();
  }
  addUserCardGroup(userCardGroup: UserCardGroup) {
    this.http
      .post<APIResponse>(buildUrl('card-groups/create'), userCardGroup)
      .subscribe((res) => {
        if (res.success) {
          this.addUserCardGroupSubject.next(userCardGroup);
          this.notificationService.addNotifications([
            new Notification({
              message: `Added ${userCardGroup.name}`,
            }),
          ]);
        }
      });
  }
}
