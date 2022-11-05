import { Component, OnInit, Input } from '@angular/core';
import { Form } from './form';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
})
export class FormComponent implements OnInit {
  @Input() appForm: Form;

  constructor() {}

  ngOnInit() {}

  onSubmit(formGroup: FormGroup) {
    window.alert('Valid: ' + formGroup.valid);
  }
}
