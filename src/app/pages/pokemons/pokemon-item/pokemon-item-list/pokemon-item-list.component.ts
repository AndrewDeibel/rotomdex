import { ProgressBar } from './../../../../controls/progress-bar/progress-bar';
import { Component, OnInit, Input } from '@angular/core';
import { Pokemon, PokemonVariant } from '../../pokemon/pokemon';

@Component({
  selector: 'pokemon-item-list',
  templateUrl: 'pokemon-item-list.component.html',
  styleUrls: ['./pokemon-item-list.component.scss'],
})
export class PokmeonItemListComponent implements OnInit {
  @Input() pokemonVariant: PokemonVariant;
  progressBar: ProgressBar;

  constructor() {}

  ngOnInit() {
    this.progressBar = new ProgressBar({
      value: this.pokemonVariant.total_cards_owned,
      total: this.pokemonVariant.total_cards,
    });
  }

  getSprite(pokemon_variant: PokemonVariant): string | undefined {
    if (pokemon_variant.sprites.default) return pokemon_variant.sprites.default;
    else return pokemon_variant.sprites.official;
  }
}
