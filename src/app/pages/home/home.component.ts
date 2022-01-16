import { Featured } from './featured';
import { FeaturedService } from './../../services/featured.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Alert, AlertType, Button, Dialog, DialogService } from '@app/controls';
import { Icons } from '@app/models';
import { ExpansionsService } from '@app/services/expansions.service';
import {
  ReleaseNote,
  ReleaseNotesServices,
} from '@app/services/release-notes.services';
import { Expansion } from '../expansions';
import { Pokemon } from '../pokemons';

@Component({
  selector: 'mb-home',
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

  constructor(
    private datePipe: DatePipe,
    private featuredService: FeaturedService,
    private releaseNotesService: ReleaseNotesServices,
    private dialogService: DialogService
  ) {}

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

  createDialogReleaseNote(releaseNote: ReleaseNote) {
    this.dialogService.setDialog(
      new Dialog({
        title: releaseNote.title,
        content: `
				<p>${releaseNote.content}</p>
				<div class="subheading">v${releaseNote.version} - ${this.datePipe.transform(
          releaseNote.date
        )}</div>`,
      })
    );
  }
}
