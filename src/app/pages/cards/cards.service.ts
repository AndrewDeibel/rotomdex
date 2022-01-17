import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { APIGetPaged, APIResponse } from '@app/models';
import { Card } from '@app/pages';

export interface ResCards {
  total_value?: number;
  total_results: number;
  total_pages: number;
  cards?: Card[];
}

@Injectable({ providedIn: 'root' })
export class CardsService {
  constructor(private http: HttpClient) {}

  // Get cards
  private getCardsSubject = new BehaviorSubject<ResCards | null>(null);
  getCardsObservable() {
    this.getCardsSubject = new BehaviorSubject<ResCards | null>(null);
    return this.getCardsSubject.asObservable();
  }
  getCards(params: APIGetPaged) {
    var url = params.buildUrl('cards');
    this.http.get<APIResponse>(url).subscribe((res) => {
      this.getCardsSubject.next({
        cards: res.data.map((card: any) => new Card(card)),
        total_pages: res.meta.last_page,
        total_results: res.meta.total,
      });
    });
  }

  // Get cards filtered
  private getCardsFilteredSubject = new BehaviorSubject<ResCards | null>(null);
  getCardsFilteredObservable() {
    this.getCardsFilteredSubject = new BehaviorSubject<ResCards | null>(null);
    return this.getCardsFilteredSubject.asObservable();
  }
  getCardsFiltered(params: APIGetPaged) {
    var url = params.buildUrl('cards/filter');
    this.http.get<APIResponse>(url).subscribe((res) => {
      this.getCardsFilteredSubject.next({
        cards: res.data.map((card: any) => new Card(card)),
        total_pages: res.meta.last_page,
        total_results: res.meta.total,
      });
    });
  }
}
