import { Condition } from '@app/models';

export class UserCard {
  id: number;
  user_card_id: number;
  card_id: number;
  card_groups: number[] | UserCard[] = [];
  condition: string = Condition.Mint;
  graded_by: string;
  printing: string;
  notes: string;
  date_obtained: Date;
  purchase_price: number;
  quantity: number = 1;

  constructor(init?: Partial<UserCard>) {
    Object.assign(this, init);
    this.user_card_id = this.id;
  }
}
