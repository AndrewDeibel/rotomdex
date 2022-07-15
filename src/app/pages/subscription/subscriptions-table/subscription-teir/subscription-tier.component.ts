import { Icons } from './../../../../models/icons';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Button } from '@app/controls';
import { buildUrl } from '@app/models';

@Component({
  selector: 'subscription-tier',
  template: `<div class="subscription-tier">
    <div class="tier-header">
      <fa-icon
        *ngIf="tier.icon"
        [icon]="tier.icon"
        class="tier-icon"
        style="color: {{ tier.color }}"
      ></fa-icon>
      <div class="tier-name">{{ tier.name }}</div>
      <div class="tier-price">
        {{ tier.price }}
      </div>
    </div>
    <div class="tier-features">
      <ul>
        <li *ngFor="let feature of tier.features">
          {{ feature }}
        </li>
      </ul>
    </div>
    <div class="tier-footer">
      <div style="{{ tier.price === 'Free' ? 'visibility: hidden' : '' }}">
        <app-button [button]="buttonTier"></app-button>
      </div>
    </div>
  </div>`,
  styleUrls: ['./subscription-tier.component.scss'],
})
export class SubscriptionTierComponent implements OnInit {
  buttonTier: Button;
  @Input() tier: any;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    const free = this.tier.id === 'free';
    this.buttonTier = new Button({
      text: free ? 'Current Plan' : `Choose ${this.tier.name}`,
      classes: free ? 'secondary' : 'primary',
      click: () => {
        this.chooseTier();
      },
      disabled: free,
      icon: free ? Icons.check : Icons.externalLink,
    });
  }
  chooseTier() {
    this.http
      .post<any>(buildUrl('subscriptions/manage'), { plan: this.tier.id })
      .subscribe((res) => {
        if (res?.data?.url) window.location = res.data.url;
      });
  }
}
