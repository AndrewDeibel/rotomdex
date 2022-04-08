import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AlertType,
  Notification,
  Textbox,
  Tag,
  LoaderService,
  NotificationsService,
} from '@app/controls';
import { Size } from '@app/models';
import { UserCard, Card } from '@app/pages';
import { UserCardsService } from '@app/pages/collection';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'card-item-grid',
  templateUrl: 'card-item-grid.component.html',
  styleUrls: ['./card-item-grid.component.scss'],
})
export class CardItemGridComponent implements OnInit {
  @Input() card: Card;
  @Input() hideQuantity: boolean;
  @Output() outputClickCard: EventEmitter<Card> = new EventEmitter();
  imageLoading: boolean = true;
  textbox: Textbox;
  previousValue: number;
  tagRarity: Tag;

  constructor(
    private userCardsService: UserCardsService,
    private loaderService: LoaderService,
    private notificationService: NotificationsService
  ) {}

  ngOnInit() {
    this.setupControls();
  }
  ngOnDestroy() {}

  setupControls() {
    this.previousValue = this.card.total_cards_owned;

    // Collection qty
    this.textbox = new Textbox({
      showPlusMinus: true,
      type: 'number',
      size: Size.small,
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

    // Rarity
    if (this.card.expansion.name.toLowerCase().includes('promo')) {
      this.tagRarity = new Tag({
        classes: 'promo icon-only card-rarity justify-center',
      });
    } else if (this.card.rarity) {
      this.tagRarity = new Tag({
        classes:
          'card-rarity icon-only justify-center ' + this.card.rarity.slug,
      });
    }
  }

  addItem(quantity: number) {
    this.loaderService.addItemLoading('addUserCard');
    this.userCardsService
      .addUserCards(
        new UserCard({
          card_id: this.card.id,
          quantity,
        })
      )
      ?.subscribe((res) => {
        if (res) {
          this.loaderService.clearItemLoading('addUserCard');
          if (res.success) {
            this.notificationService.addNotifications([
              new Notification({
                message: 'Card added to collection',
                alertType: AlertType.success,
              }),
            ]);
            if (this.card.id === res.data[0].card.id) {
              this.card.total_cards_owned++;
              this.textbox.min = this.card.total_cards_owned;
              this.textbox.value = this.card.total_cards_owned.toString();
            }
          }
        }
      });
  }

  onLoad() {
    this.imageLoading = false;
  }

  click() {
    this.outputClickCard.emit(this.card);
  }
}
