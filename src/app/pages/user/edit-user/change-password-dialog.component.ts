import { DialogRef } from '@app/controls/dialog';
import { Component } from '@angular/core';
import { DialogConfig, Textbox, Button } from '@app/controls';

@Component({
  selector: 'change-password-dialog',
  template: `<form class="flex vertical padded">
    <div>
      <textbox [textbox]="textboxCurrentPassword"></textbox>
    </div>
    <div>
      <textbox [textbox]="textboxNewPassword"></textbox>
    </div>
    <div>
      <textbox [textbox]="textboxConfirmNewPassword"></textbox>
    </div>
    <div>
      <app-button [button]="buttonSubmit"></app-button>
    </div>
  </form>`,
})
export class ChangePasswordDialogComponent {
  textboxCurrentPassword: Textbox = new Textbox({
    label: 'Current Password',
    type: 'password',
  });
  textboxNewPassword: Textbox = new Textbox({
    label: 'New Password',
    type: 'password',
  });
  textboxConfirmNewPassword: Textbox = new Textbox({
    label: 'Confirm New Password',
    type: 'password',
  });
  buttonSubmit: Button = new Button({
    text: 'Save',
  });
  constructor(public config: DialogConfig, public dialog: DialogRef) {}
}
