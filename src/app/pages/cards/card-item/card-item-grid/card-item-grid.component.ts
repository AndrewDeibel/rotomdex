import { UserCardsService } from '@app/pages/collection';
// Angular
import { Component, OnInit, Input } from '@angular/core';
import { Textbox } from '@app/controls';
import { UserCard } from '@app/pages';
import { Card } from '../../card/card';

@Component({
  selector: 'card-item-grid',
  templateUrl: 'card-item-grid.component.html',
  styleUrls: ['./card-item-grid.component.scss'],
})
export class CardItemGridComponent implements OnInit {
  @Input() card: Card;
  imageLoading: boolean = true;
  textbox: Textbox;
  previousValue: number;

  constructor(private userCardsService: UserCardsService) {}

  ngOnInit() {
    this.setupControls();
    this.setupSubscriptions();
  }

  setupControls() {
    this.previousValue = this.card.total_cards_owned;
    this.textbox = new Textbox({
      showPlusMinus: true,
      type: 'number',
      wrapperClasses: 'small',
      classes: 'square',
      value: this.card.total_cards_owned.toString(),
      min: this.card.total_cards_owned,
      blur: (value) => {
        const newValue = Number(value);
        if (newValue > this.previousValue) {
          const quantity = newValue - this.previousValue;
          this.addItem(quantity);
        }
      },
    });
  }

  setupSubscriptions() {
    this.userCardsService.addUserCardObservable().subscribe((res) => {
      if (res) {
        this.card.total_cards_owned = this.previousValue + res.quantity;
        this.textbox.min = this.card.total_cards_owned;
      }
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
