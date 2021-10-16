import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor() {
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional code to return as the observable result
   */
  public handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T | HttpErrorResponse> {
    return (error: any): Observable<T | HttpErrorResponse> => {

      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(error);
    };
  }

  /**
   * Handle Pagination Http operation that failed.
   * Return an empty pagination collection
   * @param operation - name of the operation that failed
   * @param result - optional code to return as the observable result
   */
  public handlePaginationError<T>(operation = 'operation', result?: T): () => Observable<T> {
    return (): Observable<T> => {

      console.error(`${operation} failed:`, result);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * Handle Http operation than failed, but also has error.message in body
   * Let the app continue.
   * @param operation - name of the operation that failed
   */
  public handleErrorWithMessage(operation = 'operation'): (error: any) => Observable<HttpErrorResponse> {
    return (error: any): Observable<HttpErrorResponse> => {

      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(error as HttpErrorResponse);
    };
  }
}
