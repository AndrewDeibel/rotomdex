import { Button } from '@app/controls';
import { FormControlGroup } from './form-group/form-group';
import { UntypedFormGroup } from '@angular/forms';

export class Form {
  title: string;
  groups: FormControlGroup[];
  formGroup: UntypedFormGroup;
  cancel: () => void;
  save: () => void;
  buttons: Button[] = [
    new Button({
      text: 'Cancel',
      classes: 'secondary',
      click: () => {
        if (this.cancel) this.cancel();
        else {
          history.back();
        }
      },
    }),
    new Button({
      text: 'Save',
      click: () => {
        if (this.save) this.save();
      },
    }),
  ];

  constructor(init?: Partial<Form>) {
    Object.assign(this, init);
  }
}
