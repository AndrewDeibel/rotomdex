import {
  Button,
  DialogConfig,
  DialogService,
  Tag,
  Select,
  SelectOption,
  Empty,
} from '@app/controls';
import { Card } from '@app/pages';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CardImageDialogComponent } from '../card-image-dialog.component';
import { AuthenticationService } from '@app/pages/auth';
import { Icons, Size } from '@app/models';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Dark from '@amcharts/amcharts5/themes/Dark';

@Component({
  selector: 'card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {
  @Input() card: Card;

  private root: am5.Root;

  tagRarity: Tag;
  tagArtist: Tag;
  tagNumber: Tag;
  tagShiny: Tag;
  buttonTCGPlayer: Button;
  buttonEbay: Button;
  buttonAdmin: Button;
  selectVariations: Select;
  cardImageHover: boolean;
  hasAdminAccess: boolean;
  @Input() linkTitle: boolean;
  activeVariation?: Card;
  showCardPrices: boolean;
  empty: Empty;

  constructor(
    private dialogService: DialogService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.setupControls();
    this.showCardPrices = this.card.variations.some(
      (variation) => variation.prices.data.length
    );
  }

  ngAfterViewInit() {
    // Prices
    let root = am5.Root.new('chartdiv');
    root.setThemes([am5themes_Dark.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        layout: root.verticalLayout,
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        pinchZoomX: true,
      })
    );

    let _data: any[] = [];
    this.card.variations[0].prices.data.forEach((priceHistory: any) => {
      _data.push({
        category: priceHistory[0],
      });
    });
    this.card.variations.forEach((variation: any) => {
      variation.prices.data.forEach((priceHistory: any) => {
        const category = _data.find(
          (_priceHistory: any) => _priceHistory.category === priceHistory[0]
        );
        category[variation.name] = priceHistory[1];
      });
    });

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        x: -4,
        numberFormatter: am5.NumberFormatter.new(root, {
          numberFormat: '$#,##0.00',
        }),
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: 'category',
        tooltip: am5.Tooltip.new(root, {}),
        y: 4,
      })
    );
    xAxis.data.setAll(_data);

    const seriesColors = [
      '#247abb',
      '#bb6005',
      '#119100',
      '#b11d11',
      '#5d1e89',
      '#e6e6e6',
    ];

    // Create series
    let seriesList: any[] = [];
    this.card.variations.forEach((variation, i) => {
      let variationSeries = am5xy.SmoothedXYLineSeries.new(root, {
        name: variation.name,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: variation.name,
        categoryXField: 'category',
        tooltip: am5.Tooltip.new(root, {
          labelText: '${valueY}',
        }),
        stroke: am5.Color.fromString(seriesColors[i]),
        tension: 0.1,
        fill: am5.Color.fromString(seriesColors[i]),
      });
      variationSeries.fills.template.setAll({
        visible: true,
        fillOpacity: 0.4,
      });
      // variationSeries.bullets.push(function () {
      //   return am5.Bullet.new(root, {
      //     locationY: 0,
      //     sprite: am5.Circle.new(root, {
      //       radius: 3,
      //       stroke: series.get('fill'),
      //       strokeWidth: 1,
      //       fill: series.get('fill'),
      //     }),
      //   });
      // });
      let series = chart.series.push(variationSeries);
      series.data.setAll(_data);
      seriesList.push(series);
    });

    // Add scrollbar
    const priceHistoryRatio = 100 / this.card.variations[0].prices.data.length;
    const dotsShown = 30;
    const priceHistoryStartOffset = (100 - priceHistoryRatio * dotsShown) / 100;
    let scrollbarX = chart.set(
      'scrollbarX',
      am5.Scrollbar.new(root, {
        orientation: 'horizontal',
        y: -2,
        start: priceHistoryStartOffset,
      })
    );

    // Add legend
    let legend = chart.children.push(
      am5.Legend.new(root, {
        layout: am5.GridLayout.new(root, {
          maxColumns: 1,
          fixedWidthGrid: true,
        }),
        width: am5.percent(100),
        centerX: am5.percent(100),
        x: am5.percent(100),
        paddingBottom: 8,
        paddingTop: 8,
      })
    );
    legend.data.setAll(chart.series.values);

    // Add cursor
    let cursor = chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'none',
      })
    );
    cursor.lineY.set('visible', false);

    let delay = 100;
    seriesList.forEach((series, i) => {
      series.appear(1000, i * delay);
    });

    this.root = root;
  }

  setupControls() {
    this.empty = new Empty({
      size: Size.small,
      text: 'No prices available',
      icon: Icons.dollar,
    });

    // Admin button
    this.hasAdminAccess =
      this.authenticationService.currentUserValue?.hasNovaAccess || false;
    if (this.hasAdminAccess) {
      this.buttonAdmin = new Button({
        icon: Icons.signIn,
        text: 'Edit in Admin',
        classes: 'small width-12',
        align: 'left',
        target: '_blank',
        href: this.card.nova_edit_url,
      });
    }

    // Rarity
    if (this.card.expansion.name.toLowerCase().includes('promo')) {
      this.tagRarity = new Tag({
        text: 'Promo',
        classes: 'promo card-rarity',
      });
    } else if (this.card.rarity) {
      this.tagRarity = new Tag({
        text: this.card.rarity.name,
        classes: 'card-rarity ' + this.card.rarity.slug,
      });
    }

    // Artist
    if (this.card.artist)
      this.tagArtist = new Tag({
        classes: 'artist-tag',
        text: this.card.artist,
        icon: Icons.paintBrush,
      });

    // Card number
    this.tagNumber = new Tag({
      text: this.card.number,
    });

    // Shiny
    if (this.card.is_shiny)
      this.tagShiny = new Tag({
        classes: 'shiny-tag',
        text: 'Shiny',
        icon: Icons.stars,
      });

    // Buttons
    if (this.card.tcgplayer_url)
      this.buttonTCGPlayer = new Button({
        icon: Icons.externalLink,
        text: 'TCGPlayer',
        classes: 'small width-12',
        align: 'left',
        href: this.card.tcgplayer_url,
        target: '_blank',
      });
    if (this.card.ebay_url)
      this.buttonEbay = new Button({
        icon: Icons.externalLink,
        text: 'eBay',
        classes: 'small width-12',
        align: 'left',
      });

    // Prices
    this.buttonTCGPlayer.price = this.card.price;
    //this.buttonEbay.price = this.card.last_prices[0].market_price;

    // Variations
    if (this.card.variations.length > 1) {
      this.selectVariations = new Select({
        options: this.card.variations.map(
          (variation) =>
            new SelectOption({
              text: variation.name,
              value: variation.id.toString(),
            })
        ),
        change: (_variation) => {
          this.activeVariation = this.card.variations.find(
            (variation) => variation.id === Number(_variation)
          );
          this.updateVariation();
        },
      });
    }
    this.activeVariation = this.card.variations.find(
      (variation) => variation.default
    );
  }

  updateVariation() {
    if (this.activeVariation) {
      this.buttonTCGPlayer.price = this.activeVariation.price;
      if (this.activeVariation.tcgplayer_url)
        this.buttonTCGPlayer.href = this.activeVariation.tcgplayer_url;
    }
  }

  getTypeImage(type: string) {
    return `/assets/symbols/${type.toLowerCase()}.svg`;
  }

  createDialogCardImage() {
    if (this.card) {
      this.dialogService.open(
        CardImageDialogComponent,
        new DialogConfig({
          title: `${this.card.name} - ${this.card.expansion.name}`,
          data: {
            image: this.card.image_high_res,
            gfx: this.card.gfx,
          },
        })
      );
    }
  }
}
