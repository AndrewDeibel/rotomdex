import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Size } from '@app/models/size';
import { Menu, MenuItem } from '@app/controls/menu';
import { Card, SetSortByCards } from './card';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../../services/card.service';
import { AuthenticationService } from '@app/services/auth.service';
import "@app/extensions/string.extensions";
import { Icons, Symbols } from '@app/models/icons';
import { Button, Dialog, DialogService, LoaderService, Tag } from '@app/controls';
import { CardsService } from '../../../services/cards.service';
import { ItemGroup, Items } from '@app/layout/main';
import { ExpansionService, GetExpansion, GetExpansionCards } from '@app/services/expansion.service';
import { GetPokemonVariantCards, PokemonService } from '@app/pages/pokemons';
import { Title } from '@angular/platform-browser';
import { AppSettings } from '@app/app';

@Component({
    selector: 'mb-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class CardComponent implements OnInit {

	@Input() card: Card;
	relatedCards: Items = new Items();
	expansionCards: Items = new Items();
	cardImageHover: boolean = false;
	tagRarity: Tag;
	tagArtist: Tag;
	buttonTCGPlayer: Button;
	buttonEbay: Button;

    constructor(
		private titleService: Title,
		private loaderService: LoaderService,
		private cardService: CardService,
		private cardsService: CardsService,
		private route: ActivatedRoute,
		private expansionService: ExpansionService,
		private dialogService: DialogService,
		private pokemonService: PokemonService) {}

    ngOnInit(): void {
		this.setupControls();
		this.setupSubscriptions();
		this.handleRoute();
	}

	resetControls() {
		this.card =	null;
	}

	setupControls() {

		this.resetControls();

		// Related cards
		this.relatedCards.footer.pageSize = 12;
		this.relatedCards.noResultsImage = Symbols.cards;
		this.relatedCards.noResults = "No related cards found";
		this.relatedCards.itemClasses = "width-2 medium-3 small-6";
		this.relatedCards.showFilters = false;
		this.relatedCards.showFooter = false;
		SetSortByCards(this.relatedCards.filter);
		this.relatedCards.header.button = new Button({
			text: "View All",
			icon: Icons.externalLink
		});

		// Expansion cards
		this.expansionCards.footer.pageSize = 12;
		this.expansionCards.noResultsImage = Symbols.cards;
		this.expansionCards.itemClasses = "width-2 medium-3 small-6";
		this.expansionCards.showFilters = false;
		this.expansionCards.showFooter = false;
		SetSortByCards(this.expansionCards.filter);
		this.expansionCards.header.button = new Button({
			text: "View All",
			icon: Icons.externalLink
		});

		// Buttons
		this.buttonTCGPlayer = new Button({
			icon: Icons.externalLink,
			text: "Buy on TCGPlayer",
			classes: "small width-12"
		});
		this.buttonEbay = new Button({
			icon: Icons.externalLink,
			text: "Buy on eBay",
			classes: "small width-12"
		});
	}

	getTypeImage(type: string) {
		return `/assets/symbols/${type.toLowerCase()}.svg`;
	}

	createDialogCardImage() {
		this.dialogService.setDialog(new Dialog({
			title: `${this.card.name} - ${this.card.expansion.name}`,
			content: `<div class="card-image"><img src="${this.card.image_high_res}" /></div>`,
		}));
	}

	setupSubscriptions() {

		// Response get card
		this.cardService.getCardObservable().subscribe(card => {
			if (card) {
				this.loaderService.clearItemLoading("getCard");
				this.titleService.setTitle(AppSettings.titlePrefix + card.name);

				// Data
				this.card = card;

				this.relatedCards.header.title = `More ${this.card.pokemon.name} Cards`;
				this.relatedCards.noResults = `No ${this.card.pokemon.name} cards found`;
				this.relatedCards.header.button.route = this.card.pokemon.route;

				// Rarity
				if (this.card.expansion.name.toLowerCase().includes("promo")) {
					this.tagRarity = new Tag({
						text: "Promo",
						classes: "promo card-rarity",
					});
				}
				else if (this.card.rarity) {
					this.tagRarity = new Tag({
						text: this.card.rarity,
						classes: "card-rarity " + this.card.rarity.toLowerCase().replace(' ', '-'),
					});
				}

				// Artist
				if (this.card.artist) {
					this.tagArtist = new Tag({
						text: this.card.artist,
						icon: Icons.paintBrush
					});
				}

				// Get related/expansion cards
				this.getRelatedCards();
				this.getExpansionCards();

				// Expansion name
				this.expansionCards.header.title = "More " + this.card.expansion.name + " Cards";
				this.expansionCards.noResults = "No " + this.card.expansion.name + " cards found";
				this.expansionCards.header.button.route = this.card.expansion.route;

				// Prices
				if (this.card.last_prices) {
					this.buttonTCGPlayer.price = this.card.last_prices.market_price;
					this.buttonEbay.price = this.card.last_prices.market_price;
				}
			}
		});

		// Response get related cards
		this.pokemonService.getPokemonVariantCardsObservable().subscribe(res => {
			if (res) {
				this.loaderService.clearItemLoading("getPokemonCards");
				this.relatedCards.itemGroups = [
					new ItemGroup({
						items: res.cards
					})
				];
			}
		});

		// Response get expansion cards
		this.expansionService.getExpansionCardsObservable().subscribe(res => {
			if (res) {
				this.loaderService.clearItemLoading("getExpansionCards");
				this.expansionCards.itemGroups = [
					new ItemGroup({
						items: res.cards
					})
				];
			}
		});
	}
	
	handleRoute() {
		// ID param
		this.route.params.subscribe(params => {
			// Request card
			this.loaderService.addItemLoading("getCard");
			this.cardService.getCard(params["slug"]);
		});
	}

	getRelatedCards() {
		if (this.card) {
			this.loaderService.addItemLoading("getPokemonCards");
			this.pokemonService.getPokemonVariantCards(new GetPokemonVariantCards({
				page: this.relatedCards.footer.page,
				slug: this.card.pokemon.variant.slug,
				page_size: this.relatedCards.footer.pageSize,
				sort_by: this.relatedCards.filter.selectSortBy.value,
				sort_direction: this.relatedCards.filter.selectSortDirection.value,
				query: this.relatedCards.filter.textboxSearch.value
			}));
		}
	}

	getExpansionCards() {
		if (this.card) {
			this.loaderService.addItemLoading("getExpansionCards");
			this.expansionService.getExpansionCards(new GetExpansionCards({
				code: this.card.expansion.code,
				page: this.expansionCards.footer.page,
				page_size: this.expansionCards.footer.pageSize,
				query: this.expansionCards.filter.textboxSearch.value,
				sort_by: this.expansionCards.filter.selectSortBy.value,
				sort_direction: this.expansionCards.filter.selectSortDirection.value
			}));
		}
	}

}