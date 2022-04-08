import { Button, DialogConfig, DialogService, Tag } from '@app/controls';
import { Card } from '@app/pages';
import { Component, Input, OnInit } from '@angular/core';
import { CardImageDialogComponent } from '../card-image-dialog.component';
import { AuthenticationService } from '@app/pages/auth';
import { Icons } from '@app/models';

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
  cardImageHover: boolean;
  hasAdminAccess: boolean;
  @Input() linkTitle: boolean;

  constructor(
    private dialogService: DialogService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
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
