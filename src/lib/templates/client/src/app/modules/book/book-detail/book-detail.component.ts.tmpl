import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CRUDAction } from '../../../models/crud-action.model';
import { Book } from '../book.model';
import { HttpGenericService } from '../../../services/http-generic.service';
import { SubscriptionNotificationService } from '../../../services/subscription-notification.service';
import { Observable, Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { User } from '../../user/user.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { NgForm } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html'
})
export class BookDetailComponent {
  action: CRUDAction = CRUDAction.CREATE;
  book: Book = {
    _id: '',
    title: '',
    isbn: null,
    isPublished: null,
    publishedAt: null,
    author: null,
    collaborators: [],
    cover: null,
    images: [],
    tags: [],
    pagesForReview: [],
    datesForReview: [],
  };
  isLoading = false;
  authorChangedSub: Subject<string> = new Subject<string>();
  filteredAuthor: Observable<User[]>;
  isLoadingAuthor: boolean;
  collaboratorsChangedSub: Subject<string> = new Subject<string>();
  filteredCollaborators: Observable<User[]>;
  isLoadingCollaborators: boolean;
  tagsValue = '';
  pagesForReviewValue = '';
  datesForReviewValue = '';

  // tslint:disable-next-line:max-line-length
  constructor(private httpService: HttpGenericService, private subNotSrv: SubscriptionNotificationService, private router: Router, private activatedRoute: ActivatedRoute) {
    if (this.activatedRoute.snapshot.data.action === CRUDAction.UPDATE) {
      this.book = this.activatedRoute.snapshot.data.book;
      this.action = CRUDAction.UPDATE;
    }

    this.filteredAuthor = this.authorChangedSub.pipe(
      filter(term => !!term && typeof term === 'string'),
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => (this.isLoadingAuthor = true)),
      switchMap((term: string) => this.httpService.listPaginatedCollection<User>('users', null, 0, 5, term)
        .pipe(
          map(data => data.data),
          finalize(() => this.isLoadingAuthor = false)
        )
      )
    );
    this.filteredCollaborators = this.collaboratorsChangedSub.pipe(
      filter(term => !!term && typeof term === 'string'),
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => (this.isLoadingCollaborators = true)),
      switchMap((term: string) => this.httpService.listPaginatedCollection<User>('users', null, 0, 5, term)
        .pipe(
          map(data => data.data),
          finalize(() => this.isLoadingCollaborators = false)
        )
      )
    );
  }

  authorChanged(text: string): void {
    if (text === '') {
      this.book.author = null;
    }
    this.authorChangedSub.next(text);
  }

  authorDisplayFn(user: User): string {
    if (user) {
      return user.email;
    }
    return null;
  }

  dropCollaborators(event: CdkDragDrop<Book['collaborators']>, entityForm: NgForm): void {
    moveItemInArray(this.book.collaborators, event.previousIndex, event.currentIndex);
    entityForm.form.markAsDirty();
  }

  selectedCollaborators(event: MatAutocompleteSelectedEvent): void {
    this.book.collaborators.push(event.option.value);
    document.querySelector<HTMLInputElement>('input[ng-reflect-name="collaborators"]').value = '';
  }

  removeCollaborators(index: number, entityForm: NgForm): void {
    this.book.collaborators.splice(index, 1);
    entityForm.form.markAsDirty();
  }

  collaboratorsChanged(text: string): void {
    this.collaboratorsChangedSub.next(text);
  }

  collaboratorsDisplayFn(user: User): string {
    if (user) {
      return user.email;
    }
    return null;
  }

  dropTags(event: CdkDragDrop<Book['tags']>, entityForm: NgForm): void {
    moveItemInArray(this.book.tags, event.previousIndex, event.currentIndex);
    entityForm.form.markAsDirty();
  }

  addTags(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.book.tags.push((value.trim() as any));
    }
    if (input) {
      input.value = '';
    }
  }

  removeTags(index: number, entityForm: NgForm): void {
    this.book.tags.splice(index, 1);
    entityForm.form.markAsDirty();
  }

  dropPagesForReview(event: CdkDragDrop<Book['pagesForReview']>, entityForm: NgForm): void {
    moveItemInArray(this.book.pagesForReview, event.previousIndex, event.currentIndex);
    entityForm.form.markAsDirty();
  }

  addPagesForReview(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.book.pagesForReview.push((value.trim() as any));
    }
    if (input) {
      input.value = '';
    }
  }

  removePagesForReview(index: number, entityForm: NgForm): void {
    this.book.pagesForReview.splice(index, 1);
    entityForm.form.markAsDirty();
  }

  dropDatesForReview(event: CdkDragDrop<Book['datesForReview']>, entityForm: NgForm): void {
    moveItemInArray(this.book.datesForReview, event.previousIndex, event.currentIndex);
    entityForm.form.markAsDirty();
  }

  addDatesForReview(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.book.datesForReview.push((value.trim() as any));
    }
    if (input) {
      input.value = '';
    }
  }

  removeDatesForReview(index: number, entityForm: NgForm): void {
    this.book.datesForReview.splice(index, 1);
    entityForm.form.markAsDirty();
  }

  blurDatesForReview(event: any): void {
    const input = event.target;
    input.value = '';
  }

  save(): void {
    this.isLoading = true;
    let obs: Observable<Book | HttpErrorResponse>;
    if (this.action === CRUDAction.CREATE) {
      obs = this.httpService.create<Book>('books', this.book);
    } else {
      obs = this.httpService.update<Book>('books', this.book);
    }
    this.subNotSrv.singleSubscription<Book>(obs, this.action, 'Book', () => {
      this.isLoading = false;
    }, () => {
      this.router.navigate(['/books']);
    });
  }
}
