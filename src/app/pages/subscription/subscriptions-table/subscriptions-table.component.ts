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
      id: 'free',
      color: '#3a9c3a',
      price: 'Free',
      features: ['100 Scans/Month', 'Up to 1000 Cards', 'Up to 10 Groups'],
    },
    {
      name: 'Basic',
      id: 'basic',
      color: '#247abb',
      price: '$3.99/month',
      features: [
        '1000 Scans/Month',
        'Unlimited Cards',
        'Unlimited Groups',
        'Collection Dashboard',
      ],
    },
    {
      name: 'Premium',
      id: 'premium',
      color: '#f68603',
      price: '$12.99/month',
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
