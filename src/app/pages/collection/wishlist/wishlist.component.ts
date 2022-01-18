import { AuthenticationService } from './../../auth/auth.service';
import { ItemGroup, Items } from '@app/layout';
import { Component } from '@angular/core';
import { WishlistService } from '.';
import { APIGetPaged } from '@app/models';

@Component({
  selector: 'wishlist',
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent {
  items: Items = new Items();
  constructor(
    private wishlistService: WishlistService,
    private authenticationService: AuthenticationService
  ) {
    this.setupSubscriptions();
    this.setupControls();
  }

  setupSubscriptions() {
    this.wishlistService.getWishlistCardsObservable().subscribe((res: any) => {
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
  }

  setupControls() {
    this.items.header.title = 'Wishlist';
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
