import { AddUserCard, UserCardsService } from './card-collection.service';
import { Component, Input, OnInit } from '@angular/core';
import { GUID } from '@app/helpers';
import { Condition, Icons, Printings } from '@app/models';
import { Button } from '../../controls/button';
import { Checkbox } from '../../controls/checkbox';
import { Empty } from '../../controls/empty';
import { CardCollectionItem } from './card-collection-item';

@Component({
  selector: 'mb-card-collection',
  templateUrl: './card-collection.component.html',
  styleUrls: ['./card-collection.component.scss'],
})
export class CardCollectionComponent implements OnInit {
  @Input() card_id: number;
  @Input() userCards: CardCollectionItem[] = [];
  buttonAdd: Button;
  checkboxWishList: Checkbox;
  buttonViewAll: Button;
  empty: Empty;
  buttonNotes: Button;
  buttonDelete: Button;

  constructor(private cardCollectionService: UserCardsService) {}

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
    this.cardCollectionService
      .addUserCardObservable()
      .subscribe((addedCard) => {
        if (addedCard) {
          this.userCards.push(addedCard);
        }
      });
  }

  addItem(
    userCard: CardCollectionItem = new CardCollectionItem({
      card_id: this.card_id,
    })
  ) {
    this.cardCollectionService.addUserCard(userCard);
  }

  deleteItem(userCard: CardCollectionItem) {
    this.cardCollectionService.removeUserCard(userCard.id).subscribe((res) => {
      if (res.success)
        this.userCards = this.userCards.filter(
          (_userCard) => _userCard.id !== userCard.id
        );
    });
  }

  updateItem(userCard: CardCollectionItem) {
    this.cardCollectionService.updateUserCard(userCard).subscribe((res) => {
      if (res.success)
        this.userCards = this.userCards.map((_userCard) =>
          _userCard.id === userCard.id ? userCard : _userCard
        );
    });
  }
}
