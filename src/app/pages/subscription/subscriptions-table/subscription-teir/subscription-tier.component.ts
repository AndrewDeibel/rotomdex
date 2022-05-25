import { Component, Input, OnInit } from '@angular/core';
import { Button } from '@app/controls';

@Component({
  selector: 'subscription-tier',
  template: `<div class="subscription-tier">
    <div class="tier-header">
      <fa-icon
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
      <app-button [button]="buttonTier"></app-button>
    </div>
  </div>`,
  styleUrls: ['./subscription-tier.component.scss'],
})
export class SubscriptionTierComponent implements OnInit {
  buttonTier: Button;
  @Input() tier: any;
  ngOnInit(): void {
    this.buttonTier = new Button({
      text: `Choose ${this.tier.name}`,
      classes: 'secondary',
    });
  }
}
