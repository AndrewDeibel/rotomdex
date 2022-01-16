import {
	Component,
	HostListener,
	Input,
	OnInit,
	ViewEncapsulation,
} from '@angular/core';
import { Icons, Symbols } from '@app/models/icons';
import { Menu, MenuItem } from '@app/controls/menu';

import { AuthenticationService } from '@app/services/auth.service';
import { Location } from '@angular/common';
import { User } from '@app/models/user';

@Component({
	selector: 'mb-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
	menu: Menu = new Menu();
	menuBack: Menu = new Menu();
	user: User;
	menuLogin: Menu;
	scrolled: boolean;
	@Input() transparent: boolean;

	constructor(
		private authenticationService: AuthenticationService,
		private location: Location
	) {}

	ngOnInit(): void {
		this.menuLogin = new Menu({
			classes: 'round',
			horizontal: true,
			items: [
				new MenuItem({
					icon: Icons.signIn,
					route: 'signin',
					text: 'Sign In',
				}),
			],
		});

		this.menuBack.items.push(
			new MenuItem({
				text: 'Back',
				icon: Icons.arrowLeft,
				click: () => {
					this.location.back();
				},
			})
		);

		//this.menu.round = false;
		this.menu.clearActiveClickOutside = true;
		this.menu.horizontal = true;
		this.menu.classes = 'medium-12 medium-stacked medium-square';
		this.menu.items.push(
			new MenuItem({
				icon: Icons.box,
				text: 'Expansions',
				route: 'expansions',
				click: () => {
					this.menu.clearActive();
				},
			}),
			new MenuItem({
				symbol: Symbols.cards,
				text: 'Cards',
				route: 'cards',
				click: () => {
					this.menu.clearActive();
				},
			}),
			new MenuItem({
				symbol: Symbols.pokeball,
				text: 'Pokémon',
				route: 'pokemon',
				click: () => {
					this.menu.clearActive();
				},
			}),
			// new MenuItem({
			// 	text: "Collection",
			// 	route: "collection",
			// 	click: () => {
			// 		this.menu.clearActive();
			// 	}
			// }),
			// new MenuItem({
			// 	icon: Icons.scanner,
			// 	text: 'Scanner',
			// 	route: 'scanner',
			// 	click: () => {
			// 		this.menu.clearActive();
			// 	},
			// }),
			new MenuItem({
				icon: Icons.archive,
				text: 'Collection',
				route: 'collection',
				click: () => {
					this.menu.clearActive();
				},
			})
		);
	}

	@HostListener('window:scroll', [])
	onWindowScroll() {
		this.scrolled =
			document.body.scrollTop > 20 ||
			document.documentElement.scrollTop > 20;
	}

	get signedIn(): boolean {
		return this.authenticationService.currentUserValue != null;
	}
}
