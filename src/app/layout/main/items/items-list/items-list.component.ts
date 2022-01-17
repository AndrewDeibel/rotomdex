// Angular
import { Component, Input, OnInit } from '@angular/core';
import { Pokemon, PokemonVariant } from '@app/pages';

import { Card } from '@app/pages';
import { Expansion } from '@app/pages';

@Component({
  selector: 'items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  @Input() items: any[];

  constructor() {}

  ngOnInit() {}

  isCard(item: any) {
    return item instanceof Card;
  }
  isPokemon(item: any) {
    return item instanceof Pokemon;
  }
  isExpansion(item: any) {
    return item instanceof Expansion;
  }
  isPokemonVariant(item: any) {
    return item instanceof PokemonVariant;
  }
}
