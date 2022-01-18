import { AlertType } from './../../controls/alert/alert';
import { buildUrl } from '@app/models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@app/pages/user/user';
import { Notification, NotificationsService } from '@app/controls';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUserObservable() {
    return this.currentUserSubject.asObservable();
  }
  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService
  ) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.currentUserSubject = new BehaviorSubject<User | null>(
        new User(JSON.parse(currentUser))
      );
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject?.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(buildUrl('login'), { email, password })
      .subscribe((res) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        const user: User = new User({
          ...res.data.user,
          token: res.data.token,
          expires_at: res.data.expires_at,
        });
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        // success notification
        this.notificationService.addNotifications([
          new Notification({
            alertType: AlertType.success,
            message: 'Successfully signed in',
          }),
        ]);
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    if (this.currentUserSubject) {
      this.currentUserSubject?.next(null);
      location.reload();
    }
  }

  register(
    email: string,
    username: string,
    password: string,
    password_confirmation: string
  ) {
    return this.http
      .post<any>(buildUrl('register'), {
        email,
        username,
        password,
        password_confirmation,
      })
      .pipe(
        map((res) => {
          const user: User = new User({
            ...res.data.user,
            token: res.data.token,
          });
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
  }

  forgot(email: string) {
    return this.http.post<any>(buildUrl('forgot-password'), {
      email,
    });
  }

  reset(
    token: string,
    email: string,
    password: string,
    password_confirmation: string
  ) {
    return this.http.post<any>(buildUrl('password-reset'), {
      token,
      email,
      password,
      password_confirmation,
    });
  }
}
