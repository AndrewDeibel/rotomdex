import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Form, FormControl, FormControlGroup, Textarea } from '@app/controls';
import { DialogConfig, DialogRef } from '@app/controls/dialog';

@Component({
  selector: 'card-user-card-notes-dialog',
  template: `<app-form [appForm]="form"></app-form>`,
})
export class CardUserCardNotesDialogComponent implements OnInit {
  formNotes: FormGroup;
  public form: Form;
  constructor(
    public config: DialogConfig,
    public dialog: DialogRef,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.formNotes = this.formBuilder.group({
      notesControl: this.formBuilder.control(this.config.data.notes),
    });
    this.form = new Form({
      formGroup: this.formNotes,
      cancel: () => {
        this.dialog.close();
      },
      save: () => {
        this.dialog.close({
          notes: (this.form.groups[0].controls[0].control as Textarea).value,
        });
      },
      groups: [
        new FormControlGroup({
          controls: [
            new FormControl({
              formControlName: 'notesControl',
              control: new Textarea({
                width: 400,
                rows: 6,
              }),
            }),
          ],
        }),
      ],
    });
  }
}
