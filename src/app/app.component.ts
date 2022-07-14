import { Icons } from './models/icons';
import { Button } from './controls/button/button';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { DialogService } from '@app/controls/dialog';
import { MenuItem } from '@app/controls/menu';
import { interval } from 'rxjs';
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
  hasUpdate: boolean;
  buttonUpdate: Button;

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private loaderService: LoaderService,
    private dialogService: DialogService,
    private swUpdate: SwUpdate
  ) {}

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      interval(60000).subscribe(() =>
        this.swUpdate.checkForUpdate().then(() => {
          // Checking for updates
          console.log('checking for updates...');
        })
      );
    }
    this.swUpdate.versionUpdates.subscribe(() => {
      this.buttonUpdate = new Button({
        icon: Icons.sync,
        text: 'Refresh',
        click: () => window.location.reload(),
      });
      this.hasUpdate = true;
    });

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
