import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CRUDAction } from '../../../models/crud-action.model';
import { User } from '../user.model';
import { HttpGenericService } from '../../../services/http-generic.service';
import { SubscriptionNotificationService } from '../../../services/subscription-notification.service';
import { Observable, Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { Role } from '../../role/role.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent {
  action: CRUDAction = CRUDAction.CREATE;
  user: User = {
    _id: '',
    email: '',
    password: '',
    name: '',
    role: null,
    display: null,
    isVerified: null,
  };
  isLoading = false;
  roleChangedSub: Subject<string> = new Subject<string>();
  filteredRole: Observable<Role[]>;
  isLoadingRole: boolean;

  // eslint-disable-next-line max-len
  constructor(private httpService: HttpGenericService, private subNotSrv: SubscriptionNotificationService, private router: Router, private activatedRoute: ActivatedRoute) {
    if (this.activatedRoute.snapshot.data.action === CRUDAction.UPDATE) {
      this.user = this.activatedRoute.snapshot.data.user;
      this.action = CRUDAction.UPDATE;
    }

    this.filteredRole = this.roleChangedSub.pipe(
      filter(term => !!term && typeof term === 'string'),
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => (this.isLoadingRole = true)),
      switchMap((term: string) => this.httpService.listPaginatedCollection<Role>('roles', null, 0, 5, term)
        .pipe(
          map(data => data.data),
          finalize(() => this.isLoadingRole = false)
        )
      )
    );
  }

  roleChanged(text: string): void {
    if (text === '') {
      this.user.role = null;
    }
    this.roleChangedSub.next(text);
  }

  roleDisplayFn(role: Role): string {
    if (role) {
      return role.name;
    }
    return null;
  }

  save(): void {
    this.isLoading = true;
    let obs: Observable<User | HttpErrorResponse>;
    if (this.action === CRUDAction.CREATE) {
      obs = this.httpService.create<User>('users', this.user);
    } else {
      obs = this.httpService.update<User>('users', this.user);
    }
    this.subNotSrv.singleSubscription<User>(obs, this.action, 'User', () => {
      this.isLoading = false;
    }, () => {
      this.router.navigate(['/users']).then();
    });
  }
}
