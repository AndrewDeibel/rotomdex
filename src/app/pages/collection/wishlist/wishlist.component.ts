import { ItemGroup, Items, ItemsFilter } from '@app/layout';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '.';
import { APIGetPaged } from '@app/models';
import { ResCards, AuthenticationService, SetSortByGlobal } from '@app/pages';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { SelectOption, SelectOptionGroup } from '@app/controls';

export function SetSortWishlistCards(itemFilter: ItemsFilter) {
  itemFilter.selectSortBy.optionGroups[0] = new SelectOptionGroup({
    label: 'Sort By',
    options: [
      new SelectOption({
        text: 'Name',
        value: 'cards.name',
      }),
      new SelectOption({
        text: 'Release Date',
        value: 'expansions.release_date',
      }),
      new SelectOption({
        text: 'Date Added',
        value: 'wishlists.created_at',
        selected: true,
      }),
    ],
  });
  itemFilter.selectSortBy.value = 'wishlists.created_at';

  itemFilter.selectSortDirection.optionGroups = [
    new SelectOptionGroup({
      label: 'Sort Direction',
      options: [
        new SelectOption({
          text: 'Asc',
          value: 'asc',
        }),
        new SelectOption({
          text: 'Desc',
          value: 'desc',
          selected: true,
        }),
      ],
    }),
  ];
  itemFilter.selectSortDirection.value = 'desc';
}

@AutoUnsubscribe()
@Component({
  selector: 'wishlist',
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent implements OnInit {
  items: Items = new Items();
  constructor(
    private wishlistService: WishlistService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.setupSubscriptions();
    this.setupControls();
  }
  ngOnDestroy() {}

  setupSubscriptions() {
    this.wishlistService
      .getWishlistCardsObservable()
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
    this.items.header.title = 'Wishlist';
    SetSortWishlistCards(this.items.filter);
  }

  getWishlistCards() {
    this.wishlistService.getWishlistCards(
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
