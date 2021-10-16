import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { HttpGenericService } from './http-generic.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenericResolverService<T> implements Resolve<T> {

  constructor(private httpService: HttpGenericService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.httpService.show<T>(route.paramMap.get('id'), route.data.resolverData.endpoint)
      .pipe(
        tap(data => {
          if (data instanceof HttpErrorResponse) {
            this.router.navigate(['/404']).then();
            return EMPTY;
          }
          return data;
        })
      );
  }
}
