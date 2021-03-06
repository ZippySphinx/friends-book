import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

// We have to use JWT Token for security
@Injectable()
// Using interceptor
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept = (
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> => {
    // Add authorization header with jwt token if available
    let currentUser = this.authenticationService.currentUserValue;

    // Adding Bearer token in header
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
    }

    return next.handle(request);
  };
}
