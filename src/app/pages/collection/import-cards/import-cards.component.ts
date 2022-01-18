import { Icons } from '@app/models';
import { Component } from '@angular/core';
import { FileUpload, Button } from '@app/controls';

@Component({
  selector: 'import-cards',
  templateUrl: 'import-cards.component.html',
})
export class ImportCardsComponent {
  buttonDownloadTemplate: Button = new Button({
    text: 'Download (.csv)',
    icon: Icons.download,
  });
  fileUploadCards: FileUpload = new FileUpload();
  buttonStartImport: Button = new Button({
    text: 'Start Import',
    icon: Icons.play,
  });
  constructor() {}
}
