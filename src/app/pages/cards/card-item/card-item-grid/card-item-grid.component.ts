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
      type: 'number',
      wrapperClasses: 'small',
      value: this.card.total_cards_owned.toString(),
      min: 0,
      change: (value) => {
        const newValue = Number(value);
        // Prevent decreasing value
        if (newValue < this.previousValue)
          this.textbox.value = this.previousValue.toString();
        else {
          const quantity = newValue - this.previousValue;
          this.addItem(quantity);
        }
      },
    });
  }

  setupSubscriptions() {
    this.userCardsService.addUserCardObservable().subscribe((res) => {
      if (res) {
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
