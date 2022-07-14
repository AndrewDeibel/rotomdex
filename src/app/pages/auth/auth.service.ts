import { APIResponse } from './../../models/api';
import { Router } from '@angular/router';
import { AlertType } from './../../controls/alert/alert';
import { buildUrl } from '@app/models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@app/pages/user/user';
import {
  LoaderService,
  Notification,
  NotificationsService,
} from '@app/controls';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  // Current user
  // ====================
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUserObservable() {
    return this.currentUserSubject.asObservable();
  }
  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService,
    private loaderService: LoaderService,
    private router: Router
  ) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.currentUserSubject.next(new User(JSON.parse(currentUser)));
    }
  }
  public get currentUserValue(): User | null {
    return this.currentUserSubject?.value;
  }
  public set currentUserValue(currentUser: User | null) {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      this.currentUserSubject.next(currentUser);
    }
  }

  // Login
  // ====================
  login(email: string, password: string) {
    this.loaderService.addItemLoading('login');
    return this.http
      .post<any>(buildUrl('login'), { email, password })
      .subscribe((res) => {
        this.currentUserValue = new User({
          ...res.data.user,
          token: res.data.token,
          expires_at: res.data.expires_at,
        });
        this.notificationService.addNotifications([
          new Notification({
            alertType: AlertType.success,
            message: 'Successfully signed in',
          }),
        ]);
        this.loaderService.clearItemLoading('login');
      });
  }

  // Logout
  // ====================
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    if (this.currentUserSubject) {
      this.currentUserSubject?.next(null);
      //this.router.navigateByUrl('/');
      document.location = '/';
    }
  }

  // Register
  // ====================
  register(
    //code: string,
    email: string,
    username: string,
    password: string,
    password_confirmation: string
  ) {
    this.loaderService.addItemLoading('register');
    return this.http
      .post<any>(buildUrl('register'), {
        //code,
        email,
        name: username,
        password,
        password_confirmation,
      })
      .subscribe((res) => {
        if (res.success) {
          const user: User = new User({
            ...res.data.user,
            token: res.data.token,
          });
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.loaderService.clearItemLoading('register');
        }
      });
  }

  // Forgot
  // ====================
  forgot(email: string) {
    return this.http.post<any>(buildUrl('forgot-password'), {
      email,
    });
  }

  // Reset
  // ====================
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

  // Change password
  // ====================
  changePassword(
    old_password: string,
    password: string,
    password_confirmation: string
  ) {
    return this.http.post<any>(buildUrl('update-password'), {
      old_password,
      password,
      password_confirmation,
    });
  }

  // Verify
  // ====================
  verify(token: string = '') {
    let query = new HttpParams();
    if (token && token.length) query = query.set('code', token);
    return this.http.get<any>(buildUrl('verify', query.toString()));
  }

  // Update
  // ====================
  private updateUserSubject = new BehaviorSubject<User | null>(null);
  updateUserObservable() {
    this.updateUserSubject = new BehaviorSubject<User | null>(null);
    return this.updateUserSubject.asObservable();
  }
  updateUser(user: User) {
    this.http
      .post<APIResponse>(buildUrl('user-update'), user)
      .subscribe((res) => {
        if (res.success) {
          const updatedUser = new User({
            ...res.data,
            token: this.currentUserValue?.token,
          });
          this.updateUserSubject.next(updatedUser);
          this.currentUserSubject.next(updatedUser);
          this.notificationService.addNotifications([
            new Notification({
              message: 'User updated',
              alertType: AlertType.success,
            }),
          ]);
        }
      });
  }

  // Get
  // ====================
  private getUserSubject = new BehaviorSubject<User | null>(null);
  getUserObservable() {
    this.getUserSubject = new BehaviorSubject<User | null>(null);
    return this.getUserSubject.asObservable();
  }
  getUser() {
    this.http.get<APIResponse>(buildUrl('user')).subscribe((res) => {
      if (res.success) {
        const user = new User({
          ...res.data,
          token: this.currentUserValue?.token,
        });
        this.getUserSubject.next(user);
        this.currentUserSubject.next(user);
      }
    });
  }
}
