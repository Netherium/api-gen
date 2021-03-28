import { Component, ElementRef, forwardRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaObject } from '../../modules/media-object/media-object.model';
import { HttpGenericService } from '../../services/http-generic.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UploadDialogComponent } from '../../dialogs/upload-dialog/upload-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { CRUDAction } from '../../models/crud-action.model';
import { SubscriptionNotificationService } from '../../services/subscription-notification.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ]
})
export class FileUploadComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @ViewChild('inputFile', {static: true}) inputFile;
  @ViewChild('dropZone', {static: true}) dropZone: ElementRef;
  @ViewChild(MatMenuTrigger) addFileOptionsMenu: MatMenuTrigger;
  @Input() standAlone = false;
  @Input() canAddFiles = true;
  @Input() title: string;
  @Input() multiple = true;
  files: File[] | MediaObject[] | File | MediaObject;
  filesDragged: FileList;
  dropZoneEl: HTMLElement;
  isLoading = false;
  createSubscription: Subscription;
  counter = 0;

  // tslint:disable-next-line:max-line-length
  constructor(private httpService: HttpGenericService, public dialog: MatDialog, private snackBar: MatSnackBar, private subNotSrv: SubscriptionNotificationService) {
    if (this.multiple) {
      this.files = [];
    } else {
      this.files = null;
    }
  }

  ngOnInit(): void {
    this.dropZoneEl = this.dropZone.nativeElement as HTMLElement;
    this.dropZoneEl.addEventListener('dragenter', this.handleDragEnter.bind(this), false);
    this.dropZoneEl.addEventListener('dragleave', this.handleDragLeave.bind(this), false);
    this.dropZoneEl.addEventListener('dragover', this.handleDragOver.bind(this), false);
    this.dropZoneEl.addEventListener('drop', this.handleFileDrop.bind(this), false);
  }

  /**
   *  Handle 'drop' event for multiple and single files
   */
  handleFileDrop(e): void {
    e.stopPropagation();
    e.preventDefault();
    if (this.canAddFiles) {
      this.filesDragged = e.dataTransfer.files;
      if (this.multiple) {
        Array.from(this.filesDragged).forEach(file => {
            (this.files as File[]).push(file);
          }
        );
      } else {
        Array.from(this.filesDragged).forEach(file => {
            this.files = file;
          }
        );
      }
    }
    this.counter = 0;
    this.dropZoneEl.classList.remove('mat-elevation-z4');
  }

  /**
   *  Handle 'dragenter' event
   *  Counter is hack for event bubbling on underlying DOM elements when dragging
   */
  handleDragEnter(e): void {
    e.stopPropagation();
    e.preventDefault();
    this.counter++;
    this.dropZoneEl.classList.add('mat-elevation-z4');
  }

  /**
   *  Handle 'dragleave' event
   *  Remove counter while leave dragging on underlying DOM elements
   */
  handleDragLeave(e): void {
    e.stopPropagation();
    e.preventDefault();
    this.counter--;
    if (this.counter === 0) {
      this.dropZoneEl.classList.remove('mat-elevation-z4');
    }
  }

  /**
   *  Handle 'dragover' event
   */
  handleDragOver(e): void {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }

  /**
   * Hack to trigger native browser file dialog
   */
  triggerNativeFileDialog(): void {
    this.addFileOptionsMenu.closeMenu();
    this.inputFile.nativeElement.click();
  }

  /**
   * Trigger Upload dialog which is a data table of MediaObjects
   */
  triggerMediaObjectsDialog(): void {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      panelClass: 'dialog-full',
      data: this.multiple
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.multiple) {
          this.files = [
            ...(this.files as File[] | MediaObject[]),
            ...result
          ];
        } else {
          if (result instanceof Array && result.length > 0) {
            this.files = result[0];
          }
        }
        this.onChange(this.files);
        this.onTouched();
      }
    });
  }

  /**
   * Handle input from native browser file dialog
   */
  onManualAdd(): void {
    if (this.multiple) {
      if (this.inputFile.nativeElement.files instanceof FileList && this.inputFile.nativeElement.files.length > 0) {
        for (let i = 0; i < this.inputFile.nativeElement.files.length; i++) {
          (this.files as File[] | MediaObject[]).push((this.inputFile.nativeElement.files as FileList).item(i) as any);
        }
      }
    } else {
      if (this.inputFile.nativeElement.files instanceof FileList && this.inputFile.nativeElement.files.length > 0) {
        this.files = this.inputFile.nativeElement.files[0];
      }
    }
    this.onChange(this.files);
    this.onTouched();
  }

  /**
   * Checks if upload button is enabled
   */
  canUpload(): boolean {
    if (this.multiple) {
      // tslint:disable-next-line:no-non-null-assertion
      return (this.files as File[] | MediaObject[]).some(file => (file ! instanceof File));
    } else {
      // tslint:disable-next-line:no-non-null-assertion
      return (this.files !== null) && (this.files ! instanceof File);
    }
  }

  /**
   * Handle upload, when button is pressed
   */
  upload(): void {
    if (this.multiple) {
      const sources = [];
      const fileRefs = [];
      (this.files as File[] | MediaObject[]).forEach((file, fileRef) => {
        if (file instanceof File) {
          const newMediaObject: MediaObject = {_id: ''};
          sources.push(this.httpService.createUpload<MediaObject>('media-objects', newMediaObject, file));
          fileRefs.push(fileRef);
        }
      });
      this.isLoading = true;
      this.createSubscription = this.subNotSrv.bulkSubscription<MediaObject>(sources, CRUDAction.CREATE, () => {
        this.isLoading = false;
      }, (data) => {
        data.forEach((createdFile, createdFileIndex) => {
          this.files[fileRefs[createdFileIndex]] = createdFile;
        });
        this.onChange(this.files);
        this.onTouched();
      });
    } else {
      if (this.files instanceof File) {
        this.isLoading = true;
        const newMediaObject: MediaObject = {_id: ''};
        const obs = this.httpService.createUpload<MediaObject>('media-objects', newMediaObject, this.files);
        this.createSubscription = this.subNotSrv.singleSubscription<MediaObject>(obs, CRUDAction.CREATE, 'MediaObject', () => {
            this.isLoading = false;
          }, (data) => {
            this.files = data;
            if (this.standAlone) {
              this.canAddFiles = false;
            }
            this.onChange(this.files);
            this.onTouched();
          }
        );
      }
    }
  }

  /**
   * Handle remove on mat-chip
   */
  remove(file: File | MediaObject): void {
    if (this.multiple) {
      let index;
      if (file instanceof File) {
        index = (this.files as File[]).indexOf(file);
      } else {
        index = (this.files as MediaObject[]).findIndex((item: MediaObject) => item._id === file._id);
      }
      if (index >= 0) {
        (this.files as File[] | MediaObject[]).splice(index, 1);
        this.inputFile.nativeElement.value = null;
      }
    } else {
      this.files = null;
      if (this.inputFile.nativeElement.files instanceof FileList && this.inputFile.nativeElement.files.length > 0) {
        this.inputFile.nativeElement.value = null;
      }
    }
    this.onChange(this.files);
    this.onTouched();
  }

  /**
   * Dummy function for onChange
   */
  onChange: any = () => {
  }

  /**
   * Dummy function for onTouched
   */
  onTouched: any = () => {
  }

  /**
   *  Register a function onChange
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   *  Register a function onTouched
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * NgModel write values
   */
  writeValue(files: MediaObject[] | MediaObject | null): void {
    if (files) {
      this.files = files;
    } else {
      if (this.multiple) {
        this.files = [];
      } else {
        this.files = null;
      }
    }
  }

  /**
   * OnDestroy unsubscribe subscriptions and remove listeners
   */
  ngOnDestroy(): void {
    if (this.createSubscription) {
      this.createSubscription.unsubscribe();
    }
    this.dropZoneEl.removeEventListener('dragenter', this.handleDragEnter.bind(this), false);
    this.dropZoneEl.removeEventListener('dragleave', this.handleDragLeave.bind(this), false);
    this.dropZoneEl.removeEventListener('dragover', this.handleDragOver.bind(this), false);
    this.dropZoneEl.removeEventListener('drop', this.handleFileDrop.bind(this), false);
  }

}
