import { ItemGroup, Items } from '@app/layout';
import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '.';
import { APIGetPaged } from '@app/models';
import { ResCards, AuthenticationService } from '@app/pages';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  items: Items = new Items();

  constructor(
    private favoritesService: FavoritesService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.setupSubscriptions();
    this.setupControls();
  }
  ngOnDestroy() {}

  setupSubscriptions() {
    this.favoritesService
      .getFavoriteCardsObservable()
      .subscribe((res: ResCards | null) => {
        if (res) {
          this.items.header.subtitle = `${res.total_results} Cards`;
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
    this.items.header.title = 'Favorites';
  }

  getFavoriteCards() {
    this.favoritesService.getFavoriteCards(
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
