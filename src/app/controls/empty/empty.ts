import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Button } from '../button';

export class Empty {
  text: string;
  icon: IconProp;
  image: string;
  button: Button;

  constructor(init?: Partial<Empty>) {
    Object.assign(this, init);
  }
}
