import pluralize from 'pluralize';
import { getDisplayProperty } from '../../helpers/client-utility-functions';
import { kebabCase, pascalCase } from '../../helpers/string-functions';
import { UIEntity } from '../../interfaces/ui-entity.model';
import { UINestedField } from '../../interfaces/ui-nested-field.model';

/* eslint-disable max-len */
const inputStringFragment = (entityName: string, field: string, pascalCaseField: string, isRequired: boolean): string => {
  return `
          <mat-form-field class="w-100">
            <mat-label>${pascalCaseField}</mat-label>
            <input matInput [(ngModel)]="${entityName}.${field}" name="${field}" autocomplete="off" ${isRequired ? 'required' : ''}>
            <mat-icon matSuffix>text_fields</mat-icon>
          </mat-form-field>`;
}

const inputNumberFragment = (entityName: string, field: string, pascalCaseField: string, isRequired: boolean): string => {
  return `
          <mat-form-field class="w-100">
            <mat-label>${pascalCaseField}</mat-label>
            <input matInput [(ngModel)]="${entityName}.${field}" name="${field}" type="number" autocomplete="off" ${isRequired ? 'required' : ''}>
            <mat-icon matSuffix svgIcon="neth:numeric"></mat-icon>
          </mat-form-field>`;
}

const inputDateFragment = (entityName: string, field: string, pascalCaseField: string, dateId: number, isRequired: boolean): string => {
  return `
          <mat-form-field class="w-100">
            <mat-label>${pascalCaseField}</mat-label>
            <input matInput [(ngModel)]="${entityName}.${field}" [matDatepicker]="picker${dateId}"
                   name="${field}" autocomplete="off" ${isRequired ? 'required' : ''}>
            <mat-datepicker-toggle [for]="picker${dateId}" matSuffix></mat-datepicker-toggle>
            <mat-datepicker #picker${dateId}></mat-datepicker>
          </mat-form-field>`;
}

const inputBooleanFragment = (entityName: string, field: string, pascalCaseField: string): string => {
  return `
          <div class="w-100 mb-3">
            <mat-label class="mat-label-toggle">${pascalCaseField}</mat-label>
            <mat-slide-toggle [(ngModel)]="${entityName}.${field}" name="${field}"></mat-slide-toggle>
          </div>`
}

const inputObjectFragment = (entityName: string, field: string, pascalCaseField: string, displayProperty: string, isRequired: boolean): string => {
  return `
          <mat-form-field class="w-100">
            <mat-label>${pascalCaseField}</mat-label>
            <input matInput [(ngModel)]="${entityName}.${field}" (ngModelChange)="${field}Changed($event)"
                   [matAutocomplete]="${field}Auto" name="${field}" autocomplete="off" isSelectedObject ${isRequired ? 'required' : ''}>
            <mat-icon matSuffix svgIcon="neth:hexagon" *ngIf="!isLoading${pascalCaseField}"></mat-icon>
            <mat-spinner *ngIf="isLoading${pascalCaseField}" diameter="20" matSuffix></mat-spinner>
            <mat-autocomplete #${field}Auto="matAutocomplete" [displayWith]="${field}DisplayFn">
              <mat-option *ngFor="let item of filtered${pascalCaseField} | async" [value]="item">
                {{item.${displayProperty}}}
              </mat-option>
            </mat-autocomplete>
          </mat-form-field>`;
}

const inputMediaObjectFragment = (entityName: string, field: string, pascalCaseField: string): string => {
  return `
          <app-file-upload [(ngModel)]="${entityName}.${field}" name="${field}" [title]="'${pascalCaseField}'" [multiple]="false"></app-file-upload>`;
}

const inputArrayStringFragment = (entityName: string, field: string, pascalCaseField: string): string => {
  return `
          <mat-form-field class="w-100">
            <mat-label>${pascalCaseField}&nbsp;<mat-icon svgIcon="neth:tags-multiple-outline"></mat-icon></mat-label>
            <mat-chip-list #${field}ChipList cdkDropList cdkDropListOrientation="horizontal" (cdkDropListDropped)="drop${pascalCaseField}($event, entityForm)">
              <mat-chip *ngFor="let item of ${entityName}.${field}; index as ${field}Index" [selectable]="true" [removable]="true"
                        (removed)="remove${pascalCaseField}(${field}Index, entityForm)" cdkDrag>
                {{item}}
                <mat-icon matChipRemove>cancel</mat-icon>
              </mat-chip>
              <input matInput [(ngModel)]="${field}Value" [matChipInputFor]="${field}ChipList"
                     (matChipInputTokenEnd)="add${pascalCaseField}($event)" name="${field}" autocomplete="off">
            </mat-chip-list>
          </mat-form-field>`
}

