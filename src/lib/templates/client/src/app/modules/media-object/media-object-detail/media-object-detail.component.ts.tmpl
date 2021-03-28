import { Component } from '@angular/core';
import { MediaObject } from '../media-object.model';
import { HttpGenericService } from '../../../services/http-generic.service';
import { SubscriptionNotificationService } from '../../../services/subscription-notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CRUDAction } from '../../../models/crud-action.model';

@Component({
  selector: 'app-media-object-detail',
  templateUrl: './media-object-detail.component.html'
})
export class MediaObjectDetailComponent {
  action: CRUDAction = CRUDAction.CREATE;
  isLoading = false;
  mediaObject: MediaObject = null;
  alternativeText = '';
  caption = '';

  // tslint:disable-next-line:max-line-length
  constructor(private httpService: HttpGenericService, private subNotSrv: SubscriptionNotificationService, private router: Router, private activatedRoute: ActivatedRoute) {
    if (this.activatedRoute.snapshot.data.action === CRUDAction.UPDATE) {
      this.mediaObject = this.activatedRoute.snapshot.data.mediaObject;
      this.alternativeText = (this.activatedRoute.snapshot.data.mediaObject as MediaObject).alternativeText;
      this.caption = (this.activatedRoute.snapshot.data.mediaObject as MediaObject).caption;
      this.action = CRUDAction.UPDATE;
    }
  }

  save(): void {
    this.mediaObject = {
      ...this.mediaObject,
      alternativeText: this.alternativeText,
      caption: this.caption,
    };
    this.isLoading = true;
    const obs = this.httpService.update<MediaObject>('media-objects', this.mediaObject);
    this.subNotSrv.singleSubscription<MediaObject>(obs, this.action, 'MediaObject', () => {
      this.isLoading = false;
    }, () => {
      this.router.navigate(['/media-objects']);
    });
  }

}
