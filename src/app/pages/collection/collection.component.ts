import { AuthenticationService } from '@app/services/auth.service';
import { UserCardsService } from '@app/components';
import { Items, ItemGroup } from '@app/layout';
import { Icons, Symbols } from '@app/models';
import { Menu, MenuItem, LoaderService, ProgressBar } from '@app/controls';
import { Component, OnInit } from '@angular/core';
import { GetCards } from '@app/pages/cards/cards.service';

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
    private loaderService: LoaderService,
    private userCardsService: UserCardsService,
    private authenticationService: AuthenticationService
  ) {}

  showDashboard = () => {
    return window.location.pathname === '/collection/dashboard';
  };
  showAddGroup = () => {
    return window.location.pathname === '/collection/add';
  };
  showAll = () => {
    return window.location.pathname === '/collection';
  };

  ngOnInit() {
    this.setupSubscriptions();
    this.setupControls();
    this.getCollectionCards();
  }

  setupSubscriptions() {
    this.userCardsService.getUserCardsObservable().subscribe((res: any) => {
      if (res) {
        this.loaderService.clearItemLoading('getCollectionCards');
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
  }

  setupControls() {
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
          text: 'All Cards',
          symbol: Symbols.cards,
          route: '/collection',
          exactMatch: true,
        }),
        new MenuItem({
          text: 'Example Binder 1',
          icon: Icons.archive,
          route: '/collection/123',
          exactMatch: true,
        }),
        new MenuItem({
          text: 'Add Group',
          icon: Icons.plus,
          route: '/collection/add',
          exactMatch: true,
        }),
      ],
    });
  }

  getCollectionCards() {
    this.loaderService.addItemLoading('getCollectionCards');
    this.userCardsService.getUserCards(
      new GetCards({
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
