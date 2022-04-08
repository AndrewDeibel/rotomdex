import { AddToCollectionDialogComponent } from './add-to-collection-dialog.component';
import { DialogRef } from './../../../controls/dialog/dialog';
import { Component, OnInit } from '@angular/core';
import { DialogConfig, DialogService } from '@app/controls';
import { Button } from '@app/controls/button';
import { Menu, MenuItem } from '@app/controls/menu';
import { Select } from '@app/controls/select';
import { Textbox } from '@app/controls/textbox';
import {
  ItemGroup,
  ItemsFilter,
  ItemsFooter,
  ItemsHeader,
} from '@app/layout/main';
import { Items } from '@app/layout/main/items/items';
import { APIGetPaged } from '@app/models';
import { Icons } from '@app/models/icons';
import { Card } from '@app/pages/cards/card';
import { ScannerService } from '@app/pages/scanner/scanner.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ScanCard, SetSortByScans } from '..';
import { ScanDialogComponent } from './scan-dialog.component';

@AutoUnsubscribe()
@Component({
  selector: 'scanner-list',
  templateUrl: './scanner-list.component.html',
})
export class ScannerListComponent implements OnInit {
  query: string = '';
  page: number = 1;
  pageSize: number = 12;
  sortBy: string = 'created_date';
  sortDirection: string = 'desc';
  loading: boolean;
  items: Items;
  addToDeckMenuItem: MenuItem;
  scans: ScanCard[] = [];
  dialog: DialogRef;
  dialogMoveAll: DialogRef;

  constructor(
    private scannerService: ScannerService,
    private dialogService: DialogService
  ) {}

  ngOnDestroy() {}
  ngOnInit() {
    this.setupControls();
    this.setupSubscriptions();
  }

  setupControls() {
    // Initialize cards
    this.items = new Items({
      buttonNoResults: new Button({
        text: 'Add Scans',
        icon: Icons.scanner,
        route: '/scanner',
      }),
      header: new ItemsHeader({
        title: 'Scans',
        icon: Icons.scanner,
        menu: new Menu({
          items: [
            new MenuItem({
              text: 'Add Scans',
              icon: Icons.scanner,
              route: '/scanner',
              exactMatch: true,
            }),
            new MenuItem({
              menu: new Menu({
                classes: 'anchor-right',
                items: [
                  new MenuItem({
                    text: 'Add to Collection',
                    icon: Icons.plus,
                    click: () => {
                      this.dialogMoveAll = this.dialogService.open(
                        AddToCollectionDialogComponent,
                        new DialogConfig({
                          title: 'Move All Scans To Collection',
                          overflow: false,
                          data: {
                            totalScans: this.items.footer.totalItems,
                          },
                        })
                      );
                    },
                  }),
                  new MenuItem({
                    text: 'Clear Scans',
                    icon: Icons.close,
                    click: () => {
                      if (
                        confirm(
                          `Are you sure you want to remove all ${this.items.footer.totalItems} scans?`
                        )
                      ) {
                        this.items.header.menu.clearActive();
                        this.scannerService.clearAllScans(() => {
                          this.getScans();
                        });
                      }
                    },
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
      noResults: 'No scans',
      noResultsIcon: Icons.scanner,
    });
    this.items.filter.textboxSearch.placeholder = 'Search scans...';
    SetSortByScans(this.items.filter);
  }

  setupSubscriptions() {
    // Scans
    this.scannerService.getScansObservable().subscribe((res) => {
      if (res && res.scans) {
        this.scans = res.scans;
        this.items.itemGroups = [
          new ItemGroup({
            items: res.scans.map(
              (scanCard) =>
                new Card({
                  ...(scanCard.user_correction
                    ? scanCard.user_correction
                    : scanCard.result),
                  scan: true,
                  other_results: scanCard.other_options,
                  scan_id: scanCard.id,
                })
            ),
          }),
        ];
        this.items.header.subtitle = 'cards: ' + res.total_results;
        this.items.footer.totalPages = res.total_pages;
        this.items.footer.totalItems = res.total_results;
        let price: number = 0;
        this.items.itemGroups[0].items.forEach((card) => {
          if (card.price) {
            price += card.price;
          }
        });
        this.items.header.price = price;
      } else {
        this.items.itemGroups = [];
      }
    });

    // Scans processed
    this.scannerService.processScansObservable().subscribe((scan) => {
      if (scan) {
        if (this.dialog) this.dialog.close();
        this.getScans();
      }
    });

    // All scans processed
    this.scannerService.processAllScansObservable().subscribe((res) => {
      if (res) {
        if (this.dialogMoveAll) this.dialogMoveAll.close();
        this.getScans();
      }
    });
  }

  getScans() {
    this.scannerService.getScans(
      new APIGetPaged({
        page: this.items.footer.page,
        page_size: this.items.footer.pageSize,
        query: this.items.filter.textboxSearch.value,
        sort_by: this.items.filter.selectSortBy.value,
        sort_direction: this.items.filter.selectSortDirection.value,
      })
    );
  }

  clickCard(card: Card) {
    this.dialog = this.dialogService.open(
      ScanDialogComponent,
      new DialogConfig({
        title: 'Edit Scan Result',
        data: {
          card: card,
          scan_id: card.scan_id,
        },
      })
    );
    this.dialog.afterClosed.subscribe((res) => {
      this.getScans();
      this.dialogService.forceCloseAll();
    });
  }
}
