import { FormControlGroup } from './form-group/form-group';
import { FormGroup } from '@angular/forms';

export class Form {
  title: string;
  groups: FormControlGroup[];
  formGroup: FormGroup;

  constructor(init?: Partial<Form>) {
    Object.assign(this, init);
  }
}
