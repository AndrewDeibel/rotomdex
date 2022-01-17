import { NotificationsService, Notification, AlertType } from '@app/controls';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/pages/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Textbox, Button, ButtonType } from '@app/controls';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mb-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  form: FormGroup;
  textboxEmail: Textbox;
  textboxPassword: Textbox;
  textboxConfirmPassword: Textbox;
  buttonSubmit: Button;
  token: string;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationsService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
    // Get query params
    this.route.params.subscribe((params) => {
      this.token = params['token'];
    });

    // Build form
    this.form = this.formBuilder.group({
      emailControl: ['', Validators.required],
      passwordControl: ['', Validators.required],
      confirmPasswordControl: ['', Validators.required],
    });

    // Build form controls
    this.textboxEmail = new Textbox({
      label: 'Email',
    });
    this.textboxPassword = new Textbox({
      label: 'Password',
    });
    this.textboxConfirmPassword = new Textbox({
      label: 'Confirm Password',
    });
    this.buttonSubmit = new Button({
      text: 'Reset Password',
      type: ButtonType.submit,
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.authenticationService
      .reset(
        this.token,
        this.textboxEmail.value,
        this.textboxPassword.value,
        this.textboxConfirmPassword.value
      )
      .subscribe(() => {
        this.notificationService.addNotifications([
          new Notification({
            alertType: AlertType.success,
            message: 'Password Reset',
          }),
        ]);
      });
  }
}
