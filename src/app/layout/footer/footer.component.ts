import { Component, OnInit } from '@angular/core';
import { Menu, MenuItem } from '@app/controls';
import { Icons, Symbols } from '@app/models';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  year: number;
  menuLeft: Menu;
  menuCenter: Menu;

  ngOnInit() {
    this.year = new Date().getFullYear();
    // this.menuLeft = new Menu({
    //   items: [
    //     new MenuItem({
    //       icon: Icons.house,
    //       text: 'Home',
    //       route: '/',
    //       exactMatch: true,
    //     }),
    //     new MenuItem({
    //       icon: Icons.box,
    //       text: 'Expansions',
    //       route: '/expansions',
    //     }),
    //     new MenuItem({
    //       symbol: Symbols.cards,
    //       text: 'Cards',
    //       route: '/cards',
    //     }),
    //     new MenuItem({
    //       symbol: Symbols.pokeball,
    //       text: 'Pokémon',
    //       route: '/pokemon',
    //     }),
    //     new MenuItem({
    //       icon: Icons.archive,
    //       text: 'Collection',
    //       route: '/collection',
    //     }),
    //   ],
    // });
    this.menuCenter = new Menu({
      horizontal: true,
      items: [
        new MenuItem({
          href: 'https://discord.gg/FpPzMD2ZxP',
          text: 'Discord',
          symbol: Symbols.discord,
        }),
        // new MenuItem({
        //   text: 'Patreon',
        //   symbol: Symbols.patreon,
        // }),
        new MenuItem({
          href: 'https://www.youtube.com/channel/UCtaDnvCLnDQeJZjP66et-hQ',
          text: 'YouTube',
          symbol: Symbols.youtube,
        }),
        new MenuItem({
          href: 'https://www.facebook.com/RotomdexSupport/',
          text: 'Facebook',
          symbol: Symbols.facebook,
        }),
        new MenuItem({
          href: 'https://twitter.com/RotomdexSupport',
          text: 'Twitter',
          symbol: Symbols.twitter,
        }),
      ],
    });
  }
}
