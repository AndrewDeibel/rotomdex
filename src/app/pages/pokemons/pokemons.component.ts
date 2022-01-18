import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from '@app/app';
import { ItemGroup, Items } from '@app/layout/main';
import { APIGetPaged, Symbols } from '@app/models';
import { PokemonVariant, SetSortByPokemon } from './pokemon/pokemon';
import { PokemonsService } from './pokemons.service';

@Component({
  selector: 'pokemons',
  templateUrl: 'pokemons.component.html',
})
export class PokemonsComponent implements OnInit {
  items: Items = new Items();
  type: string;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private pokemonService: PokemonsService
  ) {}

  ngOnInit() {
    this.setupSubscriptions();
    this.setupControls();
  }

  setupSubscriptions() {
    // Get query params
    this.route.params.subscribe((params) => {
      this.type = params['type']?.replace('-', ' ');
    });

    // Get data
    this.pokemonService.getPokemonVariantsObservable().subscribe((res) => {
      if (res) {
        this.items.footer.totalPages = res.total_pages;
        this.items.footer.totalItems = res.total_results;
        this.items.itemGroups = [
          new ItemGroup({
            items: res.pokemon_variants?.map(
              (pokemonVariant: any) => new PokemonVariant(pokemonVariant)
            ),
          }),
        ];
      }
    });
  }

  setupControls() {
    SetSortByPokemon(this.items.filter.selectSortBy);
    this.items.noResultsImage = Symbols.pokeball;
    this.items.noResults = 'No Pokémon found';
    this.titleService.setTitle(AppSettings.titlePrefix + 'Pokemon');
    this.items.showHeader = false;
    this.items.itemClasses = 'width-3 medium-4 small-6';
    this.items.filter.textboxSearch.placeholder = 'Search Pokémon...';
    this.items.footer.pageSize = 24;
    this.items.footer.selectPageSize.value =
      this.items.footer.pageSize.toString();
  }

  getPokemonVariants() {
    this.pokemonService.getPokemonVariants(
      new APIGetPaged({
        page: this.items.footer.page,
        page_size: this.items.footer.pageSize,
        sort_by: this.items.filter.selectSortBy.value,
        sort_direction: this.items.filter.selectSortDirection.value,
        query: this.items.filter.textboxSearch.value,
        type: this.type,
      })
    );
  }
}
