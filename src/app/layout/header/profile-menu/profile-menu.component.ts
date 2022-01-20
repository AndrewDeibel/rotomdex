import { Component, OnInit } from '@angular/core';
import { Menu, MenuItem } from '@app/controls/menu';
import { AuthenticationService } from '@app/pages/auth/auth.service';
import { Icons } from '@app/models/icons';

@Component({
  selector: '[profile-menu]',
  templateUrl: './profile-menu.component.html',
})
export class ProfileMenuComponent implements OnInit {
  menu: Menu;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.menu = new Menu({
      classes: 'round',
      clearActiveClickOutside: true,
      horizontal: true,
      items: [
        new MenuItem({
          text: this.authenticationService.currentUserValue?.name,
          icon: Icons.user,
          menu: new Menu({
            classes: 'anchor-right',
            items: [
              new MenuItem({
                text: 'Dashboard',
                icon: Icons.dashboard,
                route: '/collection/dashboard/',
                click: () => {
                  this.menu.clearActive();
                },
              }),
              new MenuItem({
                text: 'Profile',
                icon: Icons.user,
                route: '/profile/edit',
                click: () => {
                  this.menu.clearActive();
                },
              }),
              ...(this.authenticationService.currentUserValue?.hasNovaAccess ||
              true
                ? [
                    new MenuItem({
                      text: 'Admin Login',
                      icon: Icons.signIn,
                      href: 'https://api.rotomdex.app/nova',
                      target: '_blank',
                    }),
                  ]
                : []),
              new MenuItem({
                text: 'Sign Out',
                icon: Icons.signOut,
                click: () => {
                  this.authenticationService.logout();
                },
              }),
            ],
          }),
        }),
      ],
    });
  }
}
