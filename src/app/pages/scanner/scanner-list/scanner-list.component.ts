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

  constructor(
    private scannerService: ScannerService,
    private dialogService: DialogService
  ) {}

  ngOnDestroy() {}
  ngOnInit() {
    const addToMenuItem = new MenuItem({
      text: 'Add to...',
      icon: Icons.plus,
      click: () => {
        this.addToDeckMenuItem = new MenuItem({
          text: 'Deck',
          icon: Icons.deck,
          menu: new Menu({
            maxHeight: '320px',
          }),
        });

        const addToBinderMenuItem = new MenuItem({
          text: 'Binder',
          icon: Icons.binders,
          click: () => {},
        });
        addToMenuItem.menu = new Menu({
          classes: 'anchor-right',
          items: [this.addToDeckMenuItem, addToBinderMenuItem],
        });
      },
    });

    // Initialize cards
    this.items = new Items({
      buttonNoResults: new Button({
        text: 'Scan Cards',
        icon: Icons.scanner,
        route: '/scanner',
      }),
      header: new ItemsHeader({
        title: 'Scanner Results',
        icon: Icons.scanner,
        menu: new Menu({
          items: [
            new MenuItem({
              menu: new Menu({
                classes: 'anchor-right',
                items: [
                  addToMenuItem,
                  new MenuItem({
                    text: 'Clear Scans',
                    icon: Icons.close,
                    click: () => {
                      this.items.header.menu.clearActive();
                      // this.items.itemGroups = [];
                      // this.scannerService.clearScans();
                    },
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
      filter: new ItemsFilter({
        textboxSearch: new Textbox({
          icon: Icons.search,
          placeholder: 'Search Scanner Results...',
        }),
        selectSortBy: new Select({
          change: (value) => {
            this.sortBy = value;
          },
        }),
        selectSortDirection: new Select({
          change: (value) => {
            this.sortDirection = value;
          },
        }),
      }),
      footer: new ItemsFooter({
        buttonPrev: new Button({
          click: () => {
            this.page--;
          },
        }),
        buttonNext: new Button({
          click: () => {
            this.page++;
          },
        }),
        selectPageSize: new Select({
          change: (value) => {
            this.pageSize = +value;
          },
        }),
        textboxPage: new Textbox({}),
      }),
    });
    SetSortByScans(this.items.filter);

    // Response from get scans request
    this.scannerService.getScansObservable().subscribe((res) => {
      if (res && res.scans) {
        // res.scans.forEach((scan) => {
        //   this.buildCardMenu(scan.result);
        // });
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

  buildCardMenu(card: Card) {
    const removeMenuItem = new MenuItem({
      icon: Icons.trash,
      text: 'Remove',
      click: (event: Event) => {
        event.stopPropagation();
        // this.scannerService.removeScan(card.tempId);
        // this.items.itemGroups = [
        //   new ItemGroup({
        //     items: this.scannerService.scans,
        //   }),
        // ];
      },
    });

    const cardMenuItem = new MenuItem({
      menu: new Menu({
        classes: 'anchor-bottom anchor-left',
      }),
    });

    cardMenuItem.menu?.items.push(removeMenuItem);
  }

  clickCard(card: Card) {
    this.dialogService.open(
      ScanDialogComponent,
      new DialogConfig({
        title: 'Edit Scan Result',
        data: {
          card: card,
          scan_id: card.scan_id,
        },
      })
    );
  }
}
