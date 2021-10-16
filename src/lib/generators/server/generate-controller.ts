import { OptionalKind, Scope, SourceFileStructure, StructureKind } from 'ts-morph';
import {
  getFieldsForCreated,
  getFieldsForUpdate,
  getPopulatedFieldsFragment,
  getPopulatedQueryBuilderFields
} from '../../helpers/server-utility-functions';
import { UIEntity } from '../../interfaces/ui-entity.model';
import { kebabCase, pascalCase } from '../../helpers/string-functions';

/* eslint-disable max-len */
export const generateController = (uiEntity: UIEntity): OptionalKind<SourceFileStructure> => {
  return {
    statements: [
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: 'express',
        namedImports: [
          {
            kind: StructureKind.ImportSpecifier,
            name: 'Request'
          },
          {
            kind: StructureKind.ImportSpecifier,
            name: 'Response'
          }
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        defaultImport: `${pascalCase(uiEntity.name)}Model`,
        moduleSpecifier: `../models/${kebabCase(uiEntity.name)}.model`,
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '../helpers/http.responses',
        namedImports: [
          {
            kind: StructureKind.ImportSpecifier,
            name: 'HTTP_CREATED'
          },
          {
            kind: StructureKind.ImportSpecifier,
            name: 'HTTP_INTERNAL_SERVER_ERROR'
          },
          {
            kind: StructureKind.ImportSpecifier,
            name: 'HTTP_NO_CONTENT'
          },
          {
            kind: StructureKind.ImportSpecifier,
            name: 'HTTP_NOT_FOUND'
          },
          {
            kind: StructureKind.ImportSpecifier,
            name: 'HTTP_OK'
          }
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '../helpers/query-builder-collection',
        namedImports: [
          {
            kind: StructureKind.ImportSpecifier,
            name: 'queryBuilderCollection'
          }
        ]
      },
      {
        kind: StructureKind.Class,
        name: `${pascalCase(uiEntity.name)}Controller`,
        isExported: true,
        docs: [
          {
            description: `${pascalCase(uiEntity.name)}Controller.ts`,
          }
        ],
        methods: [
          {
            name: 'list',
            isAsync: true,
            scope: Scope.Public,
            parameters: [
              {
                name: 'req',
                type: 'Request'
              },
              {
                name: 'res',
                type: 'Response'
              }
            ],
            returnType: 'Promise<Response>',
            docs: [
              {
                description: `${pascalCase(uiEntity.name)}Controller.list()`,
              }
            ],
            statements: [
              // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
              writer => {
                writer
                  .writeLine('try {')
                  .writeLine('  // eslint-disable-next-line max-len')
                  .writeLine(`  const ${uiEntity.name}Collection = await queryBuilderCollection(req, ${pascalCase(uiEntity.name)}Model, ${getPopulatedQueryBuilderFields(uiEntity)});`)
                  .writeLine(`  return HTTP_OK(res, ${uiEntity.name}Collection);`)
                  .writeLine(`} catch (err) {\n  return HTTP_INTERNAL_SERVER_ERROR(res, err);\n}`);
              }
            ],
          },
          {
            name: 'show',
            isAsync: true,
            scope: Scope.Public,
            parameters: [
              {
                name: 'req',
                type: 'Request'
              },
              {
                name: 'res',
                type: 'Response'
              }
            ],
            returnType: 'Promise<Response>',
            docs: [
              {
                description: `${pascalCase(uiEntity.name)}Controller.show()`,
              }
            ],
            statements: [
              (writer): void => {
                writer
                  .writeLine('const id = req.params.id;')
                  .writeLine(`try {`)
                  .writeLine('  // eslint-disable-next-line max-len')
                  .writeLine(`  const ${uiEntity.name}Entry = await ${pascalCase(uiEntity.name)}Model.findOne({_id: id})${getPopulatedFieldsFragment(uiEntity)};`)
                  .writeLine(`  if (!${uiEntity.name}Entry) {\n    return HTTP_NOT_FOUND(res);\n  }`)
                  .writeLine(`  return HTTP_OK(res, ${uiEntity.name}Entry);`)
                  .writeLine(`} catch (err) {\n  return HTTP_INTERNAL_SERVER_ERROR(res, err);\n}`);
              }
            ],
          },
          {
            name: 'create',
            isAsync: true,
            scope: Scope.Public,
            parameters: [
              {
                name: 'req',
                type: 'Request'
              },
              {
                name: 'res',
                type: 'Response'
              }
            ],
            returnType: 'Promise<Response>',
            docs: [
              {
                description: `${pascalCase(uiEntity.name)}Controller.create()`,
              }
            ],
            statements: [
              (writer): void => {
                writer
                  .writeLine(`const ${uiEntity.name}Entry = new ${pascalCase(uiEntity.name)}Model({\n${getFieldsForCreated(uiEntity)}\n});`)
                  .writeLine(`try {`)
                  .writeLine(`  const ${uiEntity.name}Created = await ${uiEntity.name}Entry.save();`)
                  .conditionalWriteLine(uiEntity.populate === false, () => `  return HTTP_CREATED(res, ${uiEntity.name}Created);`)
                  .conditionalWriteLine(uiEntity.populate === true, () => '  // eslint-disable-next-line max-len')
                  .conditionalWriteLine(uiEntity.populate === true, () => `  const ${uiEntity.name}CreatedPopulated = await ${uiEntity.name}Created${getPopulatedFieldsFragment(uiEntity, true)};`)
                  .conditionalWriteLine(uiEntity.populate === true, () => `  return HTTP_CREATED(res, ${uiEntity.name}CreatedPopulated);`)
                  .writeLine(`} catch (err) {\n  return HTTP_INTERNAL_SERVER_ERROR(res, err);\n}`);
              }
            ],
          },
          {
            name: 'update',
            isAsync: true,
            scope: Scope.Public,
            parameters: [
              {
                name: 'req',
                type: 'Request'
              },
              {
                name: 'res',
                type: 'Response'
              }
            ],
            returnType: 'Promise<Response>',
            docs: [
              {
                description: `${pascalCase(uiEntity.name)}Controller.update()`,
              }
            ],
            statements: [
              (writer): void => {
                writer
                  .writeLine(`const id = req.params.id;\nconst ${uiEntity.name}UpdateData = {${getFieldsForUpdate(uiEntity)}\n};`)
                  .writeLine(`try {`)
                  .writeLine('  // eslint-disable-next-line max-len')
                  .writeLine(`  const ${uiEntity.name}Updated = await ${pascalCase(uiEntity.name)}Model.findByIdAndUpdate(id, ${uiEntity.name}UpdateData, {new: true})${getPopulatedFieldsFragment(uiEntity)};`)
                  .writeLine(`  if (!${uiEntity.name}Updated) {\n    return HTTP_NOT_FOUND(res);\n  }`)
                  .writeLine(`  return HTTP_OK(res, ${uiEntity.name}Updated);`)
                  .writeLine(`} catch (err) {\n  return HTTP_INTERNAL_SERVER_ERROR(res, err);\n}`);
              }
            ],
          },
          {
            name: 'delete',
            isAsync: true,
            scope: Scope.Public,
            parameters: [
              {
                name: 'req',
                type: 'Request'
              },
              {
                name: 'res',
                type: 'Response'
              }
            ],
            returnType: 'Promise<Response>',
            docs: [
              {
                description: `${pascalCase(uiEntity.name)}Controller.delete()`,
              }
            ],
            statements: [
              (writer): void => {
                writer
                  .writeLine('const id = req.params.id;')
                  .writeLine(`try {\n  const ${uiEntity.name}Deleted = await ${pascalCase(uiEntity.name)}Model.findByIdAndDelete(id);\n  if (!${uiEntity.name}Deleted) {\n    return HTTP_NOT_FOUND(res);\n  }\n  return HTTP_NO_CONTENT(res);\n} catch (err) {\n  return HTTP_INTERNAL_SERVER_ERROR(res, err);\n}`);
              }
            ],
          },
        ],
      }
    ]
  };
};
