import { PokemonVariant } from './../pokemons/pokemon/pokemon';
import { Expansion } from './../expansions/expansion/expansion';
import { Card } from './../cards/card/card';

export class Featured {
  cards: Card[] = [];
  expansions: Expansion[] = [];
  pokemon: PokemonVariant[] = [];

  constructor(init?: Partial<Featured>) {
    Object.assign(this, init);
    if (init?.cards) this.cards = init.cards.map((card) => new Card(card));
    if (init?.expansions)
      this.expansions = init.expansions.map(
        (expansion) => new Expansion(expansion)
      );
    if (init?.pokemon)
      this.pokemon = init.pokemon.map((pokemon) => new PokemonVariant(pokemon));
  }
}
