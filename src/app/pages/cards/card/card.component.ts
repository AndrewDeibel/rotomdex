import { AuthenticationService } from '@app/pages/auth/auth.service';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from '@app/app';
import {
  Button,
  DialogConfig,
  DialogService,
  LoaderService,
  Tag,
} from '@app/controls';
import '@app/helpers/string.extensions';
import { ItemGroup, Items } from '@app/layout/main';
import { APIGetPaged } from '@app/models';
import { Icons, Symbols } from '@app/models/icons';
import { UserCard, UserCardsService } from '@app/pages/collection';
import { ExpansionService } from '@app/pages/expansions/expansion/expansion.service';
import { PokemonService } from '@app/pages/pokemons';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Card, SetSortByCards } from './card';
import { CardImageDialogComponent } from './card-image-dialog.component';
import { CardService } from './card.service';
import { CardsService } from '..';

@AutoUnsubscribe()
@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent implements OnInit {
  @Input() card: Card | null;
  userCards: UserCard[] = [];
  relatedCards: Items = new Items();
  expansionCards: Items = new Items();
  cardImageHover: boolean = false;
  tagRarity: Tag;
  tagArtist: Tag;
  tagNumber: Tag;
  tagShiny: Tag;
  buttonTCGPlayer: Button;
  buttonEbay: Button;
  buttonAdmin: Button;
  hasAdminAccess: boolean;

  constructor(
    private titleService: Title,
    private cardService: CardService,
    private cardsService: CardsService,
    private route: ActivatedRoute,
    private expansionService: ExpansionService,
    private dialogService: DialogService,
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
    SetSortByCards(this.relatedCards.filter);

    // Expansion cards
    this.expansionCards.footer.pageSize = 12;
    this.expansionCards.noResultsImage = Symbols.cards;
    this.expansionCards.itemClasses = 'width-2 medium-3 small-6';
    this.expansionCards.showFilters = false;
    this.expansionCards.showFooter = false;
    SetSortByCards(this.expansionCards.filter);
  }

  getTypeImage(type: string) {
    return `/assets/symbols/${type.toLowerCase()}.svg`;
  }

  createDialogCardImage() {
    if (this.card) {
      this.dialogService.open(
        CardImageDialogComponent,
        new DialogConfig({
          title: `${this.card.name} - ${this.card.expansion.name}`,
          data: {
            image: this.card.image_high_res,
          },
        })
      );
    }
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
        if (this.card.pokemon) {
          this.relatedCards.header.title = `${this.card.pokemon.variant.name} Cards`;
          this.relatedCards.header.titleRoute = this.card.pokemon.route;
          this.relatedCards.noResults = `No ${this.card.pokemon.variant.name} cards found`;
        }
        // Related sub type cards
        else if (this.card.sub_type) {
          this.relatedCards.header.title = `${this.card.sub_type} Cards`;
        }
        // Related super type cards
        else if (this.card.super_type) {
          this.relatedCards.header.title = `${this.card.super_type} Cards`;
        }

        // Admin button
        this.hasAdminAccess =
          this.authenticationService.currentUserValue?.hasNovaAccess || false;
        if (this.hasAdminAccess) {
          this.buttonAdmin = new Button({
            icon: Icons.signIn,
            text: 'Edit in Admin',
            classes: 'small width-12',
            align: 'left',
            target: '_blank',
            href: this.card.nova_edit_url,
          });
        }

        // Rarity
        if (this.card.expansion.name.toLowerCase().includes('promo')) {
          this.tagRarity = new Tag({
            text: 'Promo',
            classes: 'promo card-rarity',
          });
        } else if (this.card.rarity) {
          this.tagRarity = new Tag({
            text: this.card.rarity,
            classes:
              'card-rarity ' + this.card.rarity.toLowerCase().replace(' ', '-'),
          });
        }

        // Artist
        if (this.card.artist)
          this.tagArtist = new Tag({
            classes: 'artist-tag',
            text: this.card.artist,
            icon: Icons.paintBrush,
          });

        // Card number
        this.tagNumber = new Tag({
          text: this.card.number,
        });

        // Shiny
        if (this.card.is_shiny)
          this.tagShiny = new Tag({
            classes: 'shiny-tag',
            text: 'Shiny',
            icon: Icons.stars,
          });

        // Buttons
        if (this.card.tcgplayer_url)
          this.buttonTCGPlayer = new Button({
            icon: Icons.externalLink,
            text: 'Buy on TCGPlayer',
            classes: 'small width-12',
            align: 'left',
            href: this.card.tcgplayer_url,
            target: '_blank',
          });
        if (this.card.ebay_url)
          this.buttonEbay = new Button({
            icon: Icons.externalLink,
            text: 'Buy on eBay',
            classes: 'small width-12',
            align: 'left',
          });

        // Expansion name
        this.expansionCards.header.title = `${this.card.expansion.name} Cards`;
        this.expansionCards.noResults =
          'No ' + this.card.expansion.name + ' cards found';
        this.expansionCards.header.titleRoute = this.card.expansion.route;

        // Prices
        if (this.card.last_prices.length) {
          this.buttonTCGPlayer.price = this.card.last_prices[0].market_price;
          //this.buttonEbay.price = this.card.last_prices[0].market_price;
        }
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
      if (this.card.pokemon) {
        this.pokemonService.getPokemonVariantCards(
          new APIGetPaged({
            page: this.relatedCards.footer.page,
            slug: this.card.pokemon.variant.slug,
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
