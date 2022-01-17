import { Component, OnInit, Input } from '@angular/core';
import { FormControlGroup } from './form-group';

@Component({
  selector: 'form-group',
  templateUrl: 'form-group.component.html',
})
export class FormGroupComponent implements OnInit {
  @Input() mbFormGroup: FormControlGroup;

  constructor() {}

  ngOnInit() {}
}
