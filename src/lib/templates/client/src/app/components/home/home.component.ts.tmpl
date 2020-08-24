import { Component } from '@angular/core';
import { HttpGenericService } from '../../services/http-generic.service';
import { User } from '../../modules/user/user.model';
import { Observable } from 'rxjs';
import { PaginatedCollection } from '../../models/paginated-collection.model';
import { Role } from '../../modules/role/role.model';
import { ResourcePermission } from '../../modules/resource-permission/resource-permission.model';
import { MediaObject } from '../../modules/media-object/media-object.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  users$: Observable<PaginatedCollection<User>>;
  roles$: Observable<PaginatedCollection<Role>>;
  resourcePermissions$: Observable<PaginatedCollection<ResourcePermission>>;
  mediaObjects$: Observable<PaginatedCollection<MediaObject>>;
  sortConfig = {
    active: 'createdAt',
    direction: 'desc'
  };

  constructor(private httpService: HttpGenericService) {
    this.users$ = this.httpService.listPaginatedCollection<User>('users', this.sortConfig, 0, 1, '');
    this.roles$ = this.httpService.listPaginatedCollection<Role>('roles', this.sortConfig, 0, 1, '');
    this.resourcePermissions$ = this.httpService.listPaginatedCollection<ResourcePermission>('resource-permissions', this.sortConfig, 0, 1, '');
    this.mediaObjects$ = this.httpService.listPaginatedCollection<MediaObject>('media-objects', this.sortConfig, 0, 1, '');
  }
}
