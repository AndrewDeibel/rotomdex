import { UserCardGroup } from './../../cards/card/card';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APIGetPaged, APIResponse } from '@app/models';

export interface ResUserCardGroups {
  total_results: number;
  total_pages: number;
  user_card_groups: UserCardGroup[];
}

@Injectable({ providedIn: 'root' })
export class UserCardGroupService {
  constructor(private http: HttpClient) {}

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
}
