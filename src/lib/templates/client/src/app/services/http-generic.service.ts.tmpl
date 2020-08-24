import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ErrorHandlingService } from './error-handling.service';
import { environment } from '../../environments/environment';
import { Collection } from '../models/collection.model';
import { PaginatedCollection } from '../models/paginated-collection.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HttpGenericService {
  private url = `${environment.apiUrl}/`;

  constructor(private http: HttpClient, private errorHandler: ErrorHandlingService) {
  }

  /**
   * GET T[] suggest
   */
  suggest<T>(term: string, endpoint: string): Observable<T[] | HttpErrorResponse> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<T[]>(`${this.url + endpoint}?q=${term}`)
      .pipe(
        tap(t => console.log('service.suggest ' + t.length)),
        catchError(this.errorHandler.handleError('service.suggest', []))
      );
  }

  /**
   * GET PaginatedCollection<T>
   * Returns a PaginatedCollection, transforming data of <T> to a PaginatedCollection<T>
   */
  listPaginatedCollection<T>(endpoint: string, sort: { active: string; direction: string } | null, pageNumber: number, pageSize: number, query: string = ''): Observable<PaginatedCollection<T>> {
    let queryParameters = `_page=${pageNumber + 1}&_limit=${pageSize}`;
    if (sort !== null) {
      if (sort.direction !== '') {
        if (sort.direction === 'desc') {
          queryParameters = `_sort=-${sort.active}&` + queryParameters;
        } else {
          queryParameters = `_sort=${sort.active}&` + queryParameters;
        }
      }
    }

    if (query !== '') {
      queryParameters = `q=${query}&` + queryParameters;
    }
    return this.http.get<PaginatedCollection<T>>(`${this.url + endpoint}?${queryParameters}`)
      .pipe(
        map(data => PaginatedCollection.fromResponse<T>(data, pageNumber, pageSize, query)),
        tap(t => console.log('service.list ' + t.data.length)),
        catchError(this.errorHandler.handlePaginationError<PaginatedCollection<T>>('service.listPaginatedCollection', PaginatedCollection.emptyCollection<T>(pageNumber, pageSize, query)))
      );
  }

  /**
   * GET Collection<T>
   */
  listCollection<T>(endpoint: string): Observable<Collection<T> | HttpErrorResponse> {
    return this.http.get<Collection<T>>(`${this.url + endpoint}`)
      .pipe(
        tap(t => console.log('service.list ' + t.data.length)),
        catchError(this.errorHandler.handleError<Collection<T>>('service.list'))
      );
  }


  /**
   * GET T[]
   */
  list<T>(endpoint: string): Observable<T[] | HttpErrorResponse> {
    return this.http.get<T[]>(`${this.url + endpoint}`)
      .pipe(
        tap(t => console.log('service.list ' + t.length)),
        catchError(this.errorHandler.handleError('service.list', []))
      );
  }

  /**
   * GET T
   */
  show<T>(id: string | number, endpoint: string): Observable<T | HttpErrorResponse> {
    return this.http.get<T>(`${this.url + endpoint}/${id}`).pipe(
      tap((t: T) => console.log(`service.show(${t})`)),
      catchError(this.errorHandler.handleError<T>(`service.show`))
    );
  }

  /**
   * POST T
   */
  create<T>(endpoint: string, model: T): Observable<T | HttpErrorResponse> {
    return this.http.post<T>(`${this.url + endpoint}`, model, httpOptions).pipe(
      tap((t: T) => console.log(`service.create`, t)),
      catchError(this.errorHandler.handleError<T>('service.create'))
    );
  }

  /**
   * PUT T
   */
  update<T extends { _id: string | number }>(endpoint: string, model: T): Observable<T | HttpErrorResponse> {
    return this.http.put(`${this.url + endpoint}/${model._id}`, model, httpOptions).pipe(
      tap((t: T) => console.log(`service.update`, t)),
      catchError(this.errorHandler.handleError<T>('service.update'))
    );
  }

  /**
   * DELETE T
   */
  delete<T>(endpoint: string, id: string | number): Observable<T | HttpErrorResponse> {
    return this.http.delete<T>(`${this.url + endpoint}/${id}`, httpOptions).pipe(
      tap(_ => console.log(`service.delete`, id)),
      catchError(this.errorHandler.handleError<T>('service.delete'))
    );
  }

  createUpload<T>(endpoint: string, model: T, file: Blob): Observable<T | HttpErrorResponse> {
    const formData = new FormData();
    for (const key in model) {
      if (model.hasOwnProperty(key) && typeof model[key] === 'string') {
        formData.append(key, model[key].toString());
      }
    }
    formData.append('file', file);
    return this.http.post<T>(`${this.url + endpoint}`, formData).pipe(
      tap((t: T) => console.log(`service.createUpload`, t)),
      catchError(this.errorHandler.handleError<T>('service.createUpload'))
    );
  }

}
