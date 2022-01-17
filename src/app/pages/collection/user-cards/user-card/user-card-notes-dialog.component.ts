import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Form, FormControl, FormControlGroup, Textarea } from '@app/controls';
import { DialogConfig, DialogRef } from '@app/controls/dialog';

@Component({
  selector: 'user-card-notes-dialog',
  template: `<app-form [form]="form"></app-form>`,
})
export class UserCardNotesDialogComponent {
  formNotes: FormGroup = this.formBuilder.group({
    notesControl: [''],
  });
  public form: Form;
  constructor(
    public config: DialogConfig,
    public dialog: DialogRef,
    private formBuilder: FormBuilder
  ) {
    this.form = new Form({
      formGroup: this.formNotes,
      groups: [
        new FormControlGroup({
          controls: [
            new FormControl({
              formControlName: 'notesControl',
              control: new Textarea({}),
            }),
          ],
        }),
      ],
    });
  }
}
