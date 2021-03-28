import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { HttpGenericService } from '../../services/http-generic.service';
import { CollectionDataSource } from '../../models/collection-data-source';
import { DynamicCell } from '../../models/dynamic-cell.model';
import { Y } from './y.model';

@Component({
  selector: 'app-y',
  templateUrl: './y.component.html'
  })
export class YComponent {
  resource = 'ys';
  displayName = 'Ys';
  columns: DynamicCell[] = [
    {header: 'Select', columnDef: 'select', type: 'select'},
    {header: 'Id', columnDef: '_id', type: 'String'},
    {header: 'Tags', columnDef: 'tags', type: 'String[]'},
    {header: 'Images', columnDef: 'images', type: 'mediaObject[]'},
    {header: 'Edit', columnDef: 'edit', type: 'edit'}
    ];
  sort: Sort = {
        active: '_id',
        direction: 'asc'
      };
  dataSource = new CollectionDataSource<Y>(this.httpService, this.resource, this.sort, 0, 10, '');

  constructor(private httpService: HttpGenericService) {
  }
}
