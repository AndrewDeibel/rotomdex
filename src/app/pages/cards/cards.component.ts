import { Component, OnInit } from '@angular/core';
import {
  CardsService,
  CardResults,
  GetCards as GetCards,
  GetCardsFiltered,
} from './cards.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LoaderService } from '@app/controls';
import { ItemGroup, Items } from '@app/layout/main';
import { SetSortByCards } from './card/card';
import { AppSettings } from '@app/app';
import '@app/helpers/string.extensions';
import { Symbols } from '@app/models';

@Component({
  selector: 'mb-cards',
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

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private cardsService: CardsService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.setupSubscriptions();
    this.setupControls();
  }

  setupSubscriptions() {
    this.route.params.subscribe((params) => {
      this.type = params['type']?.replace('-', ' ');
      this.artist = params['artist']?.replace('-', ' ');
      this.supertype = params['supertype']?.replace('-', ' ');
      this.subtype = params['subtype']?.replace('-', ' ');
      this.rarity = params['rarity']?.replace('-', ' ');
      if (
        this.type ||
        this.artist ||
        this.supertype ||
        this.subtype ||
        this.rarity
      ) {
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

  getCardsResponse(res: CardResults | null) {
    if (res) {
      this.loaderService.clearItemLoading('getCards');
      this.loaderService.clearItemLoading('getFilteredCards');
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
    this.items;
    this.items.noResults = 'No cards found';
    this.items.noResultsImage = Symbols.cards;
    this.titleService.setTitle(AppSettings.titlePrefix + 'All Cards');
    this.items.showHeader = false;
    this.items.filter.textboxSearch.placeholder = 'Search Cards...';
    this.items.filter.selectSortDirection.value = 'asc';
    SetSortByCards(this.items.filter);
  }

  _getCards() {
    if (
      this.type ||
      this.artist ||
      this.supertype ||
      this.subtype ||
      this.rarity
    ) {
      this.getFilteredCards();
    } else {
      this.getCards();
    }
  }

  getCards() {
    this.loaderService.addItemLoading('getCards');
    this.items.showHeader = false;
    this.cardsService.getCards(
      new GetCards({
        page: this.items.footer.page,
        page_size: this.items.footer.pageSize,
        query: this.items.filter.textboxSearch.value,
        sort_by: this.items.filter.selectSortBy.value,
        sort_direction: this.items.filter.selectSortDirection.value,
      })
    );
  }

  getFilteredCards() {
    this.loaderService.addItemLoading('getFilteredCards');
    this.cardsService.getCardsFiltered(
      new GetCardsFiltered({
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
      })
    );
  }
}
