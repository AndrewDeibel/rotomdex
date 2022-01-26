export class Textarea {
  value: string = '';
  label: string;
  placeholder: string;
  width: number;
  classes: string;
  disabled: boolean;
  rows: number;

  keydownEnter: (value: string) => void;
  change: (value: string) => void;

  public constructor(init?: Partial<Textarea>) {
    Object.assign(this, init);
  }
}
