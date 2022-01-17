export class FormControl {
  control: any;
  classes: string;
  formControlName: string;

  constructor(init?: Partial<FormControl>) {
    Object.assign(this, init);
  }
}
