import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CRUDAction } from '../models/crud-action.model';

/**
 * Abstract service that binds an HttpObservable to MatSnackBar notifications
 */
@Injectable({
  providedIn: 'root'
})
export class SubscriptionNotificationService {
  snackbarConfigSuccess: MatSnackBarConfig = {
    duration: 2000,
    panelClass: ['mat-toolbar', 'mat-primary']
  };

  snackbarConfigError: MatSnackBarConfig = {
    duration: 2000,
    panelClass: ['mat-toolbar', 'mat-accent']
  };

  constructor(private snackBar: MatSnackBar) {
  }

  getDisplayAction(action: CRUDAction): string {
    switch (action) {
      case CRUDAction.CREATE:
        return 'Created';
      case CRUDAction.UPDATE:
        return 'Updated';
      case CRUDAction.DELETE:
        return 'Deleted';
    }
  }

  singleSubscription<T extends { _id?: string | number }>
  (obs: Observable<T | HttpErrorResponse>, action: CRUDAction, resourceType: string, cbComplete: any = null, cbSuccess: any = null, cbError: any = null) {
    return obs.subscribe(data => {
      if (cbComplete) {
        cbComplete(data);
      }
      if (data instanceof HttpErrorResponse) {
        this.snackBar.open(`${data.error.message} ${data.error.error ? data.error.error : ''}`, null, this.snackbarConfigError);
        if (cbError) {
          cbError(data);
        }
      } else {
        this.snackBar.open(`${resourceType} ${this.getDisplayAction(action)} ${data.hasOwnProperty('_id') ? data._id : data}`, null, this.snackbarConfigSuccess);
        if (cbSuccess) {
          cbSuccess(data);
        }
      }
    });
  }

  bulkSubscription<T extends { _id?: string | number }>(sources: Observable<T | HttpErrorResponse>[], action: CRUDAction, cbComplete: any = null, cbSuccess: any = null, cbError: any = null) {
    return forkJoin([...sources]).subscribe(data => {
      if (cbComplete) {
        cbComplete(data);
      }
      const foundErrorResponse = data.find((responseItem: HttpErrorResponse) => responseItem instanceof HttpErrorResponse) as HttpErrorResponse;
      if (foundErrorResponse) {
        this.snackBar.open(`${foundErrorResponse.error.message} ${foundErrorResponse.error.error ? foundErrorResponse.error.error : ''}`, null, this.snackbarConfigError);
        if (cbError) {
          cbError(data);
        }
      } else {
        this.snackBar.open(`${this.getDisplayAction(action)} ${sources.length}`, null, this.snackbarConfigSuccess);
        if (cbSuccess) {
          cbSuccess(data);
        }
      }
    });
  }
}
