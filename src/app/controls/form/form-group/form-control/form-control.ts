export class FormControl {
  control: any;
  classes: string;
  formControl: any;

  constructor(init?: Partial<FormControl>) {
    Object.assign(this, init);
  }
}
