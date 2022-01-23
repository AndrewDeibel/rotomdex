import {
  UserCardGroupService,
  ResUserCardGroups,
} from './user-card-group/user-card-group.services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu, MenuItem, ProgressBar } from '@app/controls';
import { ItemGroup, Items } from '@app/layout';
import { Icons, Symbols, APIGetPaged } from '@app/models';
import { AuthenticationService } from '@app/pages/auth';
import { UserCardsService } from '@app/pages/collection';

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

  constructor(
    private userCardsService: UserCardsService,
    private userCardGroupService: UserCardGroupService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigateByUrl('/');
    }
  }

  showDashboard: boolean;
  showImport: boolean;
  showWishlist: boolean;
  showAll: boolean;
  showAddGroup: boolean;

  ngOnInit() {
    this.showHideTabs();
    this.setupSubscriptions();
    this.setupControls();
    this.getUserCardGroups();
  }

  showHideTabs() {
    // TODO: move this logic to child routes
    this.showDashboard = window.location.pathname === '/collection/dashboard';
    this.showImport = window.location.pathname === '/collection/import';
    this.showWishlist = window.location.pathname === '/collection/wishlist';
    this.showAll = window.location.pathname === '/collection';
    this.showAddGroup = window.location.pathname === '/collection/add';
  }

  setupSubscriptions() {
    this.userCardsService.getUserCardsObservable().subscribe((res: any) => {
      if (res) {
        this.items.footer.totalPages = res.total_pages;
        this.items.footer.totalItems = res.total_results;
        if (res.cards && res.cards.length) {
          this.items.itemGroups = [
            new ItemGroup({
              items: res.cards,
            }),
          ];
        } else {
          this.items.itemGroups = [];
        }
      }
    });
    this.userCardGroupService
      .getUserCardGroupsObservable()
      .subscribe((res: ResUserCardGroups | null) => {
        if (res) {
          this.menuSidebar.items.push(
            new MenuItem({
              separator: true,
            }),
            ...res.user_card_groups.map(
              (item: any) =>
                new MenuItem({
                  text: item.name,
                })
            ),
            new MenuItem({
              text: 'Add Group',
              icon: Icons.plus,
              route: '/collection/add',
              exactMatch: true,
            })
          );
        }
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

    this.menuSidebar = new Menu({
      round: false,
      items: [
        new MenuItem({
          text: 'Dashboard',
          icon: Icons.dashboard,
          route: '/collection/dashboard',
          exactMatch: true,
        }),
        new MenuItem({
          text: 'Import',
          icon: Icons.fileImport,
          route: '/collection/import',
          exactMatch: true,
        }),
        new MenuItem({
          text: 'Wishlist',
          icon: Icons.star,
          route: '/collection/wishlist',
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

  getUserCardGroups() {
    this.userCardGroupService.getUserCardGroups(
      new APIGetPaged({
        page: 1,
        page_size: 100,
      })
    );
  }

  getUserCards() {
    this.userCardsService.getUserCards(
      new APIGetPaged({
        page: this.items.footer.page,
        page_size: this.items.footer.pageSize,
        query: this.items.filter.textboxSearch.value,
        sort_by: this.items.filter.selectSortBy.value,
        sort_direction: this.items.filter.selectSortDirection.value,
        user_id: this.authenticationService.currentUserValue?.id,
      })
    );
  }
}
