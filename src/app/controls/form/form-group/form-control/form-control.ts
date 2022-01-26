export class FormControl {
  control: any;
  classes: string = 'width-12';

  constructor(init?: Partial<FormControl>) {
    Object.assign(this, init);
  }
}
