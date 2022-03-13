import { ItemsFilter } from '@app/layout/main';
import { SelectOption, SelectOptionGroup } from '@app/controls';
import { Card } from '@app/pages';

export class ScanResult {
  id: number;
  image: string;
  constructor(init?: Partial<ScanResult>) {
    Object.assign(this, init);
  }
}

export class ScanCard {
  id: number;
  scan_id: number;
  result: Card;
  processed: boolean;
  user_success: boolean;
  user_correction?: Card;
  user_correction_id: number;
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
        value: 'card_scans.created_at',
      }),
      new SelectOption({
        text: 'Name',
        value: 'cards.name',
      }),
    ],
  });
  itemFilter.selectSortBy.value = 'card_scans.created_at';
  itemFilter.selectSortDirection.value = 'desc';
}
