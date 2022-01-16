import {
  Component,
  OnInit,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { MenuItem } from '@app/controls/menu';
import { LoaderService } from './controls';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { Dialog } from './controls/dialog/dialog';
import { DialogService } from './controls/dialog/dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  theme: string = 'dark';
  showMenu: boolean = true;
  loading: boolean = false;
  dialog: Dialog;
  menuItemTools: MenuItem;
  transparentHeader: boolean;
  showScrollToTop: boolean;

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private loaderService: LoaderService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    // Loader
    this.loaderService.loading.asObservable().subscribe((loading: boolean) => {
      if (this.loading != loading) {
        this.loading = loading;
        this.cdRef.detectChanges();
      }
    });

    // Dialog
    this.dialogService
      .getDialogObservable()
      .subscribe((dialog: Dialog | null) => {
        if (dialog) {
          this.dialog = dialog;
        }
      });

    // Scroll to top
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      this.scrollToTop();
    });

    // Transparent header
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.transparentHeader = data?.state?.root?.firstChild?.data[
          'transparentHeader'
        ] as boolean;
      }
    });

    // Theme
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('theme');
    body.classList.add('dark');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollToTop =
      document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
  }

  @HostListener('window:popstate', ['$event'])
  onPopState() {
    this.dialog.close();
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
