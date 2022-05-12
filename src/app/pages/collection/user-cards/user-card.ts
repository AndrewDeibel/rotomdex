import { Card } from './../../cards/card/card';
import { ItemsFilter } from '@app/layout/main';
import { SelectOption } from '@app/controls';
import { SelectOptionGroup } from './../../../controls/select/select';
import { Condition } from '@app/models';

export class UserCard {
  id: number;
  user_card_id: number;
  card_id: number;
  card_groups: number[] | UserCard[] = [];
  condition: string;
  graded_by: string;
  card_variation: Card;
  card_variation_id: number;
  notes: string;
  date_obtained: Date;
  purchase_price: number;
  quantity: number = 1;
  card: Card;

  constructor(init?: Partial<UserCard>) {
    Object.assign(this, init);
    this.user_card_id = this.id;
    if (init && init.card) this.card = new Card(init.card);
  }
}

export function SetSortByUserCards(itemFilter: ItemsFilter) {
  itemFilter.selectSortBy.optionGroups[0] = new SelectOptionGroup({
    label: 'Sort By',
    options: [
      new SelectOption({
        text: 'Name',
        value: 'cards.name',
      }),
      new SelectOption({
        text: 'Release Date',
        value: 'expansions.release_date',
      }),
      new SelectOption({
        text: 'Date Added',
        value: 'user_cards.created_at',
        selected: true,
      }),
    ],
  });
  itemFilter.selectSortBy.value = 'user_cards.created_at';
  itemFilter.selectSortDirection.value = 'desc';
}
