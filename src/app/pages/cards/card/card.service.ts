import { LoaderService } from '@app/controls';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse, buildUrl } from '@app/models';
import { BehaviorSubject } from 'rxjs';
import { Card } from '@app/pages';
import { Cache } from '@app/helpers';

@Injectable({ providedIn: 'root' })
export class CardService {
  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  // Get card
  private getCardSubject = new BehaviorSubject<Card | null>(null);
  getCardObservable() {
    this.getCardSubject = new BehaviorSubject<Card | null>(null);
    return this.getCardSubject.asObservable();
  }
  getCard(code: string) {
    // Try cache
    if (Cache.card[code]) {
      this.getCardSubject.next(Cache.card[code]);
    } else {
      // Show loader
      this.loaderService.addItemLoading('getCard');
      // Request
      this.http.get<APIResponse>(buildUrl('card/' + code)).subscribe((res) => {
        const card = new Card(res.data);
        // Add to cache
        Cache.card[code] = card;
        this.getCardSubject.next(card);
        // Hide loader
        this.loaderService.clearItemLoading('getCard');
      });
    }
  }
}
