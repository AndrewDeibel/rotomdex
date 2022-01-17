import { Component, OnInit, Input } from '@angular/core';
import { Pokemon, PokemonVariant } from '../../pokemon/pokemon';

@Component({
  selector: 'pokemon-item-list',
  templateUrl: 'pokemon-item-list.component.html',
  styleUrls: ['./pokemon-item-list.component.scss'],
})
export class PokmeonItemListComponent implements OnInit {
  @Input() pokemonVariant: PokemonVariant;

  constructor() {}

  ngOnInit() {}

  getSprite(pokemon_variant: PokemonVariant): string | undefined {
    if (pokemon_variant.sprites.default) return pokemon_variant.sprites.default;
    else return pokemon_variant.sprites.official;
  }
}
