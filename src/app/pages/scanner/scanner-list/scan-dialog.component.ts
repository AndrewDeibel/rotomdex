import { CustomResultDialogComponent } from './custom-result-dialog.component';
import { DialogService } from './../../../controls/dialog/dialog.service';
import { ScannerService } from '@app/pages/scanner/scanner.service';
import { UserCardGroupService } from './../../collection/user-card-group/user-card-group.services';
import { Card, ScanCard } from '@app/pages';
import { DialogConfig, DialogRef } from '@app/controls/dialog';
import { Component, OnInit } from '@angular/core';
import { Button, Select, SelectOption } from '@app/controls';
import { APIGetPaged, Icons } from '@app/models';
import { ProcessScan } from '..';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'scan-dialog',
  template: `<div style="min-width: 340px; max-width: 100%;" *ngIf="this.card">
    <div class="flex vertical padded">
      <div>
        <app-select [select]="selectResults"></app-select>
        <card-details [card]="this.card"></card-details>
      </div>
      <div></div>
      <div>
        <app-select [select]="selectGroups"></app-select>
      </div>
      <div><hr /></div>
      <div>
        <div class="flex padded">
          <div class="box">
            <app-button [button]="buttonMoveToCollection"></app-button>
          </div>
          <div>
            <app-button [button]="buttonRemove"></app-button>
          </div>
        </div>
      </div>
    </div>
  </div>`,
  styleUrls: ['./scan-dialog.component.scss'],
})
export class ScanDialogComponent implements OnInit {
  selectResults: Select;
  selectGroups: Select;
  buttonMoveToCollection: Button;
  buttonRemove: Button;
  card: Card;
  customResultDialog: DialogRef;
  previousValue: string;
  constructor(
    public config: DialogConfig,
    public dialog: DialogRef,
    private userCardGroupService: UserCardGroupService,
    private scannerService: ScannerService,
    private dialogService: DialogService,
    private router: Router
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
    // Select result
    this.previousValue = this.card.id.toString();
    this.selectResults = new Select({
      classes: 'square-bottom',
      options: [
        // Current card
        new SelectOption({
          text: `${this.card.name} - ${this.card.expansion.name} - ${this.card.number}`,
          value: this.card.id.toString(),
        }),

        // Other cards
        ...(this.card.other_results
          ? this.card.other_results.map(
              (otherCard: Card) =>
                new SelectOption({
                  text: `${otherCard.name} - ${otherCard.expansion.name} - ${otherCard.number}`,
                  value: otherCard.id.toString(),
                })
            )
          : []),

        // No match
        new SelectOption({
          text: 'None of these matched',
          value: 'none',
        }),
      ],
      change: (value) => {
        if (value === 'none') {
          this.customResultDialog = this.dialogService.open(
            CustomResultDialogComponent,
            new DialogConfig({
              title: 'Card Search',
            })
          );
          this.customResultDialog.afterClosed.subscribe((res) => {
            if (res && res.card) {
              this.scannerService.updateScan(
                new ScanCard({
                  scan_id: this.card.scan_id,
                  user_correction_id: res.card.id,
                })
              );
            } else if (this.previousValue) {
              this.selectResults.value = this.previousValue;
            }
          });
        } else {
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
          this.previousValue = value;
        }
      },
    });
    this.selectResults.value = this.card.id.toString();

    // Select group
    this.selectGroups = new Select({
      label: 'Groups',
      multiple: true,
      advancedSelect: true,
      anchor: 'bottom',
      placeholder: 'Select group(s)...',
    });

    // Move to collection
    this.buttonMoveToCollection = new Button({
      text: 'Add to Collection',
      icon: Icons.plus,
      click: () => {
        this.scannerService.processScans([
          new ProcessScan({
            card_groups: this.selectGroups.value
              ? this.selectGroups.value.split(',').map(Number)
              : undefined,
            scan_id: this.card.scan_id,
          }),
        ]);
      },
    });

    // Remove
    this.buttonRemove = new Button({
      icon: Icons.trash,
      text: 'Remove Scan',
      classes: 'error',
      click: () => {
        this.scannerService.updateScan(
          new ScanCard({
            scan_id: this.card.scan_id,
            processed: true,
            user_success: false,
          })
        );
      },
    });

    this.dialog.afterClosed.subscribe(() => {
      this.scannerService.clearUpdateScanObservable();
    });
  }

  setupSubscriptions() {
    // Received card groups
    this.userCardGroupService.getUserCardGroupsObservable().subscribe((res) => {
      if (res) {
        this.selectGroups.options = res?.user_card_groups
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

    // Updated
    this.scannerService.updateScanObservable().subscribe((scan) => {
      if (scan) {
        // Removed
        if (scan.processed) {
          this.dialog.close({ reload: true });
        }
        // Updated
        else if (scan.user_correction) {
          this.card = new Card({
            ...scan.user_correction,
            other_results: this.card.other_results,
            scan_id: this.card.scan_id,
          });
          this.setupControls();
        }
      }
    });

    // Close when route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.dialog.close();
      }
    });
  }
}
