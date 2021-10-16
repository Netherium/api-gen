import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CRUDAction } from '../../../models/crud-action.model';
import { Role } from '../role.model';
import { HttpGenericService } from '../../../services/http-generic.service';
import { SubscriptionNotificationService } from '../../../services/subscription-notification.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html'
})
export class RoleDetailComponent {
  action: CRUDAction = CRUDAction.CREATE;
  role: Role = {
    _id: '',
    name: '',
    isAuthenticated: null,
    description: '',
  };
  isLoading = false;

  // eslint-disable-next-line max-len
  constructor(private httpService: HttpGenericService, private subNotSrv: SubscriptionNotificationService, private router: Router, private activatedRoute: ActivatedRoute) {
    if (this.activatedRoute.snapshot.data.action === CRUDAction.UPDATE) {
      this.role = this.activatedRoute.snapshot.data.role;
      this.action = CRUDAction.UPDATE;
    }
  }

  save(): void {
    this.isLoading = true;
    let obs: Observable<Role | HttpErrorResponse>;
    if (this.action === CRUDAction.CREATE) {
      obs = this.httpService.create<Role>('roles', this.role);
    } else {
      obs = this.httpService.update<Role>('roles', this.role);
    }
    this.subNotSrv.singleSubscription<Role>(obs, this.action, 'Role', () => {
      this.isLoading = false;
    }, () => {
      this.router.navigate(['/roles']).then();
    });
  }
}
