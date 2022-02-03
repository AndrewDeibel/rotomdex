import { Icons } from './../../../models/icons';
import { Card } from '@app/pages';

export class UserCardGroup {
  name: string;
  icon: string;
  type: string;
  cards: Card[] = [];
  count: number = 0;
  id: number;
  card_group_id: number;
  public: boolean;
  description: string;
  constructor(init?: Partial<UserCardGroup>) {
    Object.assign(this, init);
  }
}

export const getIcon = (type: string) => {
  switch (type) {
    case 'binder':
      return Icons.binder;
    case 'deck':
      return Icons.deck;
    case 'trades':
      return Icons.exchange;
    case 'box':
      return Icons.archive;
    case 'group':
      return Icons.folder;
    default:
      return Icons.folder;
  }
};