const inputArrayNumberFragment = (entityName: string, field: string, pascalCaseField: string): string => {
  return `
          <mat-form-field class="w-100">
            <mat-label>${pascalCaseField}&nbsp;<mat-icon svgIcon="neth:tags-multiple-outline"></mat-icon></mat-label>
            <mat-chip-list #${field}ChipList cdkDropList cdkDropListOrientation="horizontal" (cdkDropListDropped)="drop${pascalCaseField}($event, entityForm)">
              <mat-chip *ngFor="let item of ${entityName}.${field}; index as ${field}Index" [selectable]="true" [removable]="true"
                        (removed)="remove${pascalCaseField}(${field}Index, entityForm)" cdkDrag>
                {{item}}
                <mat-icon matChipRemove>cancel</mat-icon>
              </mat-chip>
              <input matInput [(ngModel)]="${field}Value" [matChipInputFor]="${field}ChipList"
                     (matChipInputTokenEnd)="add${pascalCaseField}($event)" name="${field}" type="number" autocomplete="off">
            </mat-chip-list>
          </mat-form-field>`
}

const inputArrayDateFragment = (entityName: string, field: string, pascalCaseField: string, dateId: number): string => {
  return `
          <mat-form-field class="w-100">
            <mat-label>${pascalCaseField}&nbsp;<mat-icon svgIcon="neth:tags-multiple-outline"></mat-icon></mat-label>
            <mat-chip-list #${field}ChipList cdkDropList cdkDropListOrientation="horizontal" (cdkDropListDropped)="drop${pascalCaseField}($event, entityForm)">
              <mat-chip *ngFor="let item of ${entityName}.${field}; index as ${field}Index" [selectable]="true" [removable]="true"
                        (removed)="remove${pascalCaseField}(${field}Index, entityForm)" cdkDrag>
                {{item | date}}
                <mat-icon matChipRemove>cancel</mat-icon>
              </mat-chip>
              <input matInput [(ngModel)]="${field}Value" [matChipInputFor]="${field}ChipList"
                     (matChipInputTokenEnd)="add${pascalCaseField}($event)" [matDatepicker]="picker${dateId}"
                     name="${field}" autocomplete="off" (blur)="blur${pascalCaseField}($event)">
              <mat-datepicker-toggle [for]="picker${dateId}" matSuffix></mat-datepicker-toggle>
              <mat-datepicker #picker${dateId}></mat-datepicker>
            </mat-chip-list>
          </mat-form-field>`;
}

const inputArrayMediaObjectFragment = (entityName: string, field: string, pascalCaseField: string): string => {
  return `
          <app-file-upload [(ngModel)]="${entityName}.${field}" name="${field}" [title]="'${pascalCaseField}'" [multiple]="true"></app-file-upload>`;
}

const inputArrayObjectFragment = (entityName: string, field: string, pascalCaseField: string, displayProperty: string): string => {
  return `
          <mat-form-field class="w-100">
            <mat-label>${pascalCaseField}</mat-label>
            <mat-chip-list #${field}ChipList cdkDropList cdkDropListOrientation="horizontal" (cdkDropListDropped)="drop${pascalCaseField}($event, entityForm)">
              <mat-chip *ngFor="let item of ${entityName}.${field}; index as ${field}Index" [selectable]="true"
                        [removable]="true" (removed)="remove${pascalCaseField}(${field}Index, entityForm)" cdkDrag>
                {{item.${displayProperty}}}
                <mat-icon matChipRemove>cancel</mat-icon>
              </mat-chip>
              <input matInput #${field} [ngModel]="${entityName}.${field}" (ngModelChange)="${field}Changed($event)"
                     [matChipInputFor]="${field}ChipList" [matAutocomplete]="${field}Auto"
                     name="${field}" autocomplete="off">
              <mat-icon matSuffix svgIcon="neth:hexagon-multiple" *ngIf="!isLoading${pascalCaseField}"></mat-icon>
              <mat-spinner *ngIf="isLoading${pascalCaseField}" diameter="20" matSuffix></mat-spinner>
              <mat-autocomplete #${field}Auto="matAutocomplete" [displayWith]="${field}DisplayFn"
                                (optionSelected)="selected${pascalCaseField}($event, ${field})">
                <mat-option *ngFor="let item of filtered${pascalCaseField} | async" [value]="item">
                  {{item.${displayProperty}}}
                </mat-option>
              </mat-autocomplete>
            </mat-chip-list>
          </mat-form-field>`;
}

