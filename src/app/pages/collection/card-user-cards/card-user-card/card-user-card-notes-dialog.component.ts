import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Form, FormControl, FormControlGroup, Textarea } from '@app/controls';
import { DialogConfig, DialogRef } from '@app/controls/dialog';
import { UserCard } from '@app/pages';
import { UserCardsService } from '@app/pages/collection';

@Component({
  selector: 'card-user-card-notes-dialog',
  template: `<app-form [form]="form"></app-form>`,
})
export class CardUserCardNotesDialogComponent {
  formNotes: FormGroup = this.formBuilder.group({
    notesControl: [''],
  });
  public form: Form;
  constructor(
    public config: DialogConfig,
    public dialog: DialogRef,
    private formBuilder: FormBuilder,
    private userCardsService: UserCardsService
  ) {
    this.form = new Form({
      formGroup: this.formNotes,
      cancel: () => {
        this.dialog.close();
      },
      save: () => {
        const userCard: UserCard = {
          ...this.config.data.userCard,
          notes: (this.form.groups[0].controls[0].control as Textarea).value,
        };
        this.userCardsService.updateUserCard(userCard).subscribe((res) => {
          if (res.success) {
          }
        });
        this.dialog.close();
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
