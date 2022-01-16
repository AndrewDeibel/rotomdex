import { Menu } from '@app/controls/menu';
import { Tag } from '@app/controls/tag';
import { Icons } from '@app/models/icons';
import { Button } from '@app/controls/button';
import { Toggle } from '@app/controls/toggle';
import { ProgressBar } from '@app/controls/progress-bar/progress-bar';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export class ItemsHeader {
  title: string;
  titleRoute: string;
  subtitle: string;
  tags: Tag[] = [];
  symbol: string;
  symbolRarity: string;
  icon: IconProp;
  price: number;
  menu: Menu;
  button: Button;
  toggle: Toggle;
  progressBar: ProgressBar;

  _this: any;
  getItems: (_this: any) => void;

  constructor(init?: Partial<ItemsHeader>) {
    Object.assign(this, init);
  }
}
