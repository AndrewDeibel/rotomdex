import { SelectOption, SelectOptionGroup } from '@app/controls';
import { ItemsFilter } from '@app/layout';
import { Items } from '@app/layout/main/items/items';

export class Cards {
  items: Items = new Items();

  hidePaging: boolean = false;
  totalCards: number;
  art: boolean;
  isDefault: boolean = false;
  getCardsOnInit: boolean = true;

  constructor(init?: Partial<Cards>) {
    Object.assign(this, init);
  }
}

export function SetSortByCards(itemFilter: ItemsFilter) {
  itemFilter.selectSortBy.optionGroups[0] = new SelectOptionGroup({
    label: 'Sort By',
    options: [
      new SelectOption({
        text: 'Number',
        value: 'number',
      }),
      new SelectOption({
        text: 'Name',
        value: 'name',
      }),
      new SelectOption({
        text: 'Release Date',
        value: 'cards.release_date',
      }),
      new SelectOption({
        text: 'Rarity',
        value: 'rarity',
      }),
    ],
  });
  itemFilter.selectSortBy.value = 'cards.release_date';
}

export function SetSortByExpansionCards(itemFilter: ItemsFilter) {
  itemFilter.selectSortBy.optionGroups[0] = new SelectOptionGroup({
    label: 'Sort By',
    options: [
      new SelectOption({
        text: 'Number',
        value: 'number',
      }),
      new SelectOption({
        text: 'Name',
        value: 'name',
      }),
      new SelectOption({
        text: 'Rarity',
        value: 'rarity',
      }),
    ],
  });
  itemFilter.selectSortBy.value = 'number';
}

export function SetSortByGlobal(itemFilter: ItemsFilter) {
  itemFilter.selectSortBy.optionGroups[0] = new SelectOptionGroup({
    label: 'Sort By',
    options: [
      new SelectOption({
        text: 'Number',
        value: 'number',
      }),
      new SelectOption({
        text: 'Name',
        value: 'name',
      }),
      new SelectOption({
        text: 'Release Date',
        value: 'release_date',
      }),
      new SelectOption({
        text: 'Rarity',
        value: 'rarity',
      }),
    ],
  });
  itemFilter.selectSortBy.value = 'release_date';
}
