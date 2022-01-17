import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppSettings } from '@app/app';
import { LoaderService } from '@app/controls';
import { ItemGroup, Items } from '@app/layout/main';
import { SetSortByPokemon, PokemonVariant } from './pokemon/pokemon';
import { PokemonsService } from './pokemons.service';
import { APIGetPaged, Symbols } from '@app/models';

@Component({
  selector: 'mb-pokemons',
  templateUrl: 'pokemons.component.html',
})
export class PokemonsComponent implements OnInit {
  items: Items = new Items();
  type: string;

  constructor(
    private route: ActivatedRoute,
    private loaderService: LoaderService,
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
        this.loaderService.clearItemLoading('getPokemon');
        this.items.footer.totalPages = res.total_pages;
        this.items.footer.totalItems = res.total_results;
        var group = new ItemGroup();
        res.pokemon_variants?.forEach((pokemon_variant) => {
          group.items.push(new PokemonVariant(pokemon_variant));
        });
        this.items.itemGroups = [group];
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
    this.loaderService.addItemLoading('getPokemon');
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
