import { Button } from './../button/button';
import { AuthenticationService } from '@app/pages/auth/auth.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Icons } from '@app/models';

@AutoUnsubscribe()
@Component({
  selector: 'hero',
  templateUrl: 'hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  message: string;
  installButton: Button;

  deferredPrompt: any;
  showButton = false;
  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e: any) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }
  addToHomeScreen() {
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then((choiceResult: any) => {
      // if (choiceResult.outcome === 'accepted') {
      //   console.log('User accepted the A2HS prompt');
      // } else {
      //   console.log('User dismissed the A2HS prompt');
      // }
      this.deferredPrompt = null;
    });
  }

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.installButton = new Button({
      text: 'Download App',
      icon: Icons.download,
      click: () => this.addToHomeScreen(),
    });
    this.authenticationService.currentUserObservable().subscribe((user) => {
      if (user)
        this.message = `Hello ${user.name}, welcome to Rotomdex! Rotomdex is a Pokemon card management app.`;
      else
        this.message =
          'Rotomdex is a Pokemon card management app. Sign up today, and start managing your collection!';
    });
  }
  ngOnDestroy() {}
}
