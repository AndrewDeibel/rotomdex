import { Card } from '@app/pages';

export class UserCardGroup {
  name: string;
  icon: string;
  type: string;
  cards: Card[] = [];
  count: number = 0;
  id: number;
  public: boolean;
  description: string;
  constructor(init?: Partial<UserCardGroup>) {
    Object.assign(this, init);
  }
}
