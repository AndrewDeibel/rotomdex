import { Component, OnInit } from '@angular/core';
import {
  Alert,
  AlertType,
  Button,
  DialogConfig,
  DialogRef,
  Select,
  SelectOption,
} from '@app/controls';
import { APIGetPaged, Icons } from '@app/models';
import { UserCardGroupService } from '@app/pages';
import { ScannerService } from '@app/pages/scanner/scanner.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'add-to-collection-dialog',
  template: `<div class="flex justify-center">
    <div class="flex padded vertical" style="width: 400px; max-width: 100%;">
      <div><alert [alert]="alertMoveAll"></alert></div>
      <div>
        <app-select [select]="selectGroups"></app-select>
      </div>
      <div>
        <app-button [button]="buttonMoveCards"></app-button>
      </div>
    </div>
  </div>`,
})
export class AddToCollectionDialogComponent implements OnInit {
  selectGroups: Select;
  alertMoveAll: Alert;
  buttonMoveCards: Button;

  constructor(
    public config: DialogConfig,
    public dialog: DialogRef,
    private userCardGroupService: UserCardGroupService,
    private scannerService: ScannerService
  ) {}

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
  ngOnDestroy() {}

  setupControls() {
    this.selectGroups = new Select({
      advancedSelect: true,
      multiple: true,
    });
    this.alertMoveAll = new Alert({
      type: AlertType.warning,
      icon: Icons.warning,
      message: `You are about to move <b>${this.config.data.totalScans}</b> scanned card(s) to your collection. You can also select the group(s) you would like to add them to below.`,
    });
    this.buttonMoveCards = new Button({
      text: `Move ${this.config.data.totalScans} Card(s)`,
      icon: Icons.arrowRight,
      click: () => {
        this.scannerService.processAllScans(
          this.selectGroups.value
            ? this.selectGroups.value.split(',').map(Number)
            : []
        );
      },
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
  }
}
