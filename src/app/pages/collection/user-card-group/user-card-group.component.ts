import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/pages/auth/auth.service';
import { UserCardsService } from '@app/pages/collection';
import { Component, OnInit } from '@angular/core';
import { ItemGroup, Items } from '@app/layout';
import { APIGetPaged } from '@app/models';

@Component({
  selector: 'user-card-group',
  template: `<items
    [items]="items"
    (outputGetItems)="getUserCardGroup()"
  ></items>`,
})
export class UserCardGroupComponent implements OnInit {
  items: Items = new Items();
  id: number;

  constructor(
    private userCardsService: UserCardsService,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.handleRoute();
    this.setupSubscriptions();
  }

  handleRoute() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        const idChanged = this.id;
        this.id = Number(params['id']);
        if (idChanged) this.getUserCardGroup();
      }
    });
  }

  setupSubscriptions() {
    this.userCardsService.getUserCardsObservable().subscribe((res) => {
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

  getUserCardGroup() {
    this.userCardsService.getUserCards(
      new APIGetPaged({
        page: this.items.footer.page,
        page_size: this.items.footer.pageSize,
        query: this.items.filter.textboxSearch.value,
        sort_by: this.items.filter.selectSortBy.value,
        sort_direction: this.items.filter.selectSortDirection.value,
        user_id: this.authenticationService.currentUserValue?.id,
        card_group_id: this.id,
      })
    );
  }
}
