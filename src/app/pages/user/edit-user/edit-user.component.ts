import { getUserAvatars } from './../user';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  DialogConfig,
  DialogService,
  Menu,
  MenuItem,
  Select,
  SelectOption,
  Textbox,
  Toggle,
} from '@app/controls';
import { Button, ButtonType } from '@app/controls/button';
import { APIGetPaged, Icons } from '@app/models';
import { PokemonsService, User } from '@app/pages';
import { AuthenticationService } from '@app/pages/auth/auth.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent implements OnInit {
  menuSidebar: Menu;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
    this.setupControls();
  }
  ngOnDestroy() {}

  setupControls() {
    this.menuSidebar = new Menu({
      round: false,
      items: [
        new MenuItem({
          text: 'Edit Profile',
          icon: Icons.user,
          route: '/profile',
          exactMatch: true,
        }),
        // new MenuItem({
        //   text: 'Change Password',
        //   icon: Icons.lock,
        //   route: '/profile/change-password',
        // }),
        new MenuItem({
          text: 'Subscription',
          icon: Icons.sync,
          route: '/profile/subscription',
          exactMatch: true,
        }),
      ],
    });
  }
}
