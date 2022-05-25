import { Component, Input } from '@angular/core';
import { Radio } from './radio';

@Component({
  selector: 'radio',
  template: `<div class="radio">
    <input type="radio" [checked]="radio.selected" />
    <span *ngIf="radio.text" class="text"> {{ radio.text }}</span>
  </div>`,
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent {
  @Input() radio: Radio;
}
