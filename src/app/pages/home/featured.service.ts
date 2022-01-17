import { APIResponse, buildUrl } from '@app/models';
import { Featured } from './featured';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FeaturedService {
  constructor(private http: HttpClient) {}

  // Get featured
  private getFeaturedSubject = new BehaviorSubject<Featured | null>(null);
  getFeaturedObservable() {
    this.getFeaturedSubject = new BehaviorSubject<Featured | null>(null);
    return this.getFeaturedSubject.asObservable();
  }
  getFeatured() {
    this.http.get<APIResponse>(buildUrl('featured')).subscribe((res) => {
      if (res) {
        let featured: Featured = new Featured(res.data);
        this.getFeaturedSubject.next(featured);
      }
    });
  }
}
