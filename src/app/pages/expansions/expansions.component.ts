import { Component, OnInit } from '@angular/core';
import { Items } from '@app/layout';
import { ExpansionsService } from './expansions.service';
import { Title } from '@angular/platform-browser';
import { LoaderService } from '@app/controls';
import { AppSettings } from '@app/app';
import { Series, SetSortByExpansions } from './expansion/expansion';
import { APIGetPaged, Icons } from '@app/models';

@Component({
  selector: 'expansions',
  templateUrl: './expansions.component.html',
})
export class ExpansionsComponent implements OnInit {
  items: Items = new Items();

  constructor(
    private loaderService: LoaderService,
    private titleService: Title,
    private expansionsService: ExpansionsService
  ) {}

  ngOnInit() {
    this.setupControls();
    this.setupSubscriptions();
  }

  setupSubscriptions() {
    this.expansionsService.getExpansionsObservable().subscribe((series) => {
      if (series) this.responseGetExpansions(series);
    });
  }

  responseGetExpansions(series: Series[]) {
    if (series) {
      this.loaderService.clearItemLoading('getExpansions');
      this.items.itemGroups = [];
      series.forEach((_series) => {
        this.items.itemGroups.push({
          items: _series.expansions,
          name: _series.name,
          progress: 24,
        });
      });
    }
  }

  setupControls() {
    this.items.noResults = 'No expansions found';
    this.items.noResultsIcon = Icons.box;
    this.titleService.setTitle(AppSettings.titlePrefix + 'Expansions');
    this.items.showHeader = false;
    this.items.showFooter = false;
    this.items.itemClasses = 'width-3 medium-4 small-6';
    this.items.filter.textboxSearch.placeholder = 'Search Expansions...';
    this.items.filter.selectSortDirection.value = 'desc';
    this.items.footer.pageSize = 100;
    SetSortByExpansions(this.items.filter);
  }

  getItems() {
    this.loaderService.addItemLoading('getExpansions');
    this.expansionsService.getExpansions(
      new APIGetPaged({
        query: this.items.filter.textboxSearch.value,
        sort_by: this.items.filter.selectSortBy.value,
        sort_direction: this.items.filter.selectSortDirection.value,
      })
    );
  }
}
