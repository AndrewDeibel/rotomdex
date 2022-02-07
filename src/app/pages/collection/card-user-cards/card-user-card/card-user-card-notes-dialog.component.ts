import { Component, OnInit } from '@angular/core';
import { DialogConfig, DialogRef, Button, Textarea } from '@app/controls';

@Component({
  selector: 'card-user-card-notes-dialog',
  template: `<form class="flex vertical padded">
    <div><app-textarea [textarea]="textareaNotes"></app-textarea></div>
    <div class="flex justify-end">
      <app-button [button]="buttonSubmit"></app-button>
    </div>
  </form>`,
})
export class CardUserCardNotesDialogComponent implements OnInit {
  textareaNotes: Textarea;
  buttonSubmit: Button;
  constructor(public config: DialogConfig, public dialog: DialogRef) {
    this.textareaNotes = new Textarea({
      placeholder: 'Notes...',
      rows: 6,
      width: 400,
      value: config.data.notes,
      classes: 'small-12',
    });
    this.buttonSubmit = new Button({
      text: 'Save',
      click: () => {
        this.dialog.close({
          notes: this.textareaNotes.value,
        });
      },
    });
  }
  ngOnInit(): void {}
}
