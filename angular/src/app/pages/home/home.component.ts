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

@Component({
  selector: 'mb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  alert: Alert;
  expansionLogos: string[] = [
    'https://images.pokemontcg.io/swsh4/logo.png',
    'https://images.pokemontcg.io/swsh35/logo.png',
    'https://images.pokemontcg.io/swsh3/logo.png',
    'https://images.pokemontcg.io/sma/logo.png',
    'https://images.pokemontcg.io/xy12/logo.png',
    'https://images.pokemontcg.io/neo1/logo.png',
    'https://images.pokemontcg.io/base5/logo.png',
    'https://images.pokemontcg.io/sm2/logo.png',
    'https://images.pokemontcg.io/det1/logo.png',
    'https://images.pokemontcg.io/bw9/logo.png',
    'https://images.pokemontcg.io/dp7/logo.png',
    'https://images.pokemontcg.io/ex7/logo.png',
    'https://images.pokemontcg.io/sm12/logo.png',
    'https://images.pokemontcg.io/gym1/logo.png',
    'https://images.pokemontcg.io/xy7/logo.png',
    'https://images.pokemontcg.io/pl3/logo.png',
  ];
  cards: string[] = [
    'https://images.pokemontcg.io/sm9/170_hires.png', // Latias/ios
    'https://images.pokemontcg.io/neo4/107_hires.png', // Shining zard
    'https://images.pokemontcg.io/sm3/150_hires.png', // Rainbow zard
    'https://images.pokemontcg.io/neo1/9_hires.png', // Lugia
    'https://images.pokemontcg.io/base3/9_hires.png', // Kabutops
    'https://images.pokemontcg.io/base5/3_hires.png', // Dark Blastoise
    'https://images.pokemontcg.io/gym2/1_hires.png', // Blain's Arcanine
    'https://images.pokemontcg.io/neo2/13_hires.png', // Umbreaon
    'https://images.pokemontcg.io/ecard3/146_hires.png', // Crystal zard
    'https://images.pokemontcg.io/ecard1/29_hires.png', // Ttar
    'https://images.pokemontcg.io/pop5/17_hires.png', // Umbreaon gold star
    'https://images.pokemontcg.io/basep/11_hires.png', // Evee promo
    'https://images.pokemontcg.io/base1/4_hires.png', // 1st zard
    'https://images.pokemontcg.io/swsh35/74_hires.png', // vmax zard
    'https://images.pokemontcg.io/hgss1/108_hires.png', // Feraligator prime
    'https://images.pokemontcg.io/ex14/99_hires.png', // Alakazam gold star
    'https://images.pokemontcg.io/pl4/97_hires.png', // Gengar lvl x
    'https://images.pokemontcg.io/xy6/75_hires.png', // Rayquaza ex
  ];
  pokemons: string[] = [
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png', // Charizard
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', // Bulbasaur
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png', // Pikachu
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png', // Gengar
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/136.png', // Flareon
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/145.png', // Zapdos
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png', // Dragonite
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png', // Mewtwo
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png', // Mew
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/157.png', // Typhlosion
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/160.png', // Typhlosion
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/243.png', // Raiku
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/245.png', // Suikune
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/248.png', // Tyranitar
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/249.png', // Lugia
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/258.png', // Mudkip
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/373.png', // Salamence
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/384.png', // Rayquaza
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png', // Lucario
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/445.png', // Garchomp
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/727.png', // Incineroar
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/810.png', // Grookie
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/851.png', // Centiskorch
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/887.png', // Dragapult
  ];
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
    text: 'View All Pok??mon',
    icon: Icons.externalLink,
    route: '/pokemon',
  });

  releaseNotes: ReleaseNote[] = [];
  expanions: Expansion[] = [];

  constructor(
    private datePipe: DatePipe,
    private expansionsService: ExpansionsService,
    private releaseNotesService: ReleaseNotesServices,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.alert = new Alert({
      type: AlertType.warning,
      message:
        '<b>Under Development:</b> Please note that Rotom Dex is still under development, you should expect to find some issues.',
    });

    // Release notes
    this.releaseNotesService
      .getReleaseNotesObservable()
      .subscribe((releaseNotes) => {
        this.releaseNotes = releaseNotes;
      });
    this.releaseNotesService.getReleaseNotes();

    // Expansions
    this.expansionsService.getExpansionsObservable().subscribe((series) => {
      if (series && series.length) {
        this.expanions = series[0].expansions;
      }
    });
    this.expansionsService.getExpansions({
      query: '',
      sort_by: 'expansion.release_date',
      sort_direction: 'desc',
    });
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
