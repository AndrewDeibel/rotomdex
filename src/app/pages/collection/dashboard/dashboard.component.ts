import { Component, OnInit } from '@angular/core';
import { Empty } from '@app/controls';
import { Icons } from '@app/models';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  emptyComingSoon: Empty;
  ngOnInit() {
    this.emptyComingSoon = new Empty({
      text: 'Dashboard Coming Soon...',
      icon: Icons.dashboard,
    });
  }
}
