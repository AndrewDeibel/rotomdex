import { ScannerService } from '@app/pages/scanner/scanner.service';
import { UserCardGroupService } from './../../collection/user-card-group/user-card-group.services';
import { Card, ScanCard } from '@app/pages';
import { DialogConfig, DialogRef } from '@app/controls/dialog';
import { Component, OnInit } from '@angular/core';
import { Button, Select, SelectOption } from '@app/controls';
import { APIGetPaged } from '@app/models';
import { ProcessScan } from '..';

@Component({
  selector: 'scan-dialog',
  template: `<div
    class="flex vertical padded"
    style="width: 320px; max-width: 100%;"
    *ngIf="this.card"
  >
    <div class="flex justify-center">
      <div class="card-image {{ this.card.gfx ? 'gfx' : '' }}">
        <img
          src="{{ this.card.image }}"
          class="image-card-image
          border-radius-card shadow transition"
          onerror="this.src='./assets/placeholder.png';"
        />
      </div>
    </div>
    <div>
      <div class="box ellipsis">
        <div class="card-number subheading">
          {{ this.card.number }} -
          {{ this.card.expansion.name }}
        </div>
        <div class="card-name ellipsis">
          {{ this.card.name }}
        </div>
      </div>
    </div>
    <div>
      <hr />
    </div>
    <div>
      <app-select [select]="selectResults"></app-select>
    </div>
    <div>
      <app-select [select]="selectBinder"></app-select>
    </div>
    <div>
      <app-button [button]="buttonMoveToCollection"></app-button>
    </div>
  </div>`,
})
export class ScanDialogComponent implements OnInit {
  selectResults: Select;
  selectBinder: Select;
  buttonMoveToCollection: Button;
  card: Card;
  constructor(
    public config: DialogConfig,
    public dialog: DialogRef,
    private userCardGroupService: UserCardGroupService,
    private scannerService: ScannerService
  ) {
    this.card = this.config.data.card;
  }

  ngOnInit(): void {
    this.setupControls();
    this.setupSubscriptions();
    this.userCardGroupService.getUserCardGroups(
      new APIGetPaged({
        page: 1,
        page_size: 100,
      })
    );
  }

  setupControls() {
    this.selectResults = new Select({
      label: 'Possible Results',
      options: [
        // Current card
        new SelectOption({
          text: `${this.card.name} - ${this.card.expansion.name}`,
          value: this.card.id.toString(),
        }),

        // Other cards
        ...(this.card.other_results
          ? this.card.other_results.map(
              (otherCard: Card) =>
                new SelectOption({
                  text: `${otherCard.name} - ${otherCard.expansion.name}`,
                  value: otherCard.id.toString(),
                })
            )
          : []),

        // No match
        new SelectOption({
          text: 'None of these matched',
        }),
      ],
      change: (value) => {
        const newCard = this.card.other_results.find(
          (card) => card.id.toString() === value
        );
        if (newCard) {
          this.scannerService.updateScan(
            new ScanCard({
              scan_id: this.card.scan_id,
              user_correction_id: newCard.id,
              user_success: false,
            })
          );
        }
      },
    });
    this.selectResults.value = this.card.id.toString();
    this.buttonMoveToCollection = new Button({
      text: 'Move to Collection',
      click: () => {
        this.scannerService.processScans([
          new ProcessScan({
            card_groups: [],
            scan_id: this.card.scan_id,
          }),
        ]);
      },
    });
    this.selectBinder = new Select({
      label: 'Groups',
      multiple: true,
      advancedSelect: true,
      anchor: 'bottom',
      placeholder: 'Select group(s)...',
    });
  }

  setupSubscriptions() {
    // Received card groups
    this.userCardGroupService.getUserCardGroupsObservable().subscribe((res) => {
      if (res) {
        this.selectBinder.options = res?.user_card_groups
          ? res?.user_card_groups.map(
              (group) =>
                new SelectOption({
                  text: group.name,
                  value: group.id.toString(),
                })
            )
          : [];
      }
    });

    // Result updated
    this.scannerService.updateScanObservable().subscribe((card) => {
      if (card) {
        this.card = card;
        this.setupControls();
      }
    });

    // Card processed
    this.scannerService.processScansObservable().subscribe((result) => {
      if (result) {
        window.location.reload();
      }
    });
  }
}
