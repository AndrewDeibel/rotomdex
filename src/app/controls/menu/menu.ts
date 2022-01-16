import { Size } from '@app/models/size';
import { Textbox } from '../textbox';
import { Button } from '../button';
import { Icons } from '@app/models';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export class Menu {
  items: MenuItem[] = [];
  unfilteredItems: MenuItem[] = [];
  horizontal: boolean = false;
  round: boolean = true;
  tabs: boolean = false;
  classes?: string;
  size: Size = Size.medium;
  minHeight?: string;
  minWidth?: string;
  maxHeight?: string;
  maxWidth?: string;
  borders: boolean = false;
  clearActiveClickOutside: boolean = true;
  textboxSearch: Textbox;
  search: boolean;
  dark: boolean;

  constructor(init?: Partial<Menu>) {
    Object.assign(this, init);
    this.setupControls();
  }

  setupControls() {
    this.textboxSearch = new Textbox({
      icon: Icons.search,
      clearable: true,
      placeholder: 'Search...',
      keydownEnter: (value) => {
        this.searchItems(value);
      },
      clickIcon: (value) => {
        this.searchItems(value);
      },
    });
  }

  searchItems(query: string) {
    if (query.length) {
      if (!this.unfilteredItems.length) {
        this.unfilteredItems = this.items;
      }
      this.items = this.items.filter((menuItem: MenuItem) => {
        return (
          menuItem &&
          menuItem.text &&
          menuItem.text.toLowerCase().includes(query.toLowerCase())
        );
      });
    } else {
      this.items = this.unfilteredItems;
    }
  }

  clearActive() {
    if (this.items.length) {
      this.items.forEach((item) => {
        item.active = false;
        if (item.menu && item.menu.items.length) {
          item.menu.clearActive();
        }
      });
    }
  }
}

export class MenuItem {
  text?: string;
  route?: string;
  href?: string;
  icon?: IconProp;
  active: boolean = false;
  menu?: Menu;
  price?: number;
  symbol?: string;
  classes?: string;
  classesLink?: string;
  textbox?: Textbox;
  button?: Button;
  disabled: boolean;
  separator: boolean = false;
  target?: string;
  exactMatch: boolean = false;

  public click: (event: any) => void;

  public constructor(init?: Partial<MenuItem>) {
    Object.assign(this, init);
    if (this.href) {
      this.target = '_blank';
    }
  }
}
