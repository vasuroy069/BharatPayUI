import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, mapTo, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { userServices } from '../Models/userServices.model';

@Injectable()
export class AuthService {
  public getToken(): string {
    return localStorage.getItem('token');
  }

  private readonly AUTH_TOKEN = 'AUTH_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;
  private loggedUserId:string;
  private userServiceList:userServices[];

  constructor(private http: HttpClient) {}

  login(user: { username: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`/login`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user, tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  logout() {
    return this.http.post<any>(`/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getAuthToken();
  }

  refreshToken() {
    return this.http.post<any>(`/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeAuthToken(tokens.authToken);
    }));
  }

  getAuthToken() {
    return localStorage.getItem(this.AUTH_TOKEN);
  }

  private doLoginUser(user: any, tokens: Tokens) {
    this.loggedUser = user.username;
    this.loggedUserId= user.userId;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeAuthToken(jwt: string) {
    localStorage.setItem(this.AUTH_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.AUTH_TOKEN, tokens.authToken);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.AUTH_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  public setUserServiceList(data)
  {
    this.userServiceList=data;
  }

  public getUserServiceList()
  {
   return this.userServiceList;
  }

}

class Tokens{
  authToken:string;
  refreshToken:string;
}