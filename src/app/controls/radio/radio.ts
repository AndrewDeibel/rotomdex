export class Radio {
  selected: boolean;
  text: string;

  constructor(init?: Partial<Radio>) {
    Object.assign(this, init);
  }
}
