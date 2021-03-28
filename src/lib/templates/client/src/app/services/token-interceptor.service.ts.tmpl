import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(req: any, next: any): any {
    const authService = this.injector.get(AuthService);
    const tokenizedReq = req.clone({
      setHeaders: authService.getAuthHeaders()
    });
    return next.handle(tokenizedReq);
  }
}
