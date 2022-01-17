import { APIResponse, buildUrl } from '../../models/api';
import { CardResults, GetCards } from '../../pages/cards/cards.service';
import { BehaviorSubject } from 'rxjs';
import { Card } from '../../pages/cards/card/card';
import { UserCard } from './user-card';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  constructor(private http: HttpClient) {}

  // Get user cards
  private getUserCardsSubject = new BehaviorSubject<CardResults | null>(null);
  getUserCardsObservable() {
    this.getUserCardsSubject = new BehaviorSubject<CardResults | null>(null);
    return this.getUserCardsSubject.asObservable();
  }
  getUserCards(params: GetCards) {
    var url = params.buildUrl('user-cards');
    this.http.get<APIResponse>(url).subscribe((res) => {
      this.getUserCardsSubject.next({
        cards: res.data.map((card: any) => {
          new Card(card);
        }),
        total_pages: res.meta.last_page,
        total_results: res.meta.total,
      });
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
    var url = buildUrl('user-cards/' + slug);
    this.http.get<APIResponse>(url).subscribe((res) => {
      this.getCardUserCardsSubject.next(
        res.data.map((userCard: any) => new UserCard(userCard))
      );
    });
  }

  // Add user card
  private addUserCardSubject = new BehaviorSubject<UserCard | null>(null);
  addUserCardObservable() {
    this.addUserCardSubject = new BehaviorSubject<UserCard | null>(null);
    return this.addUserCardSubject.asObservable();
  }
  addUserCard(userCard: UserCard) {
    this.http
      .post<APIResponse>(buildUrl('user-cards/create'), {
        ...userCard,
      })
      .subscribe((res) => {
        if (res.success) this.addUserCardSubject.next(userCard);
      });
  }

  // Remove user card
  removeUserCard(user_card_id: number) {
    return this.http.post<APIResponse>(buildUrl('user-cards/delete'), {
      user_card_id,
    });
  }

  // Update user card
  updateUserCard(userCard: UserCard) {
    return this.http.post<APIResponse>(buildUrl('user-cards/update'), userCard);
  }
}
