import { Card } from './../../cards/card/card';
import { ResCards } from './../../cards/cards.service';
import { APIGetPaged, APIResponse, buildUrl } from './../../../models/api';
import { LoaderService } from './../../../controls/loader/loader.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  // Get wishlist cards
  private getWishlistCardsSubject = new BehaviorSubject<ResCards | null>(null);
  getWishlistCardsObservable() {
    this.getWishlistCardsSubject = new BehaviorSubject<ResCards | null>(null);
    return this.getWishlistCardsSubject.asObservable();
  }
  getWishlistCards(params: APIGetPaged) {
    this.loaderService.addItemLoading('getWishlistCards');
    this.http.get<APIResponse>(params.buildUrl('wishlist')).subscribe((res) => {
      this.getWishlistCardsSubject.next({
        cards: res.data.map((userCard: any) => new Card(userCard.card)),
        total_pages: res.data.last_page,
        total_results: res.data.total,
      });
      this.loaderService.clearItemLoading('getWishlistCards');
    });
  }

  // Add wishlist card
  private addWishlistCardSubject = new BehaviorSubject<boolean | null>(null);
  addWishlistCardObservable() {
    this.addWishlistCardSubject = new BehaviorSubject<boolean | null>(null);
    return this.addWishlistCardSubject.asObservable();
  }
  addWishlistCard(card_id: number) {
    this.loaderService.addItemLoading('addWishlistCard');
    this.http
      .post<APIResponse>(buildUrl('wishlist/add-card'), {
        card_id,
      })
      .subscribe((res) => {
        if (res.success) this.addWishlistCardSubject.next(true);
        this.loaderService.clearItemLoading('addWishlistCard');
      });
  }

  // Remove wishlist card
  private removeWishlistCardSubject = new BehaviorSubject<boolean | null>(null);
  removeWishlistCardObservable() {
    this.removeWishlistCardSubject = new BehaviorSubject<boolean | null>(null);
    return this.removeWishlistCardSubject.asObservable();
  }
  removeWishlistCard(card_id: number) {
    this.loaderService.addItemLoading('removeWishlistCard');
    this.http
      .post<APIResponse>(buildUrl('wishlist/remove-card'), {
        card_id,
      })
      .subscribe((res) => {
        if (res.success) this.removeWishlistCardSubject.next(true);
        this.loaderService.clearItemLoading('removeWishlistCard');
      });
  }
}
