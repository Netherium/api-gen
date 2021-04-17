import { OptionalKind, Scope, SourceFileStructure, StructureKind } from 'ts-morph';
import { UIEntity } from '../../interfaces/ui-entity.model';
import { kebabCase, pascalCase } from '../../helpers/string-functions';

export const generateRoute = (uiEntity: UIEntity): OptionalKind<SourceFileStructure> => {
  return {
    statements:
      [
        {
          kind: StructureKind.ImportDeclaration,
          moduleSpecifier: 'express',
          namedImports: [
            {
              kind: StructureKind.ImportSpecifier,
              name: 'Router'
            },
          ]
        },
        {
          kind: StructureKind.ImportDeclaration,
          moduleSpecifier: `../controllers/${kebabCase(uiEntity.name)}.controller`,
          namedImports: [
            {
              kind: StructureKind.ImportSpecifier,
              name: `${pascalCase(uiEntity.name)}Controller`
            }
          ]
        },
        {
          kind: StructureKind.ImportDeclaration,
          moduleSpecifier: '../middleware/auth',
          namedImports: [
            {
              kind: StructureKind.ImportSpecifier,
              name: `Auth`
            }
          ]
        },
        {
          kind: StructureKind.Class,
          name: `${pascalCase(uiEntity.name)}Route`,
          isExported: true,
          ctors: [
            {
              kind: StructureKind.Constructor,
              statements: [
                `const controller = new ${pascalCase(uiEntity.name)}Controller();`,
                `this.router.get('/', Auth.getAcl(), controller.list);`,
                `this.router.get('/:id', Auth.getAcl(), controller.show);`,
                `this.router.post('/', Auth.getAcl(), controller.create);`,
                `this.router.put('/:id', Auth.getAcl(), controller.update);`,
                `this.router.delete('/:id', Auth.getAcl(), controller.delete);`
              ]
            }
          ],
          properties: [
            {
              kind: StructureKind.Property,
              name: 'router',
              initializer: 'Router()',
              scope: Scope.Public,
            }
          ]
        }
      ]
  };
};
