import { AuthenticationService } from '@app/pages/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'hero',
  templateUrl: 'hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  message: string;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
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
