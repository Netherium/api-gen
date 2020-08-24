import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { HttpGenericService } from '../../services/http-generic.service';
import { SubscriptionNotificationService } from '../../services/subscription-notification.service';
import { Subscription } from 'rxjs';
import { CollectionDataSource } from '../../models/collection-data-source';
import { DynamicCell } from '../../models/dynamic-cell.model';
import { CRUDAction } from '../../models/crud-action.model';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit, OnDestroy {
  @Input() dataSource: CollectionDataSource<any>;
  @Input() columns: DynamicCell[];
  @Input() sort: Sort;
  @Input() resource: string;
  @Input() displayName: string;
  @Input() displayAsDialog = false;
  bulkDeleteSubscription: Subscription;
  selectedColumns: string[];

  constructor(private httpService: HttpGenericService, private subNotSrv: SubscriptionNotificationService, private router: Router) {
  }

  /**
   * Retrieve selected columns from localStorage else
   * Set selectedColumns to the first 3 ('select', '_id', '1st Resource Property') and last one ('edit')
   */
  ngOnInit() {
    const displayStorageSetting = localStorage.getItem(`display_${this.resource}`);
    if (displayStorageSetting) {
      this.selectedColumns = JSON.parse(displayStorageSetting);
      const cmpColumns = this.columns.map(item => item.columnDef);
      this.selectedColumns = this.selectedColumns.filter(selectedColumnName => cmpColumns.includes(selectedColumnName));
    } else {
      this.selectedColumns = this.columns.slice(0, 3).concat(this.columns[this.columns.length - 1]).map(item => item.columnDef);
    }
  }

  /**
   * Click handler for edit
   */
  editDialog(row: any) {
    this.router.navigate([`${(this.resource)}/edit/`, row._id]);
  }

  /**
   * Push multiple sources into RXJS observable for multiple delete of items
   * Trigger a refresh on dataSource
   */
  deleteSelected() {
    const sources = [];
    this.dataSource.selection.selected.forEach(item => {
      sources.push(this.httpService.delete(this.resource, item._id));
    });
    this.bulkDeleteSubscription = this.subNotSrv.bulkSubscription(sources, CRUDAction.DELETE, () => {
      this.dataSource.sortingTrigger(this.dataSource.sort.getValue());
    });
  }

  /**
   * Unsubscribe from all subscriptions
   */
  ngOnDestroy() {
    if (this.bulkDeleteSubscription) {
      this.bulkDeleteSubscription.unsubscribe();
    }
  }

  /**
   * Set selected and store to localStorage
   */
  selectedColumnsChanged(event) {
    this.selectedColumns = event;
    localStorage.setItem(`display_${this.resource}`, JSON.stringify(event));
  }
}
