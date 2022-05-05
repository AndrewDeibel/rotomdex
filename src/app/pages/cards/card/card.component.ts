import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from '@app/app';
import '@app/helpers/string.extensions';
import { ItemGroup, Items } from '@app/layout/main';
import { APIGetPaged } from '@app/models';
import { Symbols } from '@app/models/icons';
import { AuthenticationService } from '@app/pages/auth/auth.service';
import { UserCard, UserCardsService } from '@app/pages/collection';
import { ExpansionService } from '@app/pages/expansions/expansion/expansion.service';
import { PokemonService } from '@app/pages/pokemons';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { CardsService, SetSortByGlobal } from '..';
import { Card } from './card';
import { CardService } from './card.service';

@AutoUnsubscribe()
@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() card: Card | null;
  userCards: UserCard[] = [];
  relatedCards: Items = new Items();
  expansionCards: Items = new Items();
  gfx: boolean;

  constructor(
    private titleService: Title,
    private cardService: CardService,
    private cardsService: CardsService,
    private route: ActivatedRoute,
    private expansionService: ExpansionService,
    private pokemonService: PokemonService,
    private userCardsService: UserCardsService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.setupControls();
    this.setupSubscriptions();
    this.handleRoute();
  }
  ngOnDestroy() {}

  resetControls() {
    this.card = null;
  }

  setupControls() {
    // Related cards
    this.relatedCards.footer.pageSize = 12;
    this.relatedCards.noResultsImage = Symbols.cards;
    this.relatedCards.noResults = 'No related cards found';
    this.relatedCards.itemClasses = 'width-2 medium-3 small-6';
    this.relatedCards.showFilters = false;
    this.relatedCards.showFooter = false;
    this.relatedCards.initialLoad = false;
    SetSortByGlobal(this.relatedCards.filter);

    // Expansion cards
    this.expansionCards.footer.pageSize = 12;
    this.expansionCards.noResultsImage = Symbols.cards;
    this.expansionCards.itemClasses = 'width-2 medium-3 small-6';
    this.expansionCards.showFilters = false;
    this.expansionCards.showFooter = false;
    this.expansionCards.initialLoad = false;
  }

  setupSubscriptions() {
    // Response get card
    this.cardService.getCardObservable().subscribe((card) => {
      if (card) {
        this.titleService.setTitle(AppSettings.titlePrefix + card.name);
        this.resetControls();

        // Data
        this.card = card;

        // Related pokemon cards
        if (this.card.primary_pokemon_variants) {
          let pokemonVariant = this.card.primary_pokemon_variants[0];
          this.relatedCards.header.title = `${pokemonVariant.name} Cards`;
          this.relatedCards.header.titleRoute = pokemonVariant.route;
          this.relatedCards.noResults = `No ${pokemonVariant.name} cards found`;
        }
        // Related sub type cards
        else if (this.card.sub_type) {
          this.relatedCards.header.title = `${this.card.sub_type} Cards`;
        }
        // Related super type cards
        else if (this.card.super_type) {
          this.relatedCards.header.title = `${this.card.super_type} Cards`;
        }

        // Expansion name
        this.expansionCards.header.title = `${this.card.expansion.name} Cards`;
        this.expansionCards.noResults =
          'No ' + this.card.expansion.name + ' cards found';
        this.expansionCards.header.titleRoute = this.card.expansion.route;

        // Related cards
        this.getRelatedCards();
        // Expansion cards
        this.getExpansionCards();
      }
    });

    // Response get user cards
    this.userCardsService
      .getCardUserCardsObservable()
      .subscribe((userCards) => {
        if (userCards) {
          this.userCards = userCards;
        }
      });

    // Response get related pokemon cards
    this.pokemonService.getPokemonVariantCardsObservable().subscribe((res) => {
      if (res) {
        this.relatedCards.itemGroups = [
          new ItemGroup({
            items: res.cards,
          }),
        ];
      }
    });

    // Response get related sub type/supertype cards
    this.cardsService.getCardsFilteredObservable().subscribe((res) => {
      if (res) {
        this.relatedCards.itemGroups = [
          new ItemGroup({
            items: res.cards,
          }),
        ];
      }
    });

    // Response get expansion cards
    this.expansionService.getExpansionCardsObservable().subscribe((res) => {
      if (res) {
        this.expansionCards.itemGroups = [
          new ItemGroup({
            items: res.cards,
          }),
        ];
      }
    });
  }

  handleRoute() {
    // Param - card slug
    this.route.params.subscribe((params) => {
      const slug = params['slug'];
      // Get card
      this.cardService.getCard(slug);
      // Get user cards
      if (this.authenticationService.currentUserValue?.id)
        this.userCardsService.getCardUserCards(slug);
    });
  }

  getRelatedCards() {
    if (this.card) {
      // Related pokemon cards
      if (this.card.primary_pokemon_variants) {
        this.pokemonService.getPokemonVariantCards(
          new APIGetPaged({
            page: this.relatedCards.footer.page,
            slug: this.card.primary_pokemon_variants[0].slug,
            page_size: this.relatedCards.footer.pageSize,
            sort_by: this.relatedCards.filter.selectSortBy.value,
            sort_direction: this.relatedCards.filter.selectSortDirection.value,
            query: this.relatedCards.filter.textboxSearch.value,
          })
        );
      }
      // Related sub types
      else if (this.card.sub_type) {
        this.cardsService.getCardsFiltered(
          new APIGetPaged({
            page: this.relatedCards.footer.page,
            page_size: this.relatedCards.footer.pageSize,
            sort_by: this.relatedCards.filter.selectSortBy.value,
            sort_direction: this.relatedCards.filter.selectSortDirection.value,
            query: this.relatedCards.filter.textboxSearch.value,
            subtype: this.card.sub_type,
          })
        );
      }
      // Related super types
      else if (this.card.sub_type) {
        this.cardsService.getCardsFiltered(
          new APIGetPaged({
            page: this.relatedCards.footer.page,
            page_size: this.relatedCards.footer.pageSize,
            sort_by: this.relatedCards.filter.selectSortBy.value,
            sort_direction: this.relatedCards.filter.selectSortDirection.value,
            query: this.relatedCards.filter.textboxSearch.value,
            supertype: this.card.super_type,
          })
        );
      }
    }
  }

  getExpansionCards() {
    if (this.card) {
      this.expansionService.getExpansionCards(
        new APIGetPaged({
          code: this.card.expansion.code,
          page: this.expansionCards.footer.page,
          page_size: this.expansionCards.footer.pageSize,
          query: this.expansionCards.filter.textboxSearch.value,
          sort_by: this.expansionCards.filter.selectSortBy.value,
          sort_direction: this.expansionCards.filter.selectSortDirection.value,
        })
      );
    }
  }
}
