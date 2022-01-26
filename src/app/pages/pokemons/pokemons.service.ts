import { LoaderService } from './../../controls/loader/loader.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIGetPaged, APIResponse } from '@app/models';
import { BehaviorSubject } from 'rxjs';
import { PokemonVariant } from './pokemon/pokemon';

export interface ResPokemonVariants {
  total_results: number;
  total_pages: number;
  pokemon_variants?: PokemonVariant[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  // Get all pokemon variants
  private getPokemonVariantsSubject =
    new BehaviorSubject<ResPokemonVariants | null>(null);
  getPokemonVariantsObservable() {
    this.getPokemonVariantsSubject =
      new BehaviorSubject<ResPokemonVariants | null>(null);
    return this.getPokemonVariantsSubject.asObservable();
  }
  getPokemonVariants(params: APIGetPaged, showLoading = true) {
    if (showLoading) this.loaderService.addItemLoading('getPokemon');
    this.http
      .get<APIResponse>(params.buildUrl('pokemon-variants'))
      .subscribe((res) => {
        this.getPokemonVariantsSubject.next({
          total_pages: res.meta.last_page,
          total_results: res.meta.total,
          pokemon_variants: res.data.map(
            (pokemonVariant: any) => new PokemonVariant(pokemonVariant)
          ),
        });
        if (showLoading) this.loaderService.clearItemLoading('getPokemon');
      });
  }
}
