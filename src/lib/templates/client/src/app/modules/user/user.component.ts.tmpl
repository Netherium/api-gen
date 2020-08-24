import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { HttpGenericService } from '../../services/http-generic.service';
import { CollectionDataSource } from '../../models/collection-data-source';
import { DynamicCell } from '../../models/dynamic-cell.model';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent {
  resource = 'users';
  displayName = 'Users';
  columns: DynamicCell[] = [
    {header: 'Select', columnDef: 'select', type: 'select'},
    {header: 'Id', columnDef: '_id', type: 'String'},
    {header: 'Email', columnDef: 'email', type: 'String'},
    {header: 'Name', columnDef: 'name', type: 'String'},
    {header: 'Role', columnDef: 'role', type: 'ObjectId', displayProperty: 'name'},
    {header: 'Display', columnDef: 'display', type: 'mediaObject'},
    {header: 'IsVerified', columnDef: 'isVerified', type: 'Boolean'},
    {header: 'CreatedAt', columnDef: 'createdAt', type: 'Date'},
    {header: 'UpdatedAt', columnDef: 'updatedAt', type: 'Date'},
    {header: 'Edit', columnDef: 'edit', type: 'edit'}
  ];
  sort: Sort = {
    active: '_id',
    direction: 'asc'
  };
  dataSource = new CollectionDataSource<User>(this.httpService, this.resource, this.sort, 0, 10, '');

  constructor(private httpService: HttpGenericService) {
  }
}
