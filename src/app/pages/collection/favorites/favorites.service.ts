import { Card } from './../../cards/card/card';
import { ResCards } from './../../cards/cards.service';
import { APIGetPaged, APIResponse, buildUrl } from './../../../models/api';
import { LoaderService } from './../../../controls/loader/loader.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertType, Notification, NotificationsService } from '@app/controls';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    private notificationService: NotificationsService
  ) {}

  // Get favorite cards
  private getFavoriteCardsSubject = new BehaviorSubject<ResCards | null>(null);
  getFavoriteCardsObservable() {
    this.getFavoriteCardsSubject = new BehaviorSubject<ResCards | null>(null);
    return this.getFavoriteCardsSubject.asObservable();
  }
  getFavoriteCards(params: APIGetPaged) {
    this.loaderService.addItemLoading('getFavoriteCards');
    this.http
      .get<APIResponse>(params.buildUrl('favorites'))
      .subscribe((res) => {
        this.getFavoriteCardsSubject.next({
          cards: res.data.map((userCard: any) => new Card(userCard.card)),
          total_pages: res.meta.last_page,
          total_results: res.meta.total,
        });
        this.loaderService.clearItemLoading('getFavoriteCards');
      });
  }

  // Add favorite card
  private addFavoriteCardSubject = new BehaviorSubject<boolean | null>(null);
  addFavoriteCardObservable() {
    this.addFavoriteCardSubject = new BehaviorSubject<boolean | null>(null);
    return this.addFavoriteCardSubject.asObservable();
  }
  addFavoriteCard(card_id: number) {
    this.loaderService.addItemLoading('addFavoriteCard');
    this.http
      .post<APIResponse>(buildUrl('favorites/add-card'), {
        card_id,
      })
      .subscribe((res) => {
        if (res.success) {
          this.addFavoriteCardSubject.next(true);
          this.notificationService.addNotifications([
            new Notification({
              message: 'Added to favorites',
              alertType: AlertType.success,
            }),
          ]);
        }
        this.loaderService.clearItemLoading('addFavoriteCard');
      });
  }

  // Remove favorite card
  private removeFavoriteCardSubject = new BehaviorSubject<boolean | null>(null);
  removeFavoriteCardObservable() {
    this.removeFavoriteCardSubject = new BehaviorSubject<boolean | null>(null);
    return this.removeFavoriteCardSubject.asObservable();
  }
  removeFavoriteCard(card_id: number) {
    this.loaderService.addItemLoading('removeFavoriteCard');
    this.http
      .post<APIResponse>(buildUrl('favorites/remove-card'), {
        card_id,
      })
      .subscribe((res) => {
        if (res.success) {
          this.removeFavoriteCardSubject.next(true);
          this.notificationService.addNotifications([
            new Notification({
              message: 'Removed from favorite',
              alertType: AlertType.success,
            }),
          ]);
        }
        this.loaderService.clearItemLoading('removeFavoriteCard');
      });
  }
}
