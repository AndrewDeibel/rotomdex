import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIGetPaged, APIResponse } from '@app/models';
import { Card, Expansion } from '@app/pages';
import { BehaviorSubject } from 'rxjs';
import { CacheGlobal } from '../../../services/cache/globalCache';
import { CardResults } from '../../cards/cards.service';

export class GetExpansion extends APIGetPaged {
  code: string;
  constructor(init?: Partial<GetExpansion>) {
    super();
    Object.assign(this, init);
  }
}

export class GetExpansionCards extends APIGetPaged {
  code: string;
  constructor(init?: Partial<GetExpansion>) {
    super();
    Object.assign(this, init);
  }
}

@Injectable({
  providedIn: 'root',
})
export class ExpansionService {
  constructor(private http: HttpClient) {}

  // Get expansion
  private getExpansionSubject = new BehaviorSubject<Expansion | null>(null);
  getExpansionObservable() {
    this.getExpansionSubject = new BehaviorSubject<Expansion | null>(null);
    return this.getExpansionSubject.asObservable();
  }
  getExpansion(params: GetExpansion) {
    if (CacheGlobal.expansion[params.code]) {
      this.getExpansionSubject.next(CacheGlobal.expansion[params.code]);
    } else {
      var url = params.buildUrl('expansion/' + params.code);
      this.http.get<APIResponse>(url).subscribe((res) => {
        var expansion = new Expansion(res.data);
        this.getExpansionSubject.next(expansion);
      });
    }
  }

  // Expansions cards
  private getExpansionCardsSubject = new BehaviorSubject<CardResults | null>(
    null
  );
  getExpansionCardsObservable() {
    this.getExpansionCardsSubject = new BehaviorSubject<CardResults | null>(
      null
    );
    return this.getExpansionCardsSubject.asObservable();
  }
  getExpansionCards(params: GetExpansionCards) {
    var url = params.buildUrl('expansion/' + params.code + '/cards');
    this.http.get<APIResponse>(url).subscribe((res) => {
      this.getExpansionCardsSubject.next({
        cards: res.data.map((card: any) => new Card(card)),
        total_pages: res.meta.last_page,
        total_results: res.meta.total,
      });
    });
  }
}
