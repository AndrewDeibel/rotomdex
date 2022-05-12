import { Component, OnInit } from '@angular/core';
import {
  Button,
  DialogConfig,
  DialogRef,
  Textarea,
  Textbox,
} from '@app/controls';
import { Icons } from '@app/models';
import { NgxCaptureService } from 'ngx-capture';
import { tap } from 'rxjs';
import { Issue } from './issue';
import { ReportIssueService } from './report-issue.service';

@Component({
  selector: 'report-issue-dialog',
  template: `<div
    class="flex vertical gap-1"
    style="width: 400px; max-width: 100%;"
  >
    <div>
      <textbox [textbox]="textboxSubject"></textbox>
    </div>
    <div>
      <app-textarea [textarea]="textareaMessage"></app-textarea>
    </div>
    <div>
      <label class="label">Screenshot</label>
      <app-button [button]="buttonScreenshot" *ngIf="!screenshot"></app-button>
      <div style="max-height: 200px; overflow-y: auto;" class="round">
        <img [src]="screenshot" *ngIf="screenshot" />
      </div>
    </div>
    <hr />
    <div class="flex">
      <div class="box">
        <app-button [button]="buttonCancel"></app-button>
      </div>
      <div>
        <app-button [button]="buttonSubmit"></app-button>
      </div>
    </div>
  </div>`,
})
export class ReportIssueDialogComponent implements OnInit {
  textboxSubject: Textbox;
  textareaMessage: Textarea;
  buttonScreenshot: Button;
  screenshot: string;
  buttonCancel: Button;
  buttonSubmit: Button;

  constructor(
    public config: DialogConfig,
    public dialog: DialogRef,
    private captureService: NgxCaptureService,
    private reportIssueService: ReportIssueService
  ) {}

  ngOnInit(): void {
    this.setupControls();
  }

  setupControls() {
    this.textboxSubject = new Textbox({
      label: 'Subject',
      fullWidth: true,
    });
    this.textareaMessage = new Textarea({
      label: 'Message',
    });
    this.buttonScreenshot = new Button({
      text: 'Take Screenshot',
      icon: Icons.camera,
      click: () => {
        this.buttonScreenshot.text =
          'Please wait, dialog will close and reopen...';
        this.buttonScreenshot.disabled = true;
        setTimeout(() => {
          this.takeScreenshot();
        }, 2000);
      },
    });
    this.buttonCancel = new Button({
      text: 'Cancel',
      classes: 'secondary',
      click: () => this.dialog.close(),
    });
    this.buttonSubmit = new Button({
      text: 'Submit',
      click: () => {
        this.reportIssueService.reportIssue(
          new Issue({
            subject: this.textboxSubject.value,
            message: this.textareaMessage.value,
            screenshot: this.screenshot,
            url: window.location.href,
          }),
          () => {
            this.dialog.close();
          }
        );
      },
    });
  }

  takeScreenshot() {
    this.scrollToTop();
    document.body.classList.add('screenshot-capture');
    setTimeout(() => {
      this.captureService
        .getImage(document.body, true)
        .pipe(
          tap((img) => {
            document.body.classList.remove('screenshot-capture');
            this.screenshot = img;
          })
        )
        .subscribe();
    }, 1000);
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
