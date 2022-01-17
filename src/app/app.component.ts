import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { DialogService } from '@app/controls/dialog';
import { MenuItem } from '@app/controls/menu';
import { LoaderService } from './controls';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  theme: string = 'dark';
  showMenu: boolean = true;
  loading: boolean = false;
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

  // Close all dialogs when url history/state changes (back button)
  @HostListener('window:popstate', ['$event'])
  onPopState() {
    this.dialogService.closeAll();
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
