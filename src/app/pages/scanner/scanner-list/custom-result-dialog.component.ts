import { Button } from './../../../controls/button/button';
import { Card } from './../../cards/card/card';
import { CardsService } from './../../cards/cards.service';
import { AlertType } from '@app/controls/alert/alert';
import { Alert } from './../../../controls/alert/alert';
import { Icons } from './../../../models/icons';
import { Textbox } from './../../../controls/textbox/textbox';
import { DialogConfig, DialogRef } from './../../../controls/dialog/dialog';
import { Component, OnInit } from '@angular/core';
import { APIGetPaged } from '@app/models';
@Component({
  selector: 'custom-result-dialog',
  template: `<div class="flex vertical padded">
    <div><alert [alert]="alert"></alert></div>
    <div><textbox [textbox]="textboxSearch"></textbox></div>
    <div>
      <div style="max-height: calc(100vh - 220px); overflow-y: auto;">
        <div class="flex padded">
          <div class="width-3 medium-4 small-6" *ngFor="let card of results">
            <card-item-grid
              [card]="card"
              [hideQuantity]="true"
              (outputClickCard)="clickCard($event)"
            ></card-item-grid>
          </div>
        </div>
      </div>
    </div>
  </div>`,
})
export class CustomResultDialogComponent implements OnInit {
  textboxSearch: Textbox;
  buttonSave: Button;
  alert: Alert;
  results: Card[] = [];

  constructor(
    public config: DialogConfig,
    public dialog: DialogRef,
    private cardsService: CardsService
  ) {}

  ngOnInit(): void {
    this.setupControls();
    this.setupSubscriptions();
  }

  setupControls() {
    this.alert = new Alert({
      icon: Icons.warning,
      type: AlertType.warning,
      message: `No matching result? Search and select the correct card to fix this scan.`,
    });
    this.textboxSearch = new Textbox({
      placeholder: 'Search cards...',
      fullWidth: true,
      icon: Icons.search,
      type: 'search',
      keydownEnter: (value) => {
        this.searchCards(value);
      },
      clickIcon: (value) => {
        this.searchCards(value);
      },
    });
  }

  searchCards(value: string) {
    this.cardsService.getCards(
      new APIGetPaged({
        page: 1,
        page_size: 100,
        query: this.textboxSearch.value,
      })
    );
  }

  setupSubscriptions() {
    this.cardsService.getCardsObservable().subscribe((res) => {
      if (res && res.cards) {
        res.cards.forEach((card) => (card.route = ''));
        this.results = res.cards;
      }
    });
  }

  clickCard(card: Card) {
    this.dialog.close({ card });
  }
}
