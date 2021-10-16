import { OptionalKind, Scope, SourceFileStructure, StructureKind } from 'ts-morph';
import pluralize from 'pluralize';
import { getDisplayProperty } from '../../helpers/client-utility-functions';
import { kebabCase, pascalCase } from '../../helpers/string-functions';
import { UIEntity } from '../../interfaces/ui-entity.model';
import { UIField } from '../../interfaces/ui-field.model';
import { UINestedField } from '../../interfaces/ui-nested-field.model';

export const generateComponent = (uiEntity: UIEntity): OptionalKind<SourceFileStructure> => {
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
        moduleSpecifier: '@angular/material/sort',
        namedImports: [{kind: StructureKind.ImportSpecifier, name: 'Sort'}]
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '../../services/http-generic.service',
        namedImports: [{kind: StructureKind.ImportSpecifier, name: 'HttpGenericService'}]
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '../../models/collection-data-source',
        namedImports: [{kind: StructureKind.ImportSpecifier, name: 'CollectionDataSource'}]
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: `../../models/dynamic-cell.model`,
        namedImports: [{kind: StructureKind.ImportSpecifier, name: `DynamicCell`}]
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: `./${kebabCase(uiEntity.name)}.model`,
        namedImports: [{kind: StructureKind.ImportSpecifier, name: `${pascalCase(uiEntity.name)}`}]
      },
      {
        decorators: [
          {
            kind: StructureKind.Decorator,
            name: 'Component',
            arguments: [`{\nselector: 'app-${kebabCase(uiEntity.name)}',\ntemplateUrl: './${kebabCase(uiEntity.name)}.component.html'\n}`],
          }
        ],
        name: `${pascalCase(uiEntity.name)}Component`,
        isExported: true,
        kind: StructureKind.Class,
        ctors: [
          {
            parameters: [
              {
                name: 'httpService',
                type: 'HttpGenericService',
                scope: Scope.Private,
                kind: StructureKind.Parameter
              }
            ], kind: StructureKind.Constructor,
          }
        ],
        methods: [],
        properties: [
          {
            name: 'resource',
            initializer: `'${kebabCase(pluralize(uiEntity.name))}'`,
            kind: StructureKind.Property
          },
          {
            name: 'displayName',
            initializer: `'${pascalCase(pluralize(uiEntity.name))}'`,
            kind: StructureKind.Property
          },
          {
            name: 'columns',
            initializer: getColumns(uiEntity),
            type: 'DynamicCell[]',
            kind: StructureKind.Property
          },
          {
            name: 'sort',
            type: 'Sort',
            initializer: '{\n    active: \'_id\',\n    direction: \'asc\'\n  }',
            kind: StructureKind.Property
          },
          {
            name: 'dataSource',
            initializer: `new CollectionDataSource<${pascalCase(uiEntity.name)}>(this.httpService, this.resource, this.sort, 0, 10, '')`,
            kind: StructureKind.Property
          }
        ],
      }
    ], kind: StructureKind.SourceFile
  };
}


const getColumns = (uiEntity: UIEntity): string => {
  let displayedColumns = `[
{header: 'Select', columnDef: 'select', type: 'select'},
{header: 'Id', columnDef: '_id', type: 'String'}`;
  for (const uiField of uiEntity.fields) {
    displayedColumns += `,\n{header: '${pascalCase(uiField.name)}', columnDef: '${uiField.name}', ${getColumnType(uiField)}}`
  }
  if (uiEntity.timestamps) {
    // eslint-disable-next-line max-len
    displayedColumns += `,\n{header: 'CreatedAt', columnDef: 'createdAt', type: 'Date'},\n{header: 'UpdatedAt', columnDef: 'updatedAt', type: 'Date'}`;
  }
  displayedColumns += `,\n{header: 'Edit', columnDef: 'edit', type: 'edit'}\n]`;
  return displayedColumns;
}

const getColumnType = (uiField: UIField): string => {
  switch (true) {
    case uiField.type === 'String':
      return `type: 'String'`;
    case uiField.type === 'Number':
      return `type: 'Number'`;
    case uiField.type === 'Date':
      return `type: 'Date'`;
    case uiField.type === 'Boolean':
      return `type: 'Boolean'`;
    case uiField.type === 'ObjectId':
      if (uiField.ref === 'mediaObject') {
        return `type: 'mediaObject'`;
      } else {
        return `type: 'ObjectId', displayProperty: '${getDisplayProperty(uiField)}'`;
      }
    case uiField.type instanceof Array && uiField.type.length > 0:
      const nestedField = (uiField.type as UINestedField[])[0];
      switch (true) {
        case nestedField.type === 'String':
          return `type: 'String[]'`;
        case nestedField.type === 'Number':
          return `type: 'Number[]'`;
        case nestedField.type === 'Date':
          return `type: 'Date[]'`;
        case nestedField.type === 'Boolean':
          return `type: 'Boolean[]'`;
        case nestedField.type === 'ObjectId':
          if (nestedField.ref === 'mediaObject') {
            return `type: 'mediaObject[]'`;
          } else {
            return `type: 'ObjectId[]', displayProperty: '${getDisplayProperty(nestedField)}'`;
          }
      }
  }
}
