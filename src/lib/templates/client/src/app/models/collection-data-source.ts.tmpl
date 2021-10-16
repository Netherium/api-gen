import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Sort } from '@angular/material/sort';
import { BehaviorSubject, combineLatest, Observable, timer } from 'rxjs';
import { debounce, distinctUntilChanged, map, share, switchMap, tap } from 'rxjs/operators';
import { HttpGenericService } from '../services/http-generic.service';
import { PaginatedCollection } from './paginated-collection.model';

export class CollectionDataSource<T> extends DataSource<T> {
  sort: BehaviorSubject<Sort>;
  pageNumber: BehaviorSubject<number>;
  pageSize: BehaviorSubject<number>;
  query: BehaviorSubject<string>;
  page$: Observable<PaginatedCollection<T>>;
  data: BehaviorSubject<T[]>;
  selection: SelectionModel<T>;
  isLoading = false;

  // eslint-disable-next-line max-len
  constructor(private httpService: HttpGenericService, resource: string, initialSort: Sort, initialPageNumber: number, initialPageSize: number, initialQuery: string, multipleSelection = true) {
    super();
    this.sort = new BehaviorSubject<Sort>(initialSort);
    this.pageNumber = new BehaviorSubject<number>(initialPageNumber);
    this.pageSize = new BehaviorSubject<number>(initialPageSize);
    this.query = new BehaviorSubject<string>(initialQuery);
    this.data = new BehaviorSubject<T[]>([]);
    this.selection = new SelectionModel<T>(multipleSelection, []);
    const param$ = combineLatest([this.sort, this.pageSize, this.pageNumber, this.query.pipe(
      debounce(x => x !== '' ? timer(200) : timer(0)),
      distinctUntilChanged()
    )]);
    this.page$ = param$.pipe(
      tap(() => {
        this.isLoading = true;
      }),
      // eslint-disable-next-line max-len
      switchMap(([sort, pageSize, pageNumber, query]) => this.httpService.listPaginatedCollection<T>(resource, sort, pageNumber, pageSize, query)),
      tap(() => {
        this.isLoading = false;
      }),
      share()
    );
  }

  paginationTrigger(pageNumberEvent: number, pageSizeEvent: number): void {
    if (this.pageNumber.getValue() !== pageNumberEvent) {
      this.pageNumber.next(pageNumberEvent);
    }
    if (this.pageSize.getValue() !== pageSizeEvent) {
      this.pageSize.next(pageSizeEvent);
    }
  }

  sortingTrigger(sortEvent: Sort): void {
    this.sort.next(sortEvent);
  }

  queryTrigger(query: string): void {
    this.query.next(query);
  }

  connect(): Observable<T[]> {
    return this.page$.pipe(
      map(page => {
          this.selection.clear();
          this.data.next(page.data);
          return page.data;
        }
      )
    );
  }

  disconnect(): void {
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.getValue().length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.data.getValue().forEach(row => this.selection.select(row));
  }

}
