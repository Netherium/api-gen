import { OptionalKind, SourceFileStructure, StructureKind } from 'ts-morph';
import { kebabCase, pascalCase } from '../../helpers/string-functions';
import { UIEntity } from '../../interfaces/ui-entity.model';

export const generateModule = (uiEntity: UIEntity): OptionalKind<SourceFileStructure> => {
  return {
    statements: [{
      kind: StructureKind.ImportDeclaration,
      isTypeOnly: false,
      moduleSpecifier: '@angular/core',
      namedImports: [{kind: StructureKind.ImportSpecifier, name: 'NgModule'}]
    }, {
      kind: StructureKind.ImportDeclaration,
      isTypeOnly: false,
      moduleSpecifier: '../../shared.module',
      namedImports: [{kind: StructureKind.ImportSpecifier, name: 'SharedModule'}]
    }, {
      kind: StructureKind.ImportDeclaration,
      isTypeOnly: false,
      moduleSpecifier: `./${kebabCase(uiEntity.name)}.component`,
      namedImports: [{kind: StructureKind.ImportSpecifier, name: `${pascalCase(uiEntity.name)}Component`}]
    }, {
      kind: StructureKind.ImportDeclaration,
      isTypeOnly: false,
      moduleSpecifier: `./${kebabCase(uiEntity.name)}-detail/${kebabCase(uiEntity.name)}-detail.component`,
      namedImports: [{kind: StructureKind.ImportSpecifier, name: `${pascalCase(uiEntity.name)}DetailComponent`}]
    }, {
      kind: StructureKind.ImportDeclaration,
      isTypeOnly: false,
      moduleSpecifier: `./${kebabCase(uiEntity.name)}-routing.module`,
      namedImports: [{kind: StructureKind.ImportSpecifier, name: `${pascalCase(uiEntity.name)}RoutingModule`}]
    }, {
      decorators: [{
        kind: StructureKind.Decorator,
        name: 'NgModule',
        arguments: [`{\n  declarations: [${pascalCase(uiEntity.name)}Component, ${pascalCase(uiEntity.name)}DetailComponent],\n  imports: [\n    SharedModule,\n    ${pascalCase(uiEntity.name)}RoutingModule\n  ]}`],
      }],
      isAbstract: false,
      name: `${pascalCase(uiEntity.name)}Module`,
      isExported: true,
      isDefaultExport: false,
      hasDeclareKeyword: false,
      kind: StructureKind.Class,
    }], kind: StructureKind.SourceFile
  };
}
