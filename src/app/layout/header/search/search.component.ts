import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SearchService } from '@app/services/search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Card } from '@app/pages/cards/card';
import { Menu, MenuItem } from '@app/controls/menu';
import { CardsService } from '@app/services/cards.service';
import { Textbox } from '@app/controls';
import { Icons } from '@app/models';

@Component({
	selector: 'mb-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class SearchComponent implements OnInit {
	query: string = '';
	textbox: Textbox;

	constructor(
		private searchService: SearchService,
		private router: Router,
		private route: ActivatedRoute,
		private cardsService: CardsService
	) {}

	ngOnInit(): void {
		// Get query from route
		this.route.queryParams.subscribe((params) => {
			if (params['quicksearch']) {
				this.query = params['quicksearch'];
			}
		});

		this.textbox = new Textbox({
			placeholder: 'Search Cards...',
			icon: Icons.search,
			classes: 'bg-white color-dark',
			keydownEnter: (value) => {
				this.query = value;
				this.search();
			},
			clickIcon: (value) => {
				this.query = value;
				this.search();
			},
		});
	}

	search() {
		this.router.navigate(['/cards'], {
			queryParams: {
				search: this.query,
			},
		});
	}

	clear(textboxEl: HTMLElement) {
		this.query = '';
		// Set focus
		textboxEl.focus();
	}
}
