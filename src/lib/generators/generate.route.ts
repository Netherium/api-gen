import { OptionalKind, Scope, SourceFileStructure, StructureKind } from 'ts-morph';
import { UIEntity } from '../interfaces/ui.entity.model';

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
          moduleSpecifier: `../controllers/${uiEntity.name}.controller`,
          namedImports: [
            {
              kind: StructureKind.ImportSpecifier,
              name: `${uiEntity.capitalizedName}Controller`
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
          name: `${uiEntity.capitalizedName}Route`,
          isExported: true,
          ctors: [
            {
              kind: StructureKind.Constructor,
              statements: [
                `const controller = new ${uiEntity.capitalizedName}Controller();`,
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
  }
}
