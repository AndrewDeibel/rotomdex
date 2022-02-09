import { UserCardsService } from '@app/pages/collection';
// Angular
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Textbox } from '@app/controls';
import { UserCard } from '@app/pages';
import { Card } from '../../card/card';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

@AutoUnsubscribe()
@Component({
  selector: 'card-item-grid',
  templateUrl: 'card-item-grid.component.html',
  styleUrls: ['./card-item-grid.component.scss'],
})
export class CardItemGridComponent implements OnInit {
  @Input() card: Card;
  @Output() outputClickCard: EventEmitter<Card> = new EventEmitter();
  imageLoading: boolean = true;
  textbox: Textbox;
  previousValue: number;
  addUserCardSubscription: Subscription;
  removeUserCardSubscription: Subscription;

  constructor(private userCardsService: UserCardsService) {}

  ngOnInit() {
    this.setupControls();
    this.setupSubscriptions();
  }
  ngOnDestroy() {}

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
        this.previousValue = newValue;
      },
    });
  }

  setupSubscriptions() {
    if (!this.addUserCardSubscription)
      this.addUserCardSubscription = this.userCardsService
        .addUserCardsObservable()
        .subscribe((res) => {
          if (res && this.card.id === res[0].card.id) {
            this.card.total_cards_owned++;
            this.textbox.min = this.card.total_cards_owned;
            this.textbox.value = this.card.total_cards_owned.toString();
          }
        });
    if (!this.removeUserCardSubscription)
      this.removeUserCardSubscription = this.userCardsService
        .removeUserCardObservable()
        .subscribe((res) => {
          if (res && this.card.id === res.card.id) {
            this.card.total_cards_owned--;
            this.textbox.min = this.card.total_cards_owned;
            this.textbox.value = this.card.total_cards_owned.toString();
          }
        });
  }

  addItem(quantity: number) {
    this.userCardsService.addUserCards(
      new UserCard({
        card_id: this.card.id,
        quantity,
      })
    );
  }

  onLoad() {
    this.imageLoading = false;
  }

  click() {
    this.outputClickCard.emit(this.card);
  }
}
