import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu, MenuItem } from '@app/controls';
import { ItemGroup, Items } from '@app/layout';
import { APIGetPaged } from '@app/models';
import { AuthenticationService } from '@app/pages/auth/auth.service';
import { UserCardGroup, UserCardsService } from '@app/pages/collection';
import { getIcon } from '.';
import { SetSortByUserCards } from '../user-cards';
import { Icons } from './../../../models/icons';
import { UserCardGroupService } from './user-card-group.services';

@Component({
  selector: 'user-card-group',
  template: `<items
    [items]="items"
    (outputGetItems)="getUserGroupCards()"
  ></items>`,
})
export class UserCardGroupComponent implements OnInit {
  items: Items = new Items();
  userCardGroups: UserCardGroup[] = [];
  id: number;

  constructor(
    private userCardsService: UserCardsService,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private userCardGroupService: UserCardGroupService
  ) {}

  ngOnInit(): void {
    this.handleRoute();
    this.setupControls();
    this.setupSubscriptions();
  }

  handleRoute() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        const idChanged = this.id;
        this.id = Number(params['id']);
        if (idChanged) {
          this.getUserGroupCards();
          this.updateHeader();
        }
      }
    });
  }

  setupControls() {
    SetSortByUserCards(this.items.filter);
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
    this.userCardGroupService.getUserCardGroupsObservable().subscribe((res) => {
      if (res) {
        this.userCardGroups = res.user_card_groups;
        this.updateHeader();
      }
    });
  }

  updateHeader() {
    // Get group data
    const userCardGroup = this.userCardGroups.filter(
      (userCardGroup) => userCardGroup.id === this.id
    )[0];

    // Title
    this.items.header.title = userCardGroup.name;

    // Icon
    this.items.header.icon = getIcon(userCardGroup.type);

    // Edit menu
    this.items.header.menu = new Menu({
      items: [
        new MenuItem({
          text: 'Edit',
          icon: Icons.edit,
          route: `/collection/group/edit/${userCardGroup.id}`,
          exactMatch: true,
        }),
      ],
    });
  }

  getUserGroupCards() {
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
