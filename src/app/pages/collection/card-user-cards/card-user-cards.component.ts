import { Component, Input, OnInit } from '@angular/core';
import { Button, Checkbox, Empty } from '@app/controls';
import { APIGetPaged, Icons } from '@app/models';
import {
  AuthenticationService,
  WishlistService,
  UserCardGroupService,
  UserCardGroup,
  UserCard,
  UserCardsService,
} from '@app/pages';

@Component({
  selector: 'card-user-cards',
  templateUrl: './card-user-cards.component.html',
  styleUrls: ['./card-user-cards.component.scss'],
})
export class CardUserCardsComponent implements OnInit {
  @Input() card_id: number;
  @Input() on_wishlist: boolean;
  @Input() userCards: UserCard[] = [];
  buttonAdd: Button;
  checkboxWishlist: Checkbox;
  checkboxFavorite: Checkbox;
  buttonViewAll: Button;
  empty: Empty;
  buttonNotes: Button;
  buttonDelete: Button;
  userCardGroups: UserCardGroup[];

  constructor(
    private userCardsService: UserCardsService,
    private userCardGroupService: UserCardGroupService,
    private authenticationService: AuthenticationService,
    private wishlistService: WishlistService
  ) {}

  ngOnChange() {
    this.setupControls();
  }

  ngOnInit(): void {
    this.setupControls();
    this.setupSubscriptions();

    this.userCardGroupService.getUserCardGroups(
      new APIGetPaged({
        user_id: this.authenticationService.currentUserValue?.id,
        page_size: 100,
      })
    );
  }

  setupControls() {
    this.empty = new Empty({
      text: 'This card is not in your collection',
      icon: Icons.box,
      button: new Button({
        text: 'Add to Collection',
        icon: Icons.plus,
        click: () => {
          this.addItem();
        },
      }),
    });

    // Button add
    this.buttonAdd = new Button({
      text: 'Add to Collection',
      icon: Icons.plus,
      classes: 'secondary',
      click: () => {
        this.addItem();
      },
    });

    // Button view all
    this.buttonViewAll = new Button({
      text: 'View Collection',
      icon: Icons.externalLink,
    });

    // Header buttons for spacing
    this.buttonNotes = new Button({
      text: 'Notes',
      icon: Icons.stickyNote,
    });
    this.buttonDelete = new Button({
      text: 'Remove',
      icon: Icons.trash,
    });

    // Checkbox wish list
    this.checkboxWishlist = new Checkbox({
      id: 'wishlist',
      checked: this.on_wishlist,
      text: 'Wishlist',
      change: (checked) => {
        if (checked) this.wishlistService.addWishlistCard(this.card_id);
        else this.wishlistService.removeWishlistCard(this.card_id);
      },
    });

    // Checkbox favorite
    this.checkboxFavorite = new Checkbox({
      id: 'favorite',
      text: 'Favorite',
    });
  }

  setupSubscriptions() {
    this.userCardsService.addUserCardObservable().subscribe((addedCard) => {
      if (addedCard) this.userCards.push(addedCard);
    });
    this.userCardGroupService.getUserCardGroupsObservable().subscribe((res) => {
      if (res) this.userCardGroups = res.user_card_groups;
    });
  }

  addItem(
    userCard: UserCard = new UserCard({
      card_id: this.card_id,
    })
  ) {
    this.userCardsService.addUserCard(userCard);
  }

  deleteItem(userCard: UserCard) {
    this.userCardsService.removeUserCard(userCard.id).subscribe((res) => {
      if (res.success)
        this.userCards = this.userCards.filter(
          (_userCard) => _userCard.id !== userCard.id
        );
    });
  }

  updateItem(userCard: UserCard) {
    this.userCardsService.updateUserCard(userCard).subscribe((res) => {
      if (res.success)
        this.userCards = this.userCards.map((_userCard) =>
          _userCard.id === userCard.id ? userCard : _userCard
        );
    });
  }
}
