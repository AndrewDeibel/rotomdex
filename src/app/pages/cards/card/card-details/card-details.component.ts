import {
  Button,
  DialogConfig,
  DialogService,
  Tag,
  Select,
  SelectOption,
} from '@app/controls';
import { Card } from '@app/pages';
import { Component, Input, OnInit } from '@angular/core';
import { CardImageDialogComponent } from '../card-image-dialog.component';
import { AuthenticationService } from '@app/pages/auth';
import { Icons } from '@app/models';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {
  @Input() card: Card;
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

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Series B',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [180, 480, 770, 90, 1000, 270, 400],
        label: 'Series C',
        yAxisID: 'y-axis-1',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0': {
        position: 'left',
      },
      'y-axis-1': {
        position: 'right',
      },
    },

    plugins: {
      legend: { display: true },
    },
  };

  public lineChartType: ChartType = 'line';

  constructor(
    private dialogService: DialogService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.setupControls();
  }

  setupControls() {
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
    if (this.card.last_prices && this.card.last_prices.length) {
      this.buttonTCGPlayer.price = this.card.last_prices[0].market_price;
      //this.buttonEbay.price = this.card.last_prices[0].market_price;
    }

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
        },
      });
    }
    this.activeVariation = this.card.variations.find(
      (variation) => variation.default
    );
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