const dialogComponentHtmlDFragment = (plainTypesFragment: string, complexTypesFragment: string, entityName: string): string => {
  return `<mat-card class="m-2 m-md-3 mat-elevation-z4">
  <mat-card-header>
    <mat-card-title>{{action === 1 ? 'Update' : 'Create'}} ${pascalCase(entityName)}
      <span class="ml-1 mat-caption" *ngIf="action===1">{{${entityName}._id}}</span>
    </mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <form #entityForm="ngForm" id="entityForm" novalidate>
      <div class="d-flex flex-wrap">
        <div class="col-12 col-md-7">${plainTypesFragment}
        </div>
        <div class="col-12 col-md-5">${complexTypesFragment}
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <a [routerLink]="['/${kebabCase(pluralize(entityName))}']"  class="mr-3" color="accent" mat-raised-button>Cancel</a>
        <ng-container>
          <button (click)="save()" *ngIf="!isLoading; else loadingButton" [disabled]="entityForm.invalid || entityForm.pristine"
                  color="primary" mat-raised-button>Save
          </button>
          <ng-template #loadingButton>
            <button color="accent" disabled mat-raised-button>
              <mat-spinner class="m-2" diameter="20"></mat-spinner>
            </button>
          </ng-template>
        </ng-container>
      </div>
    </form>
  </mat-card-content>
</mat-card>`;
}

export const generateDetailComponentHtml = (uiEntity: UIEntity): string => {
  let plainTypesFragment = '';
  let complexTypesFragment = '';
  let dateId = 1;
  for (const field of uiEntity.fields) {
    switch (true) {
      case field.type === 'String':
        plainTypesFragment += inputStringFragment(uiEntity.name, field.name, pascalCase(field.name), field.required);
        break;
      case field.type === 'Number':
        plainTypesFragment += inputNumberFragment(uiEntity.name, field.name, pascalCase(field.name), field.required);
        break;
      case field.type === 'Date':
        plainTypesFragment += inputDateFragment(uiEntity.name, field.name, pascalCase(field.name), dateId, field.required);
        dateId++;
        break;
      case field.type === 'Boolean':
        plainTypesFragment += inputBooleanFragment(uiEntity.name, field.name, pascalCase(field.name));
        break;
      case field.type === 'ObjectId':
        if (field.ref === 'mediaObject') {
          complexTypesFragment += inputMediaObjectFragment(uiEntity.name, field.name, pascalCase(field.name));
        } else {
          const displayProperty = getDisplayProperty(field);
          complexTypesFragment += inputObjectFragment(uiEntity.name, field.name, pascalCase(field.name), displayProperty, field.required);
        }
        break;
      case field.type instanceof Array && field.type.length > 0:
        const nestedField = (field.type as UINestedField[])[0];
        switch (true) {
          case nestedField.type === 'String':
            plainTypesFragment += inputArrayStringFragment(uiEntity.name, field.name, pascalCase(field.name));
            break;
          case nestedField.type === 'Number':
            plainTypesFragment += inputArrayNumberFragment(uiEntity.name, field.name, pascalCase(field.name));
            break;
          case nestedField.type === 'Date':
            plainTypesFragment += inputArrayDateFragment(uiEntity.name, field.name, pascalCase(field.name), dateId);
            dateId++;
            break;
          // TODO Array Boolean missing
          case nestedField.type === 'ObjectId':
            if (nestedField.ref === 'mediaObject') {
              complexTypesFragment += inputArrayMediaObjectFragment(uiEntity.name, field.name, pascalCase(field.name));
            } else {
              const displayProperty = getDisplayProperty(nestedField);
              complexTypesFragment += inputArrayObjectFragment(uiEntity.name, field.name, pascalCase(field.name), displayProperty);
            }
            break;
        }
        break;
    }
  }
  return dialogComponentHtmlDFragment(plainTypesFragment, complexTypesFragment, uiEntity.name);
}



