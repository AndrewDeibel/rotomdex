import { Card } from './../../../cards/card/card';
import { Condition } from '@app/models';
export class UserCard {
  id: number;
  user_card_id: number;
  card_id: number;
  card_group_id?: number;
  condition: string = Condition.Mint;
  graded_by: string;
  printing: string;
  notes: string;
  date_obtained: Date;
  purchase_price: Number;

  constructor(init?: Partial<UserCard>) {
    Object.assign(this, init);
    this.user_card_id = this.id;
  }
}
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
