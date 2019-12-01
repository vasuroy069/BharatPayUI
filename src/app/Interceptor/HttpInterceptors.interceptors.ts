import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AuthService } from '../Services/AuthService.service';
import { catchError, switchMap, filter, take, finalize } from 'rxjs/operators';
import { throwToolbarMixedModesError } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from '../Loader/LoaderService.service';
import Swal from 'sweetalert2';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public auth: AuthService,private loaderService: LoaderService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.loaderService.show();
    //Swal.fire('Hello world!');
    if(this.auth.getToken)
    {
     request=this.addToken(request,this.auth.getToken()) 
    }
    
    return next.handle(request).pipe(catchError(error =>{
      if(error instanceof HttpErrorResponse && error.status===401)
      {
        return this.handle401Error(request,next);
      }
      else 
      {
        console.log("error occurred");
        Swal.fire('Oops...', 'Something went wrong!', 'error')
      }
    }),finalize(()=>this.loaderService.hide()));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
  
      return this.auth.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.jwt);
          return next.handle(this.addToken(request, token.jwt));
        }));
  
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}