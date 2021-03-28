import { Component, Inject } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { CollectionDataSource } from '../../models/collection-data-source';
import { MediaObject } from '../../modules/media-object/media-object.model';
import { HttpGenericService } from '../../services/http-generic.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DynamicCell } from '../../models/dynamic-cell.model';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
})
export class UploadDialogComponent {
  resource = 'media-objects';
  displayName = 'Media Objects';
  columns: DynamicCell[] = [
    {header: 'Select', columnDef: 'select', type: 'select'},
    {header: 'Id', columnDef: '_id', type: 'String'},
    {header: 'Name', columnDef: 'name', type: 'String'},
    {header: 'Url', columnDef: 'url', type: 'mediaObjectUrl'},
    {header: 'AlternativeText', columnDef: 'alternativeText', type: 'String'},
    {header: 'Caption', columnDef: 'caption', type: 'String'},
    {header: 'Width', columnDef: 'width', type: 'Number'},
    {header: 'Height', columnDef: 'height', type: 'Number'},
    {header: 'Hash', columnDef: 'hash', type: 'String'},
    {header: 'Ext', columnDef: 'ext', type: 'String'},
    {header: 'Mime', columnDef: 'mime', type: 'String'},
    {header: 'Size', columnDef: 'size', type: 'Number'},
    {header: 'Path', columnDef: 'path', type: 'String'},
    {header: 'Provider', columnDef: 'provider', type: 'String'},
    {header: 'ProviderMetadata', columnDef: 'providerMetadata', type: 'String'},
    {header: 'CreatedAt', columnDef: 'createdAt', type: 'Date'},
    {header: 'UpdatedAt', columnDef: 'updatedAt', type: 'Date'},
  ];
  sort: Sort = {
    active: '_id',
    direction: 'asc'
  };
  dataSource: CollectionDataSource<MediaObject>;

  constructor(private httpService: HttpGenericService, public dialogRef: MatDialogRef<UploadDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: boolean) {
    this.dataSource = new CollectionDataSource<MediaObject>(this.httpService, this.resource, this.sort, 0, 5, '', this.data);
  }

  saveDialog(): void {
    this.dialogRef.close(this.dataSource.selection.selected);
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }
}
