import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'change-password-dialog',
  template: `<form
    class="flex vertical padded"
    [formGroup]="form"
    (ngSubmit)="submit()"
  >
    <div>
      <textbox
        [textbox]="textboxCurrentPassword"
        formControlName="currentPasswordControl"
      ></textbox>
    </div>
    <div>
      <textbox
        [textbox]="textboxNewPassword"
        formControlName="newPasswordControl"
      ></textbox>
    </div>
    <div>
      <textbox
        [textbox]="textboxConfirmNewPassword"
        formControlName="confirmPasswordControl"
      ></textbox>
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
  form: FormGroup;

  constructor(
    public config: DialogConfig,
    public dialog: DialogRef,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildControls();
  }
  ngOnDestroy() {}

  buildControls() {
    this.form = this.formBuilder.group({
      currentPasswordControl: ['', Validators.required],
      newPasswordControl: ['', Validators.required],
      confirmPasswordControl: ['', Validators.required],
    });
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
    });
  }

  submit() {
    if (!this.form.invalid) {
      this.authenticationService
        .changePassword(
          this.form.controls['currentPasswordControl'].value,
          this.form.controls['newPasswordControl'].value,
          this.form.controls['confirmPasswordControl'].value
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
    }
  }
}
