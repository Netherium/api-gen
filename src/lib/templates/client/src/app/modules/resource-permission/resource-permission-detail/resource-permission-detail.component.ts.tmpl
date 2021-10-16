import { Component } from '@angular/core';
import { CRUDAction } from '../../../models/crud-action.model';
import { ResourcePermission } from '../resource-permission.model';
import { HttpGenericService } from '../../../services/http-generic.service';
import { SubscriptionNotificationService } from '../../../services/subscription-notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Role } from '../../role/role.model';
import { debounceTime, distinctUntilChanged, filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-resource-permission-detail',
  templateUrl: './resource-permission-detail.component.html'
})
export class ResourcePermissionDetailComponent {
  action: CRUDAction = CRUDAction.CREATE;
  resourcePermission: ResourcePermission = {
    _id: '',
    resourceName: '',
    methods: []
  };
  isLoading = false;
  roleInputsSubject: Subject<string>[] = [];
  roleInputs: string[] = [];
  filteredRoles: Observable<Role[]>[] = [];
  isLoadingRoles: boolean[] = [];
  selectableChipListRoles = true;
  removableChipListRoles = true;

  // eslint-disable-next-line max-len
  constructor(private httpService: HttpGenericService, private subNotSrv: SubscriptionNotificationService, private router: Router, private activatedRoute: ActivatedRoute) {
    if (this.activatedRoute.snapshot.data.action === CRUDAction.UPDATE) {
      this.resourcePermission = this.activatedRoute.snapshot.data.resourcePermission;
      this.action = CRUDAction.UPDATE;
    }
    for (const [index] of this.resourcePermission.methods.entries()) {
      this.setFilteredObservable(index);
    }
  }

  setFilteredObservable(index: number): void {
    this.roleInputs[index] = '';
    this.roleInputsSubject[index] = new BehaviorSubject<string>(this.roleInputs[index]);
    this.isLoadingRoles[index] = false;
    this.filteredRoles[index] = this.roleInputsSubject[index].pipe(
      filter(term => !!term && typeof term === 'string'),
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => (this.isLoadingRoles[index] = true)),
      switchMap((term: string) => this.httpService.listPaginatedCollection<Role>('roles', null, 0, 5, term)
        .pipe(
          map(data => data.data),
          finalize(() => this.isLoadingRoles[index] = false)
        )
      )
    );
  }

  roleChanged(text: string, index: number): void {
    this.roleInputsSubject[index].next(text);
  }

  roleDisplayFn(role: Role): string {
    if (role) {
      return role.name;
    }
    return null;
  }

  selectedRoles(event: MatAutocompleteSelectedEvent, index: number): void {
    this.resourcePermission.methods[index].roles.push(event.option.value);
    this.roleInputs[index] = '';
    this.roleInputsSubject[index].next(this.roleInputs[index]);
    document.querySelector<HTMLInputElement>(`input[ng-reflect-name="roleInputs[${index}]"]`).value = this.roleInputs[index];
  }

  removeRoles(role: Role, methodIndex: number, entityForm: NgForm): void {
    const index = this.resourcePermission.methods[methodIndex].roles.indexOf(role);
    if (index >= 0) {
      this.resourcePermission.methods[methodIndex].roles.splice(index, 1);
    }
    entityForm.form.markAsDirty();
  }

  addMethods(entityForm: NgForm): void {
    this.resourcePermission.methods.push(
      {
        name: '',
        roles: []
      }
    );
    const index = this.resourcePermission.methods.length - 1;
    this.setFilteredObservable(index);
    entityForm.form.markAsDirty();
  }

  removeMethods(entityForm: NgForm): void {
    this.resourcePermission.methods.pop();
    entityForm.form.markAsDirty();
  }

  save(): void {
    this.isLoading = true;
    let obs: Observable<ResourcePermission | HttpErrorResponse>;
    if (this.action === CRUDAction.CREATE) {
      obs = this.httpService.create<ResourcePermission>('resource-permissions', this.resourcePermission);
    } else {
      obs = this.httpService.update<ResourcePermission>('resource-permissions', this.resourcePermission);
    }
    this.subNotSrv.singleSubscription<ResourcePermission>(obs, this.action, 'ResourcePermission', () => {
      this.isLoading = false;
    }, () => {
      this.router.navigate(['/resource-permissions']).then();
    });
  }

}
