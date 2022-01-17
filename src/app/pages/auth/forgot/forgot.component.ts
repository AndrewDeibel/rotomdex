import { Router } from '@angular/router';
import { AuthenticationService } from '@app/pages/auth/auth.service';
import { Textbox, Button, ButtonType } from '@app/controls';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NotificationsService, Notification, AlertType } from '@app/controls';

@Component({
  selector: 'forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  form: FormGroup;
  textboxEmail: Textbox;
  buttonSubmit: Button;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notificationService: NotificationsService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      emailControl: ['', Validators.required],
    });
    this.textboxEmail = new Textbox({
      label: 'Email',
    });
    this.buttonSubmit = new Button({
      text: 'Send Reset Password',
      type: ButtonType.submit,
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.authenticationService.forgot(this.textboxEmail.value).subscribe(() => {
      this.notificationService.addNotifications([
        new Notification({
          alertType: AlertType.success,
          message: "If your email exists, we've sent you a reset link",
        }),
      ]);
    });
  }
}
