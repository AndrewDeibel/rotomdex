import { Component, OnInit, Input } from '@angular/core';
import { ProgressBar } from '@app/controls/progress-bar/progress-bar';
import { PokemonVariant } from '../../pokemon/pokemon';

@Component({
  selector: 'pokemon-item-grid',
  templateUrl: 'pokemon-item-grid.component.html',
  styleUrls: ['./pokemon-item-grid.component.scss'],
})
export class PokemonItemGridComponent implements OnInit {
  @Input() pokemonVariant: PokemonVariant;
  @Input() size: string;
  progressBar: ProgressBar;

  constructor() {}

  ngOnInit() {
    this.progressBar = new ProgressBar({
      value: this.pokemonVariant.total_cards_owned,
      total: this.pokemonVariant.total_cards,
    });
  }

  getSprite(pokemon_variant: PokemonVariant): string | undefined {
    if (pokemon_variant.sprites.official)
      return pokemon_variant.sprites.official;
    else return pokemon_variant.sprites.default;
  }
}
