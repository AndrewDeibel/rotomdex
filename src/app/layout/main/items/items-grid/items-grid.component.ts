import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Pokemon, PokemonVariant } from '@app/pages';
import { Card } from '@app/pages';
import { Expansion } from '@app/pages';

@Component({
  selector: 'items-grid',
  templateUrl: './items-grid.component.html',
  styleUrls: ['./items-grid.component.scss'],
})
export class ItemsGridComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() itemClasses: string;
  @Output() outputClickItem: EventEmitter<any> = new EventEmitter();

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

  clickItem(item: any) {
    this.outputClickItem.emit(item);
  }
}
