import { UserCardsService } from './user-cards.service';
import { Component, Input, OnInit } from '@angular/core';
import { Icons } from '@app/models';
import { Button, Checkbox, Empty } from '@app/controls';
import { UserCard } from './user-card';

@Component({
  selector: 'user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.scss'],
})
export class UserCardsComponent implements OnInit {
  @Input() card_id: number;
  @Input() userCards: UserCard[] = [];
  buttonAdd: Button;
  checkboxWishList: Checkbox;
  buttonViewAll: Button;
  empty: Empty;
  buttonNotes: Button;
  buttonDelete: Button;

  constructor(private userCardsService: UserCardsService) {}

  ngOnInit(): void {
    this.setupControls();
    this.setupSubscriptions();
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
    });
    this.buttonDelete = new Button({
      icon: Icons.trash,
    });

    // Checkbox wish list
    this.checkboxWishList = new Checkbox({
      text: 'Wishlist',
    });
  }

  setupSubscriptions() {
    this.userCardsService.addUserCardObservable().subscribe((addedCard) => {
      if (addedCard) {
        this.userCards.push(addedCard);
      }
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
