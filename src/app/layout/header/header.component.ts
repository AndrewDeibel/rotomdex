import { Location } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu, MenuItem } from '@app/controls/menu';
import { Icons, Symbols } from '@app/models/icons';
import { AuthenticationService } from '@app/pages/auth/auth.service';
import { User } from '@app/pages/user';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menu: Menu = new Menu();
  menuBack: Menu = new Menu();
  user: User;
  menuLogin: Menu;
  scrolled: boolean;
  @Input() transparent: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.menuLogin = new Menu({
      classes: 'round',
      horizontal: true,
      items: [
        new MenuItem({
          icon: Icons.signIn,
          text: 'Sign In',
          click: () => {
            this.router.navigate(['/signin'], {
              queryParams: { returnUrl: this.router.routerState.snapshot.url },
            });
          },
        }),
      ],
    });

    this.menuBack.items.push(
      new MenuItem({
        text: 'Back',
        icon: Icons.arrowLeft,
        click: () => {
          this.location.back();
        },
      })
    );

    //this.menu.round = false;
    this.menu.clearActiveClickOutside = true;
    this.menu.horizontal = true;
    this.menu.classes = 'medium-12 medium-stacked medium-square';
    this.buildMenuItems();

    if (!this.authenticationService.currentUserValue) {
      this.authenticationService.currentUserObservable().subscribe(() => {
        this.buildMenuItems();
      });
    }
  }
  ngOnDestroy() {}

  buildMenuItems() {
    this.menu.items = [
      new MenuItem({
        icon: Icons.box,
        text: 'Expansions',
        route: 'expansions',
        click: () => {
          this.menu.clearActive();
        },
      }),
      new MenuItem({
        symbol: Symbols.cards,
        text: 'Cards',
        route: 'cards',
        click: () => {
          this.menu.clearActive();
        },
      }),
      new MenuItem({
        symbol: Symbols.pokeball,
        text: 'Pokémon',
        route: 'pokemon',
        click: () => {
          this.menu.clearActive();
        },
      }),
      ...(this.authenticationService.currentUserValue
        ? [
            new MenuItem({
              icon: Icons.scanner,
              text: 'Scanner',
              route: 'scanner',
              click: () => {
                this.menu.clearActive();
              },
            }),
            new MenuItem({
              icon: Icons.archive,
              text: 'Collection',
              route: 'collection',
              click: () => {
                this.menu.clearActive();
              },
            }),
          ]
        : []),
    ];
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled =
      document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
  }

  get signedIn(): boolean {
    return this.authenticationService.currentUserValue != null;
  }
}
