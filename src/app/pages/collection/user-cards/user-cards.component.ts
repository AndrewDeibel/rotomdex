import { AuthenticationService } from '@app/pages/auth/auth.service';
import { UserCardsService } from '@app/pages/collection';
import { Component, OnInit } from '@angular/core';
import { ItemGroup, Items } from '@app/layout';
import { APIGetPaged } from '@app/models';
import { SetSortByUserCards } from '.';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'user-cards',
  template: `<items [items]="items" (outputGetItems)="getUserCards()"></items>`,
})
export class UserCardsComponent implements OnInit {
  items: Items = new Items();

  constructor(
    private userCardsService: UserCardsService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.setupSubscriptions();
    this.setupControls();
  }
  ngOnDestroy() {}

  setupSubscriptions() {
    this.userCardsService.getUserCardsObservable().subscribe((res: any) => {
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
    this.items.header.title = 'All Cards';
    SetSortByUserCards(this.items.filter);
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
