import { Icons } from '@app/models';
import { Component, OnInit } from '@angular/core';
import { Empty } from '@app/controls';

@Component({
	selector: 'collection-dashboard',
	templateUrl: 'collection-dashboard.component.html',
	styleUrls: ['./collection-dashboard.component.scss'],
})
export class CollectionDashboardComponent implements OnInit {
	emptyComingSoon: Empty;
	ngOnInit() {
		this.emptyComingSoon = new Empty({
			text: 'Dashboard Coming Soon...',
			icon: Icons.dashboard,
		});
	}
}
