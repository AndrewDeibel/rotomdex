import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIGetPaged, APIResponse } from '@app/models';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon, PokemonVariant } from '../pages/pokemons/pokemon/pokemon';

export class GetPokemons extends APIGetPaged {
  constructor(init?: Partial<GetPokemons>) {
    super();
    Object.assign(this, init);
  }
}

export interface ResPokemons {
  total_results: number;
  total_pages: number;
  pokemons?: Pokemon[];
}

export class GetPokemonVariants extends APIGetPaged {
  constructor(init?: Partial<GetPokemonVariants>) {
    super();
    Object.assign(this, init);
  }
}

export interface ResPokemonVariants {
  total_results: number;
  total_pages: number;
  pokemon_variants?: PokemonVariant[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private http: HttpClient) {}

  // Get all pokemons
  private getPokemonsSubject = new BehaviorSubject<ResPokemons | null>(null);
  getPokemonsObservable() {
    this.getPokemonsSubject = new BehaviorSubject<ResPokemons | null>(null);
    return this.getPokemonsSubject.asObservable();
  }
  getPokemons(params: GetPokemons) {
    var url = params.buildUrl('pokemon');
    this.http.get<APIResponse>(url).subscribe((res) => {
      let pokemons: Pokemon[] = [];
      res.data.forEach((pokemon: any) => {
        pokemons.push(new Pokemon(pokemon));
      });
      this.getPokemonsSubject.next({
        total_pages: res.meta.last_page,
        total_results: res.meta.total,
        pokemons: pokemons,
      });
    });
  }

  // Get all pokemons
  private getPokemonVariantsSubject =
    new BehaviorSubject<ResPokemonVariants | null>(null);
  getPokemonVariantsObservable() {
    this.getPokemonVariantsSubject =
      new BehaviorSubject<ResPokemonVariants | null>(null);
    return this.getPokemonVariantsSubject.asObservable();
  }
  getPokemonVariants(params: GetPokemonVariants) {
    var url = params.buildUrl('pokemon-variants');
    this.http.get<APIResponse>(url).subscribe((res) => {
      let pokemon_variants: PokemonVariant[] = [];
      res.data.forEach((pokemon_variant: any) => {
        pokemon_variants.push(new PokemonVariant(pokemon_variant));
      });
      this.getPokemonVariantsSubject.next({
        total_pages: res.meta.last_page,
        total_results: res.meta.total,
        pokemon_variants: pokemon_variants,
      });
    });
  }
}
