import { AuthenticationService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Alert, AlertType, Button } from '@app/controls';
import { Icons } from '@app/models';
import { Featured } from './featured';
import { FeaturedService } from './featured.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
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
  signupButton: Button = new Button({
    text: 'Sign Up',
    icon: Icons.signIn,
    route: '/signup',
  });
  subscriptionButton: Button = new Button({
    text: 'View Subscription Options',
    icon: Icons.externalLink,
    route: '/profile/subscription',
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

  constructor(
    private featuredService: FeaturedService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.alert = new Alert({
      type: AlertType.warning,
      message:
        '<b>Under Development:</b> Please note that Rotomdex is still under development, you should expect to find some issues.',
    });

    // Featured
    this.featuredService.getFeaturedObservable().subscribe((featured) => {
      if (featured) this.featured = featured;
    });
    this.featuredService.getFeatured();
  }
  ngOnDestroy() {}

  get signedIn(): boolean {
    return this.authenticationService.currentUserValue != null;
  }
}
