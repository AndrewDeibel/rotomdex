import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from '@app/app';
import '@app/helpers/string.extensions';
import { ItemGroup, Items } from '@app/layout/main';
import { APIGetPaged, Symbols } from '@app/models';
import { SetSortByGlobal } from '@app/pages/cards/';
import { CardsService, ResCards } from './cards.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  items: Items = new Items();
  type: string;
  artist: string;
  supertype: string;
  subtype: string;
  rarity: string;
  shiny: boolean;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private cardsService: CardsService
  ) {}

  ngOnInit() {
    this.setupControls();

    // Handle clicking back from page 2 w/ query params
    // this.router.events.subscribe((event: any) => {
    //   if (event instanceof NavigationEnd) {
    //     if (window.location.toString().endsWith('/cards')) {
    //       this.getCards();
    //     }
    //   }
    // });
  }
  ngOnDestroy() {}

  outputGetCards() {
    this.route.params.subscribe((params) => {
      this.type = params['type']?.replace('-', ' ');
      this.artist = params['artist']?.replace('-', ' ');
      this.supertype = params['supertype']?.replace('-', ' ');
      this.subtype = params['subtype']?.replace('-', ' ');
      this.rarity = params['rarity']?.replace('-', ' ');
      const filters = params['filter'];
      this.shiny = filters === 'shiny';
      if (
        this.type ||
        this.artist ||
        this.supertype ||
        this.subtype ||
        this.rarity ||
        this.shiny
      ) {
        this.getFilteredCards();
      } else {
        this.getCards();
      }
    });
    this.cardsService.getCardsObservable().subscribe((res) => {
      this.getCardsResponse(res);
    });
    this.cardsService.getCardsFilteredObservable().subscribe((res) => {
      this.getCardsResponse(res);
    });
  }

  getCardsResponse(res: ResCards | null) {
    if (res) {
      this.items.footer.totalPages = res.total_pages;
      this.items.footer.totalItems = res.total_results;
      if (res.cards && res.cards.length) {
        this.items.itemGroups = [
          new ItemGroup({
            items: res.cards,
          }),
        ];
      } else {
        this.items.itemGroups = [];
      }
    }
  }

  setupControls() {
    this.items.noResults = 'No cards found';
    this.items.noResultsImage = Symbols.cards;
    this.titleService.setTitle(AppSettings.titlePrefix + 'All Cards');
    this.items.showHeader = false;
    this.items.filter.textboxSearch.placeholder = 'Search Cards...';
    this.items.filter.selectSortDirection.value = 'asc';
    SetSortByGlobal(this.items.filter);
  }

  getCards() {
    this.items.showHeader = false;
    this.cardsService.getCards(
      new APIGetPaged({
        page: this.items.footer.page,
        page_size: this.items.footer.pageSize,
        query: this.items.filter.textboxSearch.value,
        sort_by: this.items.filter.selectSortBy.value,
        sort_direction: this.items.filter.selectSortDirection.value,
      })
    );
  }

  getFilteredCards() {
    this.cardsService.getCardsFiltered(
      new APIGetPaged({
        page: this.items.footer.page,
        page_size: this.items.footer.pageSize,
        query: this.items.filter.textboxSearch.value,
        sort_by: this.items.filter.selectSortBy.value,
        sort_direction: this.items.filter.selectSortDirection.value,
        type: this.type,
        rarity: this.rarity,
        artist: this.artist,
        subtype: this.subtype,
        supertype: this.supertype,
        shiny: this.shiny,
      })
    );
  }
}
