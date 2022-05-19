import { Select, SelectOption, SelectOptionGroup } from '@app/controls';
import { ItemsFilter, ItemsFooter } from '@app/layout/main';
import { Card } from '@app/pages/cards';

export class Expansion {
  id: number;
  name: string;
  code: string;
  ptcgo_code?: string;
  series: Series;
  standard_legal: boolean;
  expanded_legal: boolean;
  total_cards: number;
  release_date: Date;
  symbol: string;
  logo: string;
  total_cards_owned: number;

  route: string;
  cards: Card[] = [];

  constructor(init?: Partial<Expansion>) {
    Object.assign(this, init);

    // Route
    this.route = `/expansions/${this.code}`;

    // Init cards
    if (init?.cards) this.cards = init.cards.map((card: any) => new Card(card));
  }
}

export class Series {
  id: number;
  name: string;
  total_cards: number;
  total_cards_owned: number;
  expansions: Expansion[] = [];

  constructor(init?: Partial<Series>) {
    Object.assign(this, init);

    // Init expanions
    if (init?.expansions)
      this.expansions = init.expansions.map(
        (expansion: any) => new Expansion(expansion)
      );
  }
}

export function SetSortExpansions(itemFilter: ItemsFilter) {
  itemFilter.selectSortBy.optionGroups = [
    new SelectOptionGroup({
      label: 'Sort By',
      options: [
        new SelectOption({
          text: 'Release Date',
          value: 'expansion.release_date',
        }),
      ],
    }),
  ];

  itemFilter.selectSortDirection.optionGroups = [
    new SelectOptionGroup({
      label: 'Sort Direction',
      options: [
        new SelectOption({
          text: 'Asc',
          value: 'asc',
        }),
        new SelectOption({
          text: 'Desc',
          value: 'desc',
          selected: true,
        }),
      ],
    }),
  ];
  itemFilter.selectSortDirection.value = 'desc';

  // itemFilter.selectSortBy.optionGroups[0] = new SelectOptionGroup({
  //   label: 'Sort By',
  //   options: [
  //     new SelectOption({
  //       text: 'Release Date',
  //       value: 'expansion.release_date',
  //     }),
  //   ],
  // });
  // itemFilter.selectSortBy.value = 'expansion.release_date';
  // itemFilter.selectSortDirection.value = 'desc';
}

export function SetSortByExpansion(itemFilter: ItemsFilter) {
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
    ],
  });
  itemFilter.selectSortBy.value = 'number';
}

export function SetPageSize(itemFooter: ItemsFooter) {
  itemFooter.selectPageSize.value = itemFooter.pageSize.toString();
}
