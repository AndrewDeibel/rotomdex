import { Component, OnInit, Input } from '@angular/core';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Editor } from './editor';

@Component({
  selector: 'mb-editor',
  templateUrl: 'editor.component.html',
})
export class EditorComponent implements OnInit {
  @Input() editor: Editor;

  //ckEditor = ClassicEditor;

  constructor() {}

  ngOnInit() {}

  onReady(editor: any) {
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
  }
}
