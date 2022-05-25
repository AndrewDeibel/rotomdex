import { Component, Input, OnInit } from '@angular/core';
import { Radio } from '@app/controls';

@Component({
  selector: 'subscriptions-table',
  template: `<div class="subscriptions-table">
    <subscription-tier
      *ngFor="let tier of tiers"
      [tier]="tier"
    ></subscription-tier>
  </div>`,
  styleUrls: ['./subscriptions-table.component.scss'],
})
export class SubscriptionsTableComponent {
  tiers: any = [
    {
      name: 'Free',
      color: '#3a9c3a',
      icon: 'badge-percent',
      price: 'Free',
      features: ['# Scans Per Month', '# Cards', '# Groups'],
    },
    {
      name: 'Basic',
      color: '#247abb',
      icon: 'list',
      price: '$#/month',
      features: [
        '# Scans Per Month',
        'Unlimited Cards',
        'Unlimited Groups',
        'Collection Dashboard',
      ],
    },
    {
      name: 'Premium',
      color: '#f68603',
      icon: 'star',
      price: '$#/month',
      features: [
        '# Scans Per Month',
        'Unlimited Cards',
        'Unlimited Groups',
        'Collection Dashboard',
      ],
    },
    {
      name: 'Pro',
      color: '#8936b7',
      icon: 'award',
      price: '$#/month',
      features: [
        '# Scans Per Month',
        'Unlimited Cards',
        'Unlimited Groups',
        'Collection Dashboard',
      ],
    },
  ];
}
