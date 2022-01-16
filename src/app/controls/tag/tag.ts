import { IconProp } from '@fortawesome/fontawesome-svg-core';

export class Tag {
  text: string;
  classes: string = '';
  route: string;
  icon: IconProp;

  public constructor(init?: Partial<Tag>) {
    Object.assign(this, init);
  }
}
