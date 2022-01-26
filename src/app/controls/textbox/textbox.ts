import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Size } from '@app/models/size';

export class Textbox {
  value: string = '';
  label: string;
  type: string = 'text';
  valid: boolean;
  min: number;
  max: number;
  integer: boolean;
  icon: IconProp;
  placeholder: string;
  width: number;
  classes: string;
  wrapperClasses: string;
  disabled: boolean;
  readOnly: boolean;
  clearable: boolean;
  colorPicker: boolean;
  autoComplete: boolean;
  dark: boolean;
  size: Size;
  showPlusMinus: boolean;

  keyup: (value: string) => void;
  keydown: (value: string) => void;
  keydownEnter: (value: string) => void;
  clickIcon: (value: string) => void;
  change: (value: string) => void;
  blur: (value: string) => void;

  clickClear: () => void;
  clear = () => {
    this.value = '';
  };

  public constructor(init?: Partial<Textbox>) {
    Object.assign(this, init);
  }
}
