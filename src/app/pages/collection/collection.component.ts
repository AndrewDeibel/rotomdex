import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu, MenuItem, ProgressBar } from '@app/controls';
import { Items } from '@app/layout';
import { APIGetPaged, Icons, Symbols } from '@app/models';
import {
  AuthenticationService,
  UserCardGroup,
  UserCardGroupService,
} from '@app/pages';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { getIcon } from '.';

@AutoUnsubscribe()
@Component({
  selector: 'collection',
  templateUrl: 'collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
  progressBar: ProgressBar;
  symbolCards: Symbols;
  symbolPokemon: Symbols;
  menuSidebar: Menu;
  items: Items = new Items();
  groupItems: Items = new Items();

  constructor(
    private userCardGroupService: UserCardGroupService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigateByUrl('/signin');
    }
  }

  ngOnInit() {
    this.setupSubscriptions();
    this.setupControls();
    this.getUserCardGroups();
  }
  ngOnDestroy() {}

  setupSubscriptions() {
    this.userCardGroupService.getUserCardGroupsObservable().subscribe((res) => {
      if (res) {
        this.buildMenu();
        this.menuSidebar.items.push(
          new MenuItem({
            separator: true,
          }),
          ...res.user_card_groups.map(
            (item: UserCardGroup) =>
              new MenuItem({
                text: item.name,
                route: `/collection/group/${item.id}`,
                icon: getIcon(item.type),
              })
          ),
          new MenuItem({
            text: 'Add Group',
            icon: Icons.plus,
            route: '/collection/group/add',
            exactMatch: true,
          })
        );
      }
    });
  }

  buildMenu() {
    this.menuSidebar = new Menu({
      round: false,
      items: [
        new MenuItem({
          text: 'Dashboard',
          icon: Icons.dashboard,
          route: '/collection/dashboard',
          exactMatch: true,
        }),
        // new MenuItem({
        //   text: 'Import',
        //   icon: Icons.fileImport,
        //   route: '/collection/import',
        //   exactMatch: true,
        // }),
        new MenuItem({
          text: 'Wishlist',
          icon: Icons.clipboardCheck,
          route: '/collection/wishlist',
          exactMatch: true,
        }),
        new MenuItem({
          text: 'Favorites',
          icon: Icons.heart,
          route: '/collection/favorites',
          exactMatch: true,
        }),
        new MenuItem({
          text: 'All Cards',
          symbol: Symbols.cards,
          route: '/collection',
          exactMatch: true,
        }),
      ],
    });
  }

  setupControls() {
    this.items.header.title = 'All Cards';
    this.progressBar = new ProgressBar({
      total: 80,
      value: 20,
    });
    this.symbolCards = Symbols.cards;
    this.symbolPokemon = Symbols.pokeball;
    this.buildMenu();
  }

  getUserCardGroups() {
    this.userCardGroupService.getUserCardGroups(
      new APIGetPaged({
        page: 1,
        page_size: 100,
      })
    );
  }
}
