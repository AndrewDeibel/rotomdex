export class Toggle {
  checked: boolean = false;
  text: string;
  textChecked: string;
  label: string;
  disabled: boolean;
  name: string;

  public constructor(init?: Partial<Toggle>) {
    Object.assign(this, init);
  }
}
