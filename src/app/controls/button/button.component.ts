import { Component, Input, OnInit } from '@angular/core';
import { Button } from './button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() button: Button;
  @Input() disabled: boolean;

  constructor() {}

  ngOnInit(): void {}

  click(e: any) {
    if (this.button.click) this.button.click(e);
  }
}
