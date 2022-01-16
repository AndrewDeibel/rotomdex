import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  query: Subject<string> = new Subject<string>();

  constructor() {}

  public getSearchObservable(): Observable<string> {
    return this.query.asObservable();
  }

  public setSearch(query: string) {
    this.query.next(query);
  }
}
