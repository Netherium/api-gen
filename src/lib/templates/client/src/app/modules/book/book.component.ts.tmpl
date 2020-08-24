import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { HttpGenericService } from '../../services/http-generic.service';
import { CollectionDataSource } from '../../models/collection-data-source';
import { DynamicCell } from '../../models/dynamic-cell.model';
import { Book } from './book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html'
  })
export class BookComponent {
  resource = 'books';
  displayName = 'Books';
  columns: DynamicCell[] = [
    {header: 'Select', columnDef: 'select', type: 'select'},
    {header: 'Id', columnDef: '_id', type: 'String'},
    {header: 'Title', columnDef: 'title', type: 'String'},
    {header: 'Isbn', columnDef: 'isbn', type: 'Number'},
    {header: 'IsPublished', columnDef: 'isPublished', type: 'Boolean'},
    {header: 'PublishedAt', columnDef: 'publishedAt', type: 'Date'},
    {header: 'Author', columnDef: 'author', type: 'ObjectId', displayProperty: 'email'},
    {header: 'Collaborators', columnDef: 'collaborators', type: 'ObjectId[]', displayProperty: 'email'},
    {header: 'Cover', columnDef: 'cover', type: 'mediaObject'},
    {header: 'Images', columnDef: 'images', type: 'mediaObject[]'},
    {header: 'Tags', columnDef: 'tags', type: 'String[]'},
    {header: 'PagesForReview', columnDef: 'pagesForReview', type: 'Number[]'},
    {header: 'DatesForReview', columnDef: 'datesForReview', type: 'Date[]'},
    {header: 'CreatedAt', columnDef: 'createdAt', type: 'Date'},
    {header: 'UpdatedAt', columnDef: 'updatedAt', type: 'Date'},
    {header: 'Edit', columnDef: 'edit', type: 'edit'}
    ];
  sort: Sort = {
        active: '_id',
        direction: 'asc'
      };
  dataSource = new CollectionDataSource<Book>(this.httpService, this.resource, this.sort, 0, 10, '');

  constructor(private httpService: HttpGenericService) {
  }
}
