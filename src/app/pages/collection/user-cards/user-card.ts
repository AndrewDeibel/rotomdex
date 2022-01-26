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
  purchase_price: number;
  quantity: number;

  constructor(init?: Partial<UserCard>) {
    Object.assign(this, init);
    this.user_card_id = this.id;
  }
}