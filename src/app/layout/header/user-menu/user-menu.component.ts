import { Component, OnInit } from '@angular/core';
import { Menu, MenuItem } from '@app/controls/menu';
import { AuthenticationService } from '@app/pages/auth/auth.service';
import { Icons } from '@app/models/icons';
import { DialogConfig, DialogRef, DialogService } from '@app/controls';
import { ReportIssueDialogComponent } from './report-issue-dialog/report-issue-dialog.component';

@Component({
  selector: '[user-menu]',
  templateUrl: './user-menu.component.html',
})
export class UserMenuComponent implements OnInit {
  menu: Menu;
  dialogReportIssue: DialogRef;

  constructor(
    private authenticationService: AuthenticationService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.setupControls();
  }

  setupControls() {
    this.menu = new Menu({
      classes: 'round',
      clearActiveClickOutside: true,
      horizontal: true,
      items: [
        new MenuItem({
          text: this.authenticationService.currentUserValue?.name,
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
                route: '/profile',
                click: () => {
                  this.menu.clearActive();
                },
              }),
              new MenuItem({
                text: 'Report Issue',
                icon: Icons.warning,
                click: () => {
                  this.menu.clearActive();
                  this.dialogReportIssue = this.dialogService.open(
                    ReportIssueDialogComponent,
                    new DialogConfig({
                      title: 'Report Issue',
                      data: {
                        width: '400px',
                      },
                    })
                  );
                },
              }),
              ...(this.authenticationService.currentUserValue?.has_nova_access
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
