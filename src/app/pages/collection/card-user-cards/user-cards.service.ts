import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from '@app/controls';
import { APIGetPaged, APIResponse, buildUrl } from '@app/models';
import { Card, ResCards, UserCard } from '@app/pages';
import { BehaviorSubject } from 'rxjs';

export class UpdateUserCard {
  user_card_id: number;
  condition: string;
  graded_by: string;
  printing: string;
  notes: string;
  constructor(init?: Partial<UpdateUserCard>) {
    Object.assign(this, init);
  }
}

export class AddUserCard {
  card_id: number;
  card_group_id?: number;
  condition: string;
  graded_by: string;
  printing: string;
  notes: string;
  date_obtained: Date;
  purchase_price: number;
  constructor(init?: Partial<AddUserCard>) {
    Object.assign(this, init);
  }
}

@Injectable({ providedIn: 'root' })
export class UserCardsService {
  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  // Get user cards
  private getUserCardsSubject = new BehaviorSubject<ResCards | null>(null);
  getUserCardsObservable() {
    this.getUserCardsSubject = new BehaviorSubject<ResCards | null>(null);
    return this.getUserCardsSubject.asObservable();
  }
  getUserCards(params: APIGetPaged) {
    this.loaderService.addItemLoading('getUserCards');
    this.http
      .get<APIResponse>(params.buildUrl('user-cards'))
      .subscribe((res) => {
        this.getUserCardsSubject.next({
          cards: res.data.map((userCard: any) => new Card(userCard.card)),
          total_pages: res.meta.last_page,
          total_results: res.meta.total,
        });
        this.loaderService.clearItemLoading('getUserCards');
      });
  }

  // Get card user cards
  private getCardUserCardsSubject = new BehaviorSubject<UserCard[] | null>(
    null
  );
  getCardUserCardsObservable() {
    this.getCardUserCardsSubject = new BehaviorSubject<UserCard[] | null>(null);
    return this.getCardUserCardsSubject.asObservable();
  }
  getCardUserCards(slug: string) {
    this.loaderService.addItemLoading('getUserCardsCard');
    this.http
      .get<APIResponse>(buildUrl('user-cards/' + slug))
      .subscribe((res) => {
        this.getCardUserCardsSubject.next(
          res.data.map((userCard: any) => new UserCard(userCard))
        );
        this.loaderService.clearItemLoading('getUserCardsCard');
      });
  }

  // Add user card
  private addUserCardSubject = new BehaviorSubject<UserCard | null>(null);
  addUserCardObservable() {
    this.addUserCardSubject = new BehaviorSubject<UserCard | null>(null);
    return this.addUserCardSubject.asObservable();
  }
  addUserCard(userCard: UserCard) {
    this.loaderService.addItemLoading('addUserCard');
    this.http
      .post<APIResponse>(buildUrl('user-cards/create'), userCard)
      .subscribe((res) => {
        if (res.success) this.addUserCardSubject.next(userCard);
        this.loaderService.clearItemLoading('addUserCard');
      });
  }

  // Remove user card
  // TODO: make this observable and add success message here in service
  removeUserCard(user_card_id: number) {
    return this.http.post<APIResponse>(buildUrl('user-cards/delete'), {
      user_card_id,
    });
  }

  // Update user card
  // TODO: make this observable and add success message here in service
  updateUserCard(userCard: UserCard) {
    return this.http.post<APIResponse>(buildUrl('user-cards/update'), userCard);
  }
}
