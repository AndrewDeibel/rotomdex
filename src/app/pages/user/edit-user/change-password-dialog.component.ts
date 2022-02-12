import { NotificationsService } from './../../../controls/notifications/notifications.service';
import { AuthenticationService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  DialogConfig,
  Textbox,
  Button,
  DialogRef,
  Notification,
  AlertType,
  ButtonType,
} from '@app/controls';

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
export class ChangePasswordDialogComponent implements OnInit {
  textboxCurrentPassword: Textbox;
  textboxNewPassword: Textbox;
  textboxConfirmNewPassword: Textbox;
  buttonSubmit: Button;
  constructor(
    public config: DialogConfig,
    public dialog: DialogRef,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationsService
  ) {}
  ngOnInit(): void {
    this.buildControls();
  }
  buildControls() {
    this.textboxCurrentPassword = new Textbox({
      label: 'Current Password',
      type: 'password',
    });
    this.textboxNewPassword = new Textbox({
      label: 'New Password',
      type: 'password',
    });
    this.textboxConfirmNewPassword = new Textbox({
      label: 'Confirm New Password',
      type: 'password',
    });
    this.buttonSubmit = new Button({
      text: 'Save',
      type: ButtonType.submit,
      click: () => {
        this.authenticationService
          .changePassword(
            this.textboxCurrentPassword.value,
            this.textboxNewPassword.value,
            this.textboxConfirmNewPassword.value
          )
          .subscribe((res) => {
            if (res.success) {
              this.notificationService.addNotifications([
                new Notification({
                  message: 'Password changed',
                  alertType: AlertType.success,
                }),
              ]);
              this.dialog.close();
            }
          });
      },
    });
  }
}
