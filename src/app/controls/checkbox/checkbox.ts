import { Size } from '@app/models/size';

export class Checkbox {
  id?: string;
  text?: string;
  size: Size = Size.medium;
  disabled: boolean = false;
  checked: boolean = false;
  change: (checked: boolean) => void;

  public constructor(init?: Partial<Checkbox>) {
    Object.assign(this, init);
  }
}
