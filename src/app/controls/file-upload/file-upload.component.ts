import { Component, Input } from '@angular/core';
import { FileUpload } from './file-upload';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  constructor() {}
  @Input() fileUpload: FileUpload;
}
