import { FormControl } from './form-control/form-control';

export class FormControlGroup {
  title: string;
  subtitle: string;
  controls: FormControl[];

  constructor(init?: Partial<FormControlGroup>) {
    Object.assign(this, init);
  }
}
