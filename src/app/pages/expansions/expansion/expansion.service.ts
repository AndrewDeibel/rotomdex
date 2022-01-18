import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIGetPaged, APIResponse } from '@app/models';
import { Card, Expansion, ResCards } from '@app/pages';
import { BehaviorSubject } from 'rxjs';
import { Cache } from '@app/helpers';
import { LoaderService } from '@app/controls';

@Injectable({
  providedIn: 'root',
})
export class ExpansionService {
  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  // Get expansion
  private getExpansionSubject = new BehaviorSubject<Expansion | null>(null);
  getExpansionObservable() {
    this.getExpansionSubject = new BehaviorSubject<Expansion | null>(null);
    return this.getExpansionSubject.asObservable();
  }
  getExpansion(params: APIGetPaged) {
    if (Cache.expansion[params.code]) {
      this.getExpansionSubject.next(Cache.expansion[params.code]);
    } else {
      this.loaderService.addItemLoading('getExpansion');
      this.http
        .get<APIResponse>(params.buildUrl('expansion/' + params.code))
        .subscribe((res) => {
          this.getExpansionSubject.next(new Expansion(res.data));
          this.loaderService.clearItemLoading('getExpansion');
        });
    }
  }

  // Get expansions cards
  private getExpansionCardsSubject = new BehaviorSubject<ResCards | null>(null);
  getExpansionCardsObservable() {
    this.getExpansionCardsSubject = new BehaviorSubject<ResCards | null>(null);
    return this.getExpansionCardsSubject.asObservable();
  }
  getExpansionCards(params: APIGetPaged) {
    this.loaderService.addItemLoading('getExpansionCards');
    this.http
      .get<APIResponse>(params.buildUrl('expansion/' + params.code + '/cards'))
      .subscribe((res) => {
        this.getExpansionCardsSubject.next({
          cards: res.data.map((card: any) => new Card(card)),
          total_pages: res.meta.last_page,
          total_results: res.meta.total,
        });
        this.loaderService.clearItemLoading('getExpansionCards');
      });
  }
}
