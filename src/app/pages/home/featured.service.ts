import { APIResponse } from '../../models/api';
import { Featured } from './featured';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    this.http
      .get<APIResponse>(`${environment.api}featured`)
      .subscribe((res) => {
        if (res) {
          let featured: Featured = new Featured(res.data);
          this.getFeaturedSubject.next(featured);
        }
      });
  }
}
