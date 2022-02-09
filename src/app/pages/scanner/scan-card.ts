import { ItemsFilter } from '@app/layout/main';
import { SelectOption, SelectOptionGroup } from '@app/controls';
import { Card } from '@app/pages';

export class ScanCard {
  id: number;
  result: Card;
  processed: boolean;
  user_success: boolean;
  user_correction?: Card;
  other_options: Card[] = [];
  created_at: Date;
  temp_id: number;
  constructor(init?: Partial<ScanCard>) {
    Object.assign(this, init);
  }
}

export class ProcessScan {
  scan_id: number;
  card_groups: number[] = [];
  constructor(init?: Partial<ProcessScan>) {
    Object.assign(this, init);
  }
}

// export function SetSortByScans(itemFilter: ItemsFilter) {
//   itemFilter.selectSortBy;
// }

export function SetSortByScans(itemFilter: ItemsFilter) {
  itemFilter.selectSortBy.optionGroups[0] = new SelectOptionGroup({
    label: 'Sort By',
    options: [
      new SelectOption({
        text: 'Date Added',
        value: 'created_at',
      }),
      new SelectOption({
        text: 'Name',
        value: 'name',
      }),
    ],
  });
  itemFilter.selectSortBy.value = 'created_at';
  itemFilter.selectSortDirection.value = 'desc';
}
