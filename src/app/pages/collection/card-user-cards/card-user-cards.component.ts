import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import {
  AlertType,
  Button,
  Checkbox,
  Empty,
  Notification,
  NotificationsService,
  LoaderService,
} from '@app/controls';
import { APIGetPaged, Icons, Size } from '@app/models';
import {
  AuthenticationService,
  WishlistService,
  UserCardGroupService,
  UserCardGroup,
  UserCard,
  UserCardsService,
  FavoritesService,
} from '@app/pages';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Card } from '@app/pages/cards';

@AutoUnsubscribe()
@Component({
  selector: 'card-user-cards',
  templateUrl: './card-user-cards.component.html',
  styleUrls: ['./card-user-cards.component.scss'],
})
export class CardUserCardsComponent implements OnInit {
  @Input() card_id: number;
  @Input() on_wishlist: boolean;
  @Input() is_favorite: boolean;
  @Input() userCards: UserCard[] = [];
  @Input() variations: Card[] = [];
  buttonAdd: Button;
  checkboxWishlist: Checkbox;
  checkboxFavorite: Checkbox;
  buttonViewAll: Button;
  empty: Empty;
  buttonNotes: Button;
  buttonDelete: Button;
  showUserCards: boolean;
  userCardGroups: UserCardGroup[];

  constructor(
    private userCardsService: UserCardsService,
    private userCardGroupService: UserCardGroupService,
    private authenticationService: AuthenticationService,
    private wishlistService: WishlistService,
    private favoritesService: FavoritesService,
    private router: Router,
    private notificationService: NotificationsService,
    private loaderService: LoaderService
  ) {}

  ngOnChange() {
    this.setupControls();
  }
  ngOnDestroy() {}

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
      size: Size.small,
      button: new Button({
        text: 'Add to Collection',
        icon: Icons.plus,
        click: this.authenticationService.currentUserValue
          ? () => {
              this.addItem();
            }
          : () => {
              this.router.navigate(['/signin'], {
                queryParams: {
                  returnUrl: this.router.routerState.snapshot.url,
                },
              });
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
      text: 'Wishlist',
      checked: this.on_wishlist,
      change: (checked) => {
        if (checked) this.wishlistService.addWishlistCard(this.card_id);
        else this.wishlistService.removeWishlistCard(this.card_id);
      },
    });

    // Checkbox favorite
    this.checkboxFavorite = new Checkbox({
      id: 'favorite',
      text: 'Favorite',
      checked: this.is_favorite,
      change: (checked) => {
        if (checked) this.favoritesService.addFavoriteCard(this.card_id);
        else this.favoritesService.removeFavoriteCard(this.card_id);
      },
    });
  }

  setupSubscriptions() {
    // Card update
    this.userCardsService.updateUserCardObservable().subscribe((userCard) => {
      if (userCard)
        this.userCards = this.userCards.map((_userCard) =>
          _userCard.id === userCard.id ? userCard : _userCard
        );
    });

    // Get groups list
    this.userCardGroupService.getUserCardGroupsObservable().subscribe((res) => {
      if (res) {
        this.userCardGroups = res.user_card_groups;
        this.showUserCards = true;
      }
    });
  }

  addItem(
    userCard: UserCard = new UserCard({
      card_id: this.card_id,
    })
  ) {
    this.userCardsService.addUserCards(userCard)?.subscribe((res) => {
      if (res) {
        this.loaderService.clearItemLoading('addUserCard');
        if (res.success) {
          this.notificationService.addNotifications([
            new Notification({
              message: 'Card added to collection',
              alertType: AlertType.success,
            }),
          ]);
          if (this.card_id === res.data[0].card.id) {
            res.data.forEach((userCard: any) => {
              this.userCards.push(new UserCard(userCard));
            });
          }
        }
      }
    });
  }

  deleteItem(userCard: UserCard) {
    this.userCardsService.removeUserCard(userCard).subscribe((res) => {
      if (res.success) {
        this.notificationService.addNotifications([
          new Notification({
            message: 'Card removed from collection',
            alertType: AlertType.success,
          }),
        ]);
        if (userCard) {
          this.userCards = this.userCards.filter(
            (_userCard) => _userCard.id !== userCard.id
          );
        }
      }
    });
  }

  updateItem(userCard: UserCard) {
    this.userCardsService.updateUserCard(userCard);
  }
}
