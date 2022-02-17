import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppSettings } from '@app/app';
import { Items } from '@app/layout';
import { APIGetPaged, Icons } from '@app/models';
import { Series, SetSortExpansions } from './expansion/expansion';
import { ExpansionsService } from './expansions.service';

@Component({
  selector: 'expansions',
  templateUrl: './expansions.component.html',
})
export class ExpansionsComponent implements OnInit {
  items: Items;

  constructor(
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

  responseGetExpansions(seriesList: Series[]) {
    if (seriesList) {
      this.items.itemGroups = seriesList.map((series) => ({
        items: series.expansions,
        name: series.name,
        progress: series.total_cards_owned,
        total_cards: series.total_cards,
      }));
    }
  }

  setupControls() {
    this.items = new Items();
    this.items.noResults = 'No expansions found';
    this.items.noResultsIcon = Icons.box;
    this.titleService.setTitle(AppSettings.titlePrefix + 'Expansions');
    this.items.showHeader = false;
    this.items.showFooter = false;
    this.items.itemClasses = 'width-3 medium-4 small-6';
    this.items.filter.textboxSearch.placeholder = 'Search Expansions...';
    this.items.footer.pageSize = 100;
    SetSortExpansions(this.items.filter);
  }

  getItems() {
    this.expansionsService.getExpansions(
      new APIGetPaged({
        query: this.items.filter.textboxSearch.value,
        sort_by: this.items.filter.selectSortBy.value,
        sort_direction: this.items.filter.selectSortDirection.value,
      })
    );
  }
}
