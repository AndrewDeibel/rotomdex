import { Component, OnInit, Input } from '@angular/core';
import { Form } from './form';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
})
export class FormComponent implements OnInit {
  @Input() appForm: Form;

  constructor() {}

  ngOnInit() {}

  onSubmit(formGroup: UntypedFormGroup) {
    window.alert('Valid: ' + formGroup.valid);
  }
}
