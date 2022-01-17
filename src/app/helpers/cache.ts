import { Card, Expansion, Pokemon, PokemonVariant, Series } from '@app/pages';

export abstract class Cache {
  static expansions: Series[];
  static expansion: { [key: string]: Expansion } = {};
  static card: { [key: string]: Card } = {};
  static pokemon: { [key: string]: Pokemon } = {};
  static pokemonVariant: { [key: string]: PokemonVariant } = {};

  static clear(type: string, key: string) {
    (this as any)[type][key] = null;
  }
}
