import { Component, OnInit } from '@angular/core';
import { Alert, AlertType, Button } from '@app/controls';
import { Icons } from '@app/models';
import { Featured } from './featured';
import { FeaturedService } from './featured.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  featured: Featured;
  alert: Alert;
  expansionButton: Button = new Button({
    text: 'View All Expansions',
    icon: Icons.externalLink,
    route: '/expansions',
  });
  cardsButton: Button = new Button({
    text: 'View All Cards',
    icon: Icons.externalLink,
    route: '/cards',
  });
  pokemonButton: Button = new Button({
    text: 'View All Pokémon',
    icon: Icons.externalLink,
    route: '/pokemon',
  });
  collectionButton: Button = new Button({
    text: 'Manage Your Collection',
    icon: Icons.externalLink,
    route: '/collection',
  });

  constructor(private featuredService: FeaturedService) {}

  ngOnInit(): void {
    this.alert = new Alert({
      type: AlertType.warning,
      message:
        '<b>Under Development:</b> Please note that Rotom Dex is still under development, you should expect to find some issues.',
    });

    // Featured
    this.featuredService.getFeaturedObservable().subscribe((featured) => {
      if (featured) this.featured = featured;
    });
    this.featuredService.getFeatured();
  }
}
