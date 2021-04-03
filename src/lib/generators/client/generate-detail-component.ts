import {
  ImportDeclarationStructure,
  MethodDeclarationStructure,
  OptionalKind,
  PropertyDeclarationStructure,
  Scope,
  SourceFileStructure,
  StructureKind
} from 'ts-morph';
import pluralize from 'pluralize';
import { getDisplayProperty } from '../../helpers/client-utility-functions';
import { kebabCase, pascalCase } from '../../helpers/string-functions';
import { UIEntity } from '../../interfaces/ui-entity.model';
import { UINestedField } from '../../interfaces/ui-nested-field.model';

export const generateDetailComponent = (uiEntity: UIEntity): OptionalKind<SourceFileStructure> => {
  return {
    statements: [
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@angular/core',
        namedImports: [
          {kind: StructureKind.ImportSpecifier, name: 'Component'}
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@angular/router',
        namedImports: [
          {kind: StructureKind.ImportSpecifier, name: 'ActivatedRoute'},
          {kind: StructureKind.ImportSpecifier, name: 'Router'}
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: `../../../models/crud-action.model`,
        namedImports: [
          {kind: StructureKind.ImportSpecifier, name: `CRUDAction`}
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: `../${kebabCase(uiEntity.name)}.model`,
        namedImports: [
          {kind: StructureKind.ImportSpecifier, name: `${pascalCase(uiEntity.name)}`}
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '../../../services/http-generic.service',
        namedImports: [
          {kind: StructureKind.ImportSpecifier, name: 'HttpGenericService'}
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '../../../services/subscription-notification.service',
        namedImports: [
          {kind: StructureKind.ImportSpecifier, name: 'SubscriptionNotificationService'}
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: 'rxjs',
        namedImports: [
          {kind: StructureKind.ImportSpecifier, name: 'Observable'},
          {kind: StructureKind.ImportSpecifier, name: 'Subject'}
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@angular/common/http',
        namedImports: [
          {kind: StructureKind.ImportSpecifier, name: 'HttpErrorResponse'}
        ]
      },
      ...getExtraImportDeclaration(uiEntity),
      {
        decorators: [{
          kind: StructureKind.Decorator,
          name: 'Component',
          arguments: [`{\n  selector: 'app-${kebabCase(uiEntity.name)}-detail',\n  templateUrl: './${kebabCase(uiEntity.name)}-detail.component.html'\n}`],
        }],
        name: `${pascalCase(uiEntity.name)}DetailComponent`,
        isExported: true,
        kind: StructureKind.Class,
        ctors: [{
          statements: [
            `if (this.activatedRoute.snapshot.data.action === CRUDAction.UPDATE) {
  this.${uiEntity.name} = this.activatedRoute.snapshot.data.${uiEntity.name};
  this.action = CRUDAction.UPDATE;
}`,
            ...getExtraConstructorStatements(uiEntity)
          ],
          parameters: [
            {
              name: 'httpService',
              type: 'HttpGenericService',
              scope: Scope.Private,
              kind: StructureKind.Parameter,
            },
            {
              name: 'subNotSrv',
              type: 'SubscriptionNotificationService',
              scope: Scope.Private,
              kind: StructureKind.Parameter
            },
            {
              name: 'router',
              type: 'Router',
              scope: Scope.Private,
              kind: StructureKind.Parameter
            },
            {
              name: 'activatedRoute',
              type: 'ActivatedRoute',
              scope: Scope.Private,
              kind: StructureKind.Parameter
            }
          ],
          kind: StructureKind.Constructor
        }],
        methods: [
          ...getExtraMethodDeclaration(uiEntity),
          {
            name: 'save',
            statements: [
              `this.isLoading = true;
let obs: Observable<${pascalCase(uiEntity.name)} | HttpErrorResponse>;
if (this.action === CRUDAction.CREATE) {
  obs = this.httpService.create<${pascalCase(uiEntity.name)}>('${kebabCase(pluralize(uiEntity.name))}', this.${uiEntity.name});
} else {
  obs = this.httpService.update<${pascalCase(uiEntity.name)}>('${kebabCase(pluralize(uiEntity.name))}', this.${uiEntity.name});
}
this.subNotSrv.singleSubscription<${pascalCase(uiEntity.name)}>(obs, this.action, '${pascalCase(uiEntity.name)}', () => {
  this.isLoading = false;
}, () => {
  this.router.navigate(['/${kebabCase(pluralize(uiEntity.name))}']);
});`,
            ],
            returnType: 'void',
            kind: StructureKind.Method,
          }
        ],
        properties: [
          {
            name: `action`,
            type: `CRUDAction`,
            initializer: `CRUDAction.CREATE`,
            kind: StructureKind.Property
          },
          {
            name: `${uiEntity.name}`,
            type: `${pascalCase(uiEntity.name)}`,
            initializer: getInitialCreateDialogObj(uiEntity),
            kind: StructureKind.Property
          },
          {
            name: 'isLoading',
            initializer: 'false',
            kind: StructureKind.Property
          },
          ...getExtraPropertyDeclaration(uiEntity)
        ],
      }], kind: StructureKind.SourceFile
  };
}


const getExtraImportDeclaration = (uiEntity: UIEntity): ImportDeclarationStructure[] => {
  const assocExtraImportDeclarations: { [key: string]: ImportDeclarationStructure } = {};
  for (const field of uiEntity.fields) {
    switch (true) {
      case field.type instanceof Array && field.type.length > 0:
        const nestedField = (field.type as UINestedField[])[0];
        switch (true) {
          case nestedField.type === 'String' || nestedField.type === 'Number' || nestedField.type === 'Date':
            assocExtraImportDeclarations.MatChipInputEvent = {
              kind: StructureKind.ImportDeclaration,
              moduleSpecifier: '@angular/material/chips',
              namedImports: [
                {kind: StructureKind.ImportSpecifier, name: 'MatChipInputEvent'}
              ]
            };
            assocExtraImportDeclarations.NgForm = {
              kind: StructureKind.ImportDeclaration,
              moduleSpecifier: '@angular/forms',
              namedImports: [
                {kind: StructureKind.ImportSpecifier, name: 'NgForm'}
              ]
            };
            assocExtraImportDeclarations['@angular/cdk/drag-drop'] = {
              kind: StructureKind.ImportDeclaration,
              moduleSpecifier: '@angular/cdk/drag-drop',
              namedImports: [
                {kind: StructureKind.ImportSpecifier, name: 'CdkDragDrop'},
                {kind: StructureKind.ImportSpecifier, name: 'moveItemInArray'}
              ]
            };
            break;
          case nestedField.type === 'ObjectId' && nestedField.ref !== 'mediaObject':
            assocExtraImportDeclarations.MatAutocompleteSelectedEvent = {
              kind: StructureKind.ImportDeclaration,
              moduleSpecifier: '@angular/material/autocomplete',
              namedImports: [
                {kind: StructureKind.ImportSpecifier, name: 'MatAutocompleteSelectedEvent'}
              ]
            };
            assocExtraImportDeclarations.NgForm = {
              kind: StructureKind.ImportDeclaration,
              moduleSpecifier: '@angular/forms',
              namedImports: [
                {kind: StructureKind.ImportSpecifier, name: 'NgForm'}
              ]
            };
            assocExtraImportDeclarations['rxjs/operators'] = {
              kind: StructureKind.ImportDeclaration,
              moduleSpecifier: 'rxjs/operators',
              namedImports: [
                {kind: StructureKind.ImportSpecifier, name: 'debounceTime'},
                {kind: StructureKind.ImportSpecifier, name: 'distinctUntilChanged'},
                {kind: StructureKind.ImportSpecifier, name: 'filter'},
                {kind: StructureKind.ImportSpecifier, name: 'finalize'},
                {kind: StructureKind.ImportSpecifier, name: 'map'},
                {kind: StructureKind.ImportSpecifier, name: 'switchMap'},
                {kind: StructureKind.ImportSpecifier, name: 'tap'}
              ]
            };
            assocExtraImportDeclarations['@angular/cdk/drag-drop'] = {
              kind: StructureKind.ImportDeclaration,
              moduleSpecifier: '@angular/cdk/drag-drop',
              namedImports: [
                {kind: StructureKind.ImportSpecifier, name: 'CdkDragDrop'},
                {kind: StructureKind.ImportSpecifier, name: 'moveItemInArray'}
              ]
            };
            assocExtraImportDeclarations[pascalCase(nestedField.ref)] = {
              kind: StructureKind.ImportDeclaration,
              moduleSpecifier: `../../${kebabCase(nestedField.ref)}/${kebabCase(nestedField.ref)}.model`,
              namedImports: [
                {kind: StructureKind.ImportSpecifier, name: `${pascalCase(nestedField.ref)}`}
              ]
            };
            break;
        }
        break;
      case field.type === 'ObjectId' && field.ref !== 'mediaObject':
        assocExtraImportDeclarations['rxjs/operators'] = {
          kind: StructureKind.ImportDeclaration,
          moduleSpecifier: 'rxjs/operators',
          namedImports: [
            {kind: StructureKind.ImportSpecifier, name: 'debounceTime'},
            {kind: StructureKind.ImportSpecifier, name: 'distinctUntilChanged'},
            {kind: StructureKind.ImportSpecifier, name: 'filter'},
            {kind: StructureKind.ImportSpecifier, name: 'finalize'},
            {kind: StructureKind.ImportSpecifier, name: 'map'},
            {kind: StructureKind.ImportSpecifier, name: 'switchMap'},
            {kind: StructureKind.ImportSpecifier, name: 'tap'}
          ]
        };
        assocExtraImportDeclarations[pascalCase(field.ref)] = {
          kind: StructureKind.ImportDeclaration,
          moduleSpecifier: `../../${kebabCase(field.ref)}/${kebabCase(field.ref)}.model`,
          namedImports: [
            {kind: StructureKind.ImportSpecifier, name: `${pascalCase(field.ref)}`}
          ]
        };
        break;
    }
  }

  const importDeclarations: ImportDeclarationStructure[] = [];
  Object.values(assocExtraImportDeclarations).forEach(importDeclaration => {
    importDeclarations.push(importDeclaration);
  })
  return importDeclarations;
}

const getExtraPropertyDeclaration = (uiEntity: UIEntity): PropertyDeclarationStructure[] => {
  const assocExtraPropertyDeclarations: { [key: string]: PropertyDeclarationStructure } = {};
  for (const field of uiEntity.fields) {
    switch (true) {
      case field.type instanceof Array && field.type.length > 0:
        const nestedField = (field.type as UINestedField[])[0];
        switch (true) {
          case nestedField.type === 'String' || nestedField.type === 'Number' || nestedField.type === 'Date':
            assocExtraPropertyDeclarations[`${field.name}Value`] = {
              name: `${field.name}Value`,
              initializer: '\'\'',
              kind: StructureKind.Property
            }
            break;
          case nestedField.type === 'ObjectId' && nestedField.ref !== 'mediaObject':
            assocExtraPropertyDeclarations[`${field.name}ChangedSub`] = {
              name: `${field.name}ChangedSub`,
              type: 'Subject<string>',
              initializer: 'new Subject<string>()',
              kind: StructureKind.Property
            };
            assocExtraPropertyDeclarations[`filtered${field.name}`] = {
              name: `filtered${pascalCase(field.name)}`,
              type: `Observable<${pascalCase(nestedField.ref)}[]>`,
              kind: StructureKind.Property
            };
            assocExtraPropertyDeclarations[`isLoading${pascalCase(field.name)}`] = {
              name: `isLoading${pascalCase(field.name)}`,
              type: 'boolean',
              kind: StructureKind.Property
            };
            break;
        }
        break;
      case field.type === 'ObjectId' && field.ref !== 'mediaObject':
        assocExtraPropertyDeclarations[`${field.name}ChangedSub`] = {
          name: `${field.name}ChangedSub`,
          type: 'Subject<string>',
          initializer: 'new Subject<string>()',
          kind: StructureKind.Property
        };
        assocExtraPropertyDeclarations[`filtered${field.name}`] = {
          name: `filtered${pascalCase(field.name)}`,
          type: `Observable<${pascalCase(field.ref)}[]>`,
          kind: StructureKind.Property
        };
        assocExtraPropertyDeclarations[`isLoading${pascalCase(field.name)}`] = {
          name: `isLoading${pascalCase(field.name)}`,
          type: 'boolean',
          kind: StructureKind.Property
        };
        break;
    }
  }

  const propertyDeclarations: PropertyDeclarationStructure[] = [];
  Object.values(assocExtraPropertyDeclarations).forEach(importDeclaration => {
    propertyDeclarations.push(importDeclaration);
  })
  return propertyDeclarations;
}

const getExtraConstructorStatements = (uiEntity: UIEntity): string[] => {
  const constructorStatements: string[] = [];
  for (const field of uiEntity.fields) {
    switch (true) {
      case field.type instanceof Array && field.type.length > 0:
        const nestedField = (field.type as UINestedField[])[0];
        switch (true) {
          case nestedField.type === 'ObjectId' && nestedField.ref !== 'mediaObject':
            constructorStatements.push(
              `this.filtered${pascalCase(field.name)} = this.${field.name}ChangedSub.pipe(\n  filter(term => !!term && typeof term === 'string'),\n  debounceTime(200),\n  distinctUntilChanged(),\n  tap(() => (this.isLoading${pascalCase(field.name)} = true)),\n  switchMap((term: string) => this.httpService.listPaginatedCollection<${pascalCase(nestedField.ref)}>('${kebabCase(pluralize(nestedField.ref))}', null, 0, 5, term)\n    .pipe(\n      map(data => data.data),\n      finalize(() => this.isLoading${pascalCase(field.name)} = false)\n    )\n  )\n);`
            );
            break;
        }
        break;
      case field.type === 'ObjectId' && field.ref !== 'mediaObject':
        constructorStatements.push(
          `this.filtered${pascalCase(field.name)} = this.${field.name}ChangedSub.pipe(\n  filter(term => !!term && typeof term === 'string'),\n  debounceTime(200),\n  distinctUntilChanged(),\n  tap(() => (this.isLoading${pascalCase(field.name)} = true)),\n  switchMap((term: string) => this.httpService.listPaginatedCollection<${pascalCase(field.ref)}>('${kebabCase(pluralize(field.ref))}', null, 0, 5, term)\n    .pipe(\n      map(data => data.data),\n      finalize(() => this.isLoading${pascalCase(field.name)} = false)\n    )\n  )\n);`
        );
        break;
    }
  }
  return constructorStatements;
}

const getExtraMethodDeclaration = (uiEntity: UIEntity): MethodDeclarationStructure[] => {
  const methodDeclarations: MethodDeclarationStructure[] = [];
  for (const field of uiEntity.fields) {
    switch (true) {
      case field.type instanceof Array && field.type.length > 0:
        const nestedField = (field.type as UINestedField[])[0];
        switch (true) {
          case nestedField.type === 'String' || nestedField.type === 'Number' || nestedField.type === 'Date':
            methodDeclarations.push(
              {
                name: `drop${pascalCase(field.name)}`,
                statements: [`moveItemInArray(this.${uiEntity.name}.${field.name}, event.previousIndex, event.currentIndex);`, `entityForm.form.markAsDirty();`],
                parameters: [
                  {
                    name: 'event',
                    type: `CdkDragDrop<${pascalCase(uiEntity.name)}['${field.name}']>`,
                    kind: StructureKind.Parameter,
                  },
                  {
                    name: 'entityForm',
                    type: 'NgForm',
                    kind: StructureKind.Parameter,
                  }
                ],
                returnType: 'void',
                kind: StructureKind.Method,
              },
              {
                name: `add${pascalCase(field.name)}`,
                statements: [
                  `const input = event.input;\nconst value = event.value;\nif ((value || '').trim()) {\n  this.${uiEntity.name}.${field.name}.push((value.trim() as any));\n}\nif (input) {\n  input.value = '';\n}`,
                ],
                parameters: [
                  {
                    name: 'event',
                    type: 'MatChipInputEvent',
                    kind: StructureKind.Parameter,
                  }
                ],
                returnType: 'void',
                kind: StructureKind.Method,
              },
              {
                name: `remove${pascalCase(field.name)}`,
                statements: [`this.${uiEntity.name}.${field.name}.splice(index, 1);`, `entityForm.form.markAsDirty();`],
                parameters: [
                  {
                    name: 'index',
                    type: 'number',
                    kind: StructureKind.Parameter,
                  },
                  {
                    name: 'entityForm',
                    type: 'NgForm',
                    kind: StructureKind.Parameter,
                  }
                ],
                returnType: 'void',
                kind: StructureKind.Method,
              }
            )
            if (nestedField.type === 'Date') {
              methodDeclarations.push(
                {
                  name: `blur${pascalCase(field.name)}`,
                  statements: [
                    `const input = event.target;\ninput.value = '';`,
                  ],
                  parameters: [
                    {
                      name: 'event',
                      type: 'any',
                      kind: StructureKind.Parameter,
                    }
                  ],
                  returnType: 'void',
                  kind: StructureKind.Method,
                }
              )
            }
            break;
          case nestedField.type === 'ObjectId' && nestedField.ref !== 'mediaObject':
            const displayNestedProperty = getDisplayProperty(nestedField);
            methodDeclarations.push(
              {
                name: `drop${pascalCase(field.name)}`,
                statements: [`moveItemInArray(this.${uiEntity.name}.${field.name}, event.previousIndex, event.currentIndex);`, `entityForm.form.markAsDirty();`],
                parameters: [
                  {
                    name: 'event',
                    type: `CdkDragDrop<${pascalCase(uiEntity.name)}['${field.name}']>`,
                    kind: StructureKind.Parameter,
                  },
                  {
                    name: 'entityForm',
                    type: 'NgForm',
                    kind: StructureKind.Parameter,
                  }
                ],
                returnType: 'void',
                kind: StructureKind.Method,
              },
              {
                name: `selected${pascalCase(field.name)}`,
                statements: [`this.${uiEntity.name}.${field.name}.push(event.option.value);`, `document.querySelector<HTMLInputElement>('input[ng-reflect-name="${field.name}"]').value = '';`],
                parameters: [
                  {
                    name: 'event',
                    type: 'MatAutocompleteSelectedEvent',
                    kind: StructureKind.Parameter,
                  }
                ],
                returnType: 'void',
                kind: StructureKind.Method,
              },
              {
                name: `remove${pascalCase(field.name)}`,
                statements: [`this.${uiEntity.name}.${field.name}.splice(index, 1);`, `entityForm.form.markAsDirty();`],
                parameters: [
                  {
                    name: 'index',
                    type: 'number',
                    kind: StructureKind.Parameter,
                  },
                  {
                    name: 'entityForm',
                    type: 'NgForm',
                    kind: StructureKind.Parameter,
                  }
                ],
                returnType: 'void',
                kind: StructureKind.Method,
              },
              {
                name: `${field.name}Changed`,
                statements: [`this.${field.name}ChangedSub.next(text);`],
                parameters: [
                  {
                    name: 'text',
                    type: 'string',
                    kind: StructureKind.Parameter,
                  }
                ],
                returnType: 'void',
                kind: StructureKind.Method,
              },
              {
                name: `${field.name}DisplayFn`,
                statements: [`if (${nestedField.ref}) {\n  return ${nestedField.ref}.${displayNestedProperty};\n}\nreturn null;`],
                parameters: [
                  {
                    name: `${nestedField.ref}`,
                    type: `${pascalCase(nestedField.ref)}`,
                    kind: StructureKind.Parameter
                  }
                ],
                returnType: 'string',
                kind: StructureKind.Method,
              }
            )
            break;
        }
        break;
      case field.type === 'ObjectId' && field.ref !== 'mediaObject':
        const displayProperty = getDisplayProperty(field);
        methodDeclarations.push(
          {
            name: `${field.name}Changed`,
            statements: [
              `if (text === '') {\n  this.${uiEntity.name}.${field.name} = null;\n}\nthis.${field.name}ChangedSub.next(text);`,
            ],
            parameters: [
              {
                name: 'text',
                type: 'string',
                kind: StructureKind.Parameter,
              }
            ],
            returnType: 'void',
            kind: StructureKind.Method,
          },
          {
            name: `${field.name}DisplayFn`,
            statements: [`if (${field.ref}) {\n  return ${field.ref}.${displayProperty};\n}\nreturn null;`],
            parameters: [
              {
                name: `${field.ref}`,
                type: `${pascalCase(field.ref)}`,
                kind: StructureKind.Parameter
              }
            ],
            returnType: 'string',
            kind: StructureKind.Method,
          }
        );
        break;
    }
  }
  return methodDeclarations;
}

const getInitialCreateDialogObj = (uiEntity: UIEntity) => {
  const fieldSeparator = '\n';
  let initialObj = `{${fieldSeparator}_id: '',`;
  for (const field of uiEntity.fields) {
    switch (true) {
      case field.type === 'String':
        initialObj += `${fieldSeparator}${field.name}: '',`;
        break;
      case field.type === 'Number':
        initialObj += `${fieldSeparator}${field.name}: null,`;
        break;
      case field.type === 'Date':
        initialObj += `${fieldSeparator}${field.name}: null,`;
        break;
      case field.type === 'Boolean':
        initialObj += `${fieldSeparator}${field.name}: null,`;
        break;
      case field.type instanceof Array:
        initialObj += `${fieldSeparator}${field.name}: [],`;
        break;
      case field.type === 'ObjectId':
        initialObj += `${fieldSeparator}${field.name}: null,`;
        break;
    }
  }
  initialObj += `\n}`;
  return initialObj;
}
