import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from '@app/controls';
import { Cache } from '@app/helpers';
import { APIGetPaged, APIResponse, buildUrl } from '@app/models';
import { Card, ResCards } from '@app/pages/cards';
import { BehaviorSubject } from 'rxjs';
import { Pokemon, PokemonVariant } from './pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  // Get pokemon
  private getPokemonSubject = new BehaviorSubject<Pokemon | null>(null);
  getPokemonObservable() {
    this.getPokemonSubject = new BehaviorSubject<Pokemon | null>(null);
    return this.getPokemonSubject.asObservable();
  }
  getPokemon(slug: string) {
    if (Cache.pokemon[slug]) {
      this.getPokemonSubject.next(Cache.pokemon[slug]);
    } else {
      this.loaderService.addItemLoading('getPokemon');
      this.http
        .get<APIResponse>(buildUrl('pokemon/' + slug))
        .subscribe((res) => {
          this.getPokemonSubject.next(new Pokemon(res.data));
          this.loaderService.clearItemLoading('getPokemon');
        });
    }
  }

  // Get pokemon variant
  private getPokemonVariantSubject = new BehaviorSubject<PokemonVariant | null>(
    null
  );
  getPokemonVariantObservable() {
    this.getPokemonVariantSubject = new BehaviorSubject<PokemonVariant | null>(
      null
    );
    return this.getPokemonVariantSubject.asObservable();
  }
  getPokemonVariant(slug: string) {
    if (Cache.pokemonVariant[slug]) {
      this.getPokemonVariantSubject.next(Cache.pokemonVariant[slug]);
    } else {
      this.loaderService.addItemLoading('getPokemonVariant');
      this.http
        .get<APIResponse>(buildUrl('pokemon-variants/' + slug))
        .subscribe((res) => {
          this.getPokemonVariantSubject.next(new PokemonVariant(res.data));
          this.loaderService.clearItemLoading('getPokemonVariant');
        });
    }
  }

  // Get pokemon variant cards
  private getPokemonVariantCardsSubject = new BehaviorSubject<ResCards | null>(
    null
  );
  getPokemonVariantCardsObservable() {
    this.getPokemonVariantCardsSubject = new BehaviorSubject<ResCards | null>(
      null
    );
    return this.getPokemonVariantCardsSubject.asObservable();
  }
  getPokemonVariantCards(params: APIGetPaged) {
    this.loaderService.addItemLoading('getPokemonCards');
    this.http
      .get<APIResponse>(
        params.buildUrl(`pokemon-variants/${params.slug}/cards`)
      )
      .subscribe((res) => {
        this.getPokemonVariantCardsSubject.next({
          total_pages: res.meta.last_page,
          total_results: res.meta.total,
          cards: res.data.map((card: any) => new Card(card)),
        });
        this.loaderService.clearItemLoading('getPokemonCards');
      });
  }
}
