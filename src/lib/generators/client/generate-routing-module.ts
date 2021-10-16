import { OptionalKind, SourceFileStructure, StructureKind, VariableDeclarationKind } from 'ts-morph';
import pluralize from 'pluralize';
import { kebabCase, pascalCase } from '../../helpers/string-functions';
import { UIEntity } from '../../interfaces/ui-entity.model';

export const generateRoutingModule = (uiEntity: UIEntity): OptionalKind<SourceFileStructure> => {
  return {
    statements: [
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: '@angular/core',
        namedImports: [{kind: StructureKind.ImportSpecifier, name: 'NgModule'}]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: '@angular/router',
        namedImports: [
          {kind: StructureKind.ImportSpecifier, name: 'RouterModule'},
          {kind: StructureKind.ImportSpecifier, name: 'Routes'}
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: `./${kebabCase(uiEntity.name)}.component`,
        namedImports: [{kind: StructureKind.ImportSpecifier, name: `${pascalCase(uiEntity.name)}Component`}]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: `./${kebabCase(uiEntity.name)}-detail/${kebabCase(uiEntity.name)}-detail.component`,
        namedImports: [{kind: StructureKind.ImportSpecifier, name: `${pascalCase(uiEntity.name)}DetailComponent`}]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: `../../services/generic-resolver.service`,
        namedImports: [{kind: StructureKind.ImportSpecifier, name: `GenericResolverService`}]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: `../../models/crud-action.model`,
        namedImports: [{kind: StructureKind.ImportSpecifier, name: `CRUDAction`}]
      },
      {
        isExported: false,
        isDefaultExport: false,
        hasDeclareKeyword: false,
        kind: StructureKind.VariableStatement,
        declarationKind: VariableDeclarationKind.Const,
        declarations: [{
          name: 'routes',
          initializer: `[
  {
    path: '',
    component: ${pascalCase(uiEntity.name)}Component
  },
  {
    path: 'create',
    component: ${pascalCase(uiEntity.name)}DetailComponent
  },
  {
    path: 'edit/:id',
    component: ${pascalCase(uiEntity.name)}DetailComponent,
    resolve: {${uiEntity.name}: GenericResolverService},
    data: {resolverData: {endpoint: '${kebabCase(pluralize(uiEntity.name))}'}, action: CRUDAction.UPDATE}
  }
]`,
          type: 'Routes',
          hasExclamationToken: false,
          kind: StructureKind.VariableDeclaration
        }]
      }, {
        decorators: [{
          kind: StructureKind.Decorator,
          name: 'NgModule',
          arguments: ['{\n  imports: [RouterModule.forChild(routes)],\n  exports: [RouterModule]\n}'],
        }],
        isAbstract: false,
        name: `${pascalCase(uiEntity.name)}RoutingModule`,
        isExported: true,
        isDefaultExport: false,
        hasDeclareKeyword: false,
        kind: StructureKind.Class,
      }], kind: StructureKind.SourceFile
  };
};
