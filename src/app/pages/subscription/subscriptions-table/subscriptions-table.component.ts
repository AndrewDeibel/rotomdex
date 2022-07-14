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
      features: ['100 Scans/Month', 'Up to 1000 Cards', 'Up to 10 Groups'],
    },
    {
      name: 'Basic',
      color: '#247abb',
      icon: 'list',
      price: '$3/month',
      features: [
        '1000 Scans/Month',
        'Unlimited Cards',
        'Unlimited Groups',
        'Collection Dashboard',
      ],
    },
    {
      name: 'Premium',
      color: '#f68603',
      icon: 'star',
      price: '$5/month',
      features: [
        '3000 Scans/Month',
        'Unlimited Cards',
        'Unlimited Groups',
        'Collection Dashboard',
      ],
    },
    // {
    //   name: 'Pro',
    //   color: '#8936b7',
    //   icon: 'award',
    //   price: '$#/month',
    //   features: [
    //     '# Scans Per Month',
    //     'Unlimited Cards',
    //     'Unlimited Groups',
    //     'Collection Dashboard',
    //   ],
    // },
  ];
}
