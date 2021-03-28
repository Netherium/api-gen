import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CRUDAction } from '../../../models/crud-action.model';
import { Y } from '../y.model';
import { HttpGenericService } from '../../../services/http-generic.service';
import { SubscriptionNotificationService } from '../../../services/subscription-notification.service';
import { Observable, Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatChipInputEvent } from '@angular/material/chips';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-y-detail',
    templateUrl: './y-detail.component.html'
  })
export class YDetailComponent {
  action: CRUDAction = CRUDAction.CREATE;
  y: Y = {
    _id: '',
    tags: [],
    images: [],
    };
  isLoading = false;
  tagsValue = '';

  constructor(private httpService: HttpGenericService, private subNotSrv: SubscriptionNotificationService, private router: Router, private activatedRoute: ActivatedRoute) {
    if (this.activatedRoute.snapshot.data.action === CRUDAction.UPDATE) {
      this.y = this.activatedRoute.snapshot.data.y;
      this.action = CRUDAction.UPDATE;
    }
  }

  addTags(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.y.tags.push((value.trim() as any));
    }
    if (input) {
      input.value = '';
    }
  }

  removeTags(index: number, entityForm: NgForm): void {
    this.y.tags.splice(index, 1);
    entityForm.form.markAsDirty();
  }

  save(): void {
    this.isLoading = true;
    let obs: Observable<Y | HttpErrorResponse>;
    if (this.action === CRUDAction.CREATE) {
      obs = this.httpService.create<Y>('ys', this.y);
    } else {
      obs = this.httpService.update<Y>('ys', this.y);
    }
    this.subNotSrv.singleSubscription<Y>(obs, this.action, 'Y', () => {
      this.isLoading = false;
    }, () => {
      this.router.navigate(['/ys']);
    });
  }
}
