import { Tag } from '@app/controls/tag';
import { UserCardsService } from '@app/pages/collection';
import { Textbox } from '@app/controls';
import { Component, OnInit, Input } from '@angular/core';
import { Card, UserCard } from '@app/pages';

@Component({
  selector: 'card-item-list',
  templateUrl: 'card-item-list.component.html',
  styleUrls: ['./card-item-list.component.scss'],
})
export class CardItemListComponent implements OnInit {
  @Input() card: Card;
  imageLoading: boolean = true;
  textbox: Textbox;
  previousValue: number;
  tagRarity: Tag;
  tagNumber: Tag;

  constructor(private userCardsService: UserCardsService) {}

  ngOnInit() {
    this.previousValue = this.card.total_cards_owned;
    this.textbox = new Textbox({
      showPlusMinus: true,
      type: 'number',
      wrapperClasses: 'small',
      value: this.card.total_cards_owned.toString(),
      min: this.card.total_cards_owned,
      classes: 'square',
      blur: (value) => {
        const newValue = Number(value);
        this.textbox.min = newValue;
        if (newValue > this.previousValue) {
          const quantity = newValue - this.previousValue;
          this.addItem(quantity);
        }
      },
    });

    // Rarity
    if (this.card.expansion.name.toLowerCase().includes('promo')) {
      this.tagRarity = new Tag({
        text: 'Promo',
        classes: 'promo card-rarity justify-center',
      });
    } else if (this.card.rarity) {
      this.tagRarity = new Tag({
        text: this.card.rarity,
        classes:
          'card-rarity justify-center ' +
          this.card.rarity.toLowerCase().replace(' ', '-'),
      });
    }

    // Card number
    this.tagNumber = new Tag({
      text: this.card.number,
      classes: 'justify-center',
    });
  }

  addItem(quantity: number) {
    this.userCardsService.addUserCard(
      new UserCard({
        card_id: this.card.id,
        quantity,
      })
    );
  }

  onLoad() {
    this.imageLoading = false;
  }
}
