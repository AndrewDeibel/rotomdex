import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSettings } from '@app/app';
import {
  Button,
  DialogConfig,
  DialogService,
  LoaderService,
  ProgressBar,
  Select,
  SelectOption,
  SelectOptionGroup,
  Tag,
} from '@app/controls';
import { ItemGroup, Items } from '@app/layout/main';
import { APIGetPaged, Size, Symbols } from '@app/models';
import { PokedexEntryDialogComponent } from './pokedex-entry-dialog.component';
import { PokemonVariant, SetSortByPokemon } from './pokemon';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'pokemon',
  templateUrl: 'pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  @Input() pokemonVariant: PokemonVariant;
  items: Items = new Items();
  slug: string;
  buttonDex: Button;
  progressBar: ProgressBar;
  selectVariants: Select;
  tagHeight: Tag;
  tagWeight: Tag;

  constructor(
    private titleService: Title,
    private pokemonService: PokemonService,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.setupControls();

    // Response get pokemon
    this.pokemonService
      .getPokemonVariantObservable()
      .subscribe((pokemonVariant) => {
        if (pokemonVariant) {
          this.titleService.setTitle(
            AppSettings.titlePrefix + pokemonVariant.pokemon.name
          );
          this.loaderService.clearItemLoading('getPokemon');
          this.pokemonVariant = pokemonVariant;
          this.items.noResults =
            'No ' + this.pokemonVariant.name + ' cards found';
          this.progressBar = new ProgressBar({
            value: pokemonVariant.progress,
            total: pokemonVariant.total_cards,
          });
          this.getCards();

          // Dex button
          this.buttonDex = new Button({
            symbol: Symbols.pokeball,
            text: 'Pokédex Entry',
            size: Size.small,
            click: () => {
              this.dialogService.open(
                PokedexEntryDialogComponent,
                new DialogConfig({
                  title: 'Pokédex Entry',
                  data: this.pokemonVariant.pokemon.flavor_texts,
                })
              );
            },
          });

          // Height/weight
          this.tagHeight = new Tag({
            text: this.pokemonVariant.height / 10 + ' m',
          });
          this.tagWeight = new Tag({
            text: this.pokemonVariant.weight / 10 + 'kg',
          });

          // Variants
          this.selectVariants.optionGroups = [
            new SelectOptionGroup({
              label: 'Variants',
              options: [
                new SelectOption({
                  text: this.pokemonVariant.name,
                  value: this.pokemonVariant.route,
                }),
                ...this.pokemonVariant.other_variants.map(
                  (variant) =>
                    new SelectOption({
                      text: variant.name,
                      value: variant.route,
                    })
                ),
              ],
            }),
          ];
          this.selectVariants.value = this.pokemonVariant.route;
        }
      });

    // Response get pokemon cards
    this.pokemonService.getPokemonVariantCardsObservable().subscribe((res) => {
      if (res) {
        this.items.footer.totalPages = res.total_pages;
        this.items.footer.totalItems = res.total_results;
        this.items.filter.textboxSearch.placeholder = `Search ${this.pokemonVariant.name} cards...`;
        if (res.cards) {
          this.items.itemGroups = [
            new ItemGroup({
              items: res.cards,
            }),
          ];
        } else {
          this.items.itemGroups = [];
        }
      }
    });

    // Request get pokemon
    this.route.params.subscribe((params) => {
      this.slug = params['slug'];
      this.pokemonService.getPokemonVariant(this.slug);
    });
  }

  setupControls() {
    SetSortByPokemon(this.items.filter.selectSortBy);
    this.items.showHeader = false;
    this.items.footer.pageSize = 24;
    this.items.footer.selectPageSize.value =
      this.items.footer.pageSize.toString();
    this.items.noResultsImage = Symbols.cards;

    // Variants
    this.selectVariants = new Select({
      classes: 'small',
      change: (value) => {
        this.router.navigate([value]);
      },
    });
  }

  getCards() {
    this.pokemonService.getPokemonVariantCards(
      new APIGetPaged({
        page: this.items.footer.page,
        slug: this.slug,
        page_size: this.items.footer.pageSize,
        sort_by: this.items.filter.selectSortBy.value,
        sort_direction: this.items.filter.selectSortDirection.value,
        query: this.items.filter.textboxSearch.value,
      })
    );
  }
}
