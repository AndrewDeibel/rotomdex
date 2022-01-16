import { Size } from '@app/models/size';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export enum ButtonType {
  button = 'button',
  submit = 'submit',
}

export class Button {
  text: string;
  icon: IconProp;
  symbol: string;
  href: string;
  route: string;
  disabled: boolean;
  classes: string;
  width: string;
  type: ButtonType = ButtonType.button;
  price: number;
  size: Size;

  public click: () => void;

  public constructor(init?: Partial<Button>) {
    Object.assign(this, init);
  }
}
