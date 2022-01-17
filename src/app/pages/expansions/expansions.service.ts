import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@app/../environments/environment';
import { APIResponse } from '@app/models';
import { Expansion, Series } from '@app/pages';
import { Cache } from '../../helpers/cache';

export interface GetExpansions {
  query: string;
  sort_by: string;
  sort_direction: string;
}

@Injectable({ providedIn: 'root' })
export class ExpansionsService {
  constructor(private http: HttpClient) {}

  // Get expansions
  private getExpansionsSubject = new BehaviorSubject<Series[] | null>(null);
  getExpansionsObservable() {
    this.getExpansionsSubject = new BehaviorSubject<Series[] | null>(null);
    return this.getExpansionsSubject.asObservable();
  }
  getExpansions(params: GetExpansions) {
    if (Cache.expansions) {
      this.getExpansionsSubject.next(
        this.handleExpansionsParams(params, Cache.expansions)
      );
    } else {
      this.http
        .get<APIResponse>(`${environment.api}expansions`)
        .subscribe((res) => {
          const series = res.data.map((_series: any) => new Series(_series));
          Cache.expansions = series;
          this.getExpansionsSubject.next(
            this.handleExpansionsParams(params, series)
          );
        });
    }
  }
  handleExpansionsParams(
    params: GetExpansions,
    seriesCollection: Series[]
  ): Series[] {
    // No data
    if (!seriesCollection.length) {
      return [];
    } else {
      let _seriesCollection: Series[] = [];

      // Query
      if (params.query && params.query.length) {
        // Filter expansions
        seriesCollection.forEach((series) => {
          const expansions = series.expansions.filter((expansion: any) => {
            return expansion.name
              .toLowerCase()
              .includes(params.query.toLowerCase());
          });
          if (expansions.length) {
            const _series = Object.assign({}, series);
            _series.expansions = expansions;
            _seriesCollection.push(_series);
          }
        });
      } else {
        _seriesCollection = seriesCollection;
      }

      // Sort
      function sortSeriesAsc(a: Series, b: Series) {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      }
      function sortSeriesDesc(a: Series, b: Series) {
        if (a.id > b.id) {
          return -1;
        }
        if (a.id < b.id) {
          return 1;
        }
        return 0;
      }
      function sortExpansionAsc(a: Expansion, b: Expansion) {
        if (new Date(a.release_date) < new Date(b.release_date)) {
          return -1;
        }
        if (new Date(a.release_date) > new Date(b.release_date)) {
          return 1;
        }
        return 0;
      }
      function sortExpansionDesc(a: Expansion, b: Expansion) {
        if (new Date(a.release_date) > new Date(b.release_date)) {
          return -1;
        }
        if (new Date(a.release_date) < new Date(b.release_date)) {
          return 1;
        }
        return 0;
      }
      switch (params.sort_direction) {
        case 'asc':
          _seriesCollection.sort(sortSeriesAsc);
          _seriesCollection.forEach((_series) => {
            _series.expansions.sort(sortExpansionAsc);
          });
          break;
        case 'desc':
          _seriesCollection.sort(sortSeriesDesc);
          _seriesCollection.forEach((_series) => {
            _series.expansions.sort(sortExpansionDesc);
          });
          break;
      }

      return _seriesCollection;
    }
  }
}
