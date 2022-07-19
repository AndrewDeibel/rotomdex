import { Button } from '@app/controls/button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
export class Alert {
  message: string;
  type: AlertType;
  classes: string;
  icon: IconProp;
  button: Button;
  clickIcon: () => void;

  public constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }
}

export enum AlertType {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error',
}
