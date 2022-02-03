import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AlertType,
  LoaderService,
  Notification,
  NotificationsService,
} from '@app/controls';
import { APIGetPaged, APIResponse, buildUrl } from '@app/models';
import { UserCardGroup } from '@app/pages/collection';
import { BehaviorSubject } from 'rxjs';

export interface ResUserCardGroups {
  total_results: number;
  total_pages: number;
  user_card_groups: UserCardGroup[];
}

@Injectable({ providedIn: 'root' })
export class UserCardGroupService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService,
    private loaderService: LoaderService
  ) {}

  // Get user card groups
  private getUserCardGroupsSubject =
    new BehaviorSubject<ResUserCardGroups | null>(null);
  getUserCardGroupsObservable() {
    return this.getUserCardGroupsSubject.asObservable();
  }
  getUserCardGroups(params: APIGetPaged) {
    this.loaderService.addItemLoading('getUserCardGroups');
    this.http
      .get<APIResponse>(params.buildUrl('card-groups'))
      .subscribe((res) => {
        this.loaderService.clearItemLoading('getUserCardGroups');
        this.getUserCardGroupsSubject.next({
          user_card_groups: res.data.map(
            (userCardGroup: any) => new UserCardGroup(userCardGroup)
          ),
          total_pages: res.meta.last_page,
          total_results: res.meta.total,
        });
      });
  }

  // Get user card group
  private getUserCardGroupSubject = new BehaviorSubject<UserCardGroup | null>(
    null
  );
  getUserCardGroupObservable() {
    return this.getUserCardGroupSubject.asObservable();
  }
  getUserCardGroup(card_group_id: number) {
    this.loaderService.addItemLoading('getUserCardGroup');
    this.http
      .get<APIResponse>(buildUrl(`card-groups/${card_group_id}`))
      .subscribe((res) => {
        this.loaderService.clearItemLoading('getUserCardGroup');
        this.getUserCardGroupSubject.next(new UserCardGroup(res.data));
      });
  }

  // Add user card group
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
    this.loaderService.addItemLoading('addUserCardGroup');
    this.http
      .post<APIResponse>(buildUrl('card-groups/create'), userCardGroup)
      .subscribe((res) => {
        this.loaderService.clearItemLoading('addUserCardGroup');
        if (res.success) {
          this.addUserCardGroupSubject.next(new UserCardGroup(res.data));
          this.notificationService.addNotifications([
            new Notification({
              message: `Added ${userCardGroup.name}`,
              alertType: AlertType.success,
            }),
          ]);
        }
      });
  }

  // Remove user card group
  private removeUserCardGroupSubject = new BehaviorSubject<number | null>(null);
  removeUserCardGroupObservable() {
    this.removeUserCardGroupSubject = new BehaviorSubject<number | null>(null);
    return this.removeUserCardGroupSubject.asObservable();
  }
  removeUserCardGroup(cardGroup: UserCardGroup) {
    this.loaderService.addItemLoading('removeUserCardGroup');
    this.http
      .post<APIResponse>(buildUrl('card-groups/delete'), {
        card_group_id: cardGroup.id,
      })
      .subscribe((res) => {
        this.loaderService.clearItemLoading('removeUserCardGroup');
        if (res.success) {
          this.removeUserCardGroupSubject.next(cardGroup.id);
          this.notificationService.addNotifications([
            new Notification({
              message: `Removed ${cardGroup.name}`,
              alertType: AlertType.success,
            }),
          ]);
        }
      });
  }

  // Update user card group
  private updateUserCardGroupSubject =
    new BehaviorSubject<UserCardGroup | null>(null);
  updateUserCardGroupObservable() {
    this.updateUserCardGroupSubject = new BehaviorSubject<UserCardGroup | null>(
      null
    );
    return this.updateUserCardGroupSubject.asObservable();
  }
  updateUserCardGroup(cardGroup: UserCardGroup) {
    this.loaderService.addItemLoading('updateUserCardGroup');
    this.http
      .post<APIResponse>(buildUrl('card-groups/update'), cardGroup)
      .subscribe((res) => {
        this.loaderService.clearItemLoading('updateUserCardGroup');
        if (res.success) {
          this.updateUserCardGroupSubject.next(new UserCardGroup(res.data));
          this.notificationService.addNotifications([
            new Notification({
              message: `Update ${cardGroup.name}`,
              alertType: AlertType.success,
            }),
          ]);
        }
      });
  }
}
