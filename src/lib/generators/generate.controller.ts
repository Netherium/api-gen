import { OptionalKind, Scope, SourceFileStructure, StructureKind } from 'ts-morph';
import { getFieldsForCreated, getFieldsForUpdate, getPopulatedFieldsFragment } from '../helpers/utility.functions';
import { UIEntity } from '../interfaces/ui.entity.model';

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
        defaultImport: `${uiEntity.capitalizedName}Model`,
        moduleSpecifier: `../models/${uiEntity.name}.model`,
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
        kind: StructureKind.Class,
        name: `${uiEntity.capitalizedName}Controller`,
        isExported: true,
        docs: [
          {
            description: `${uiEntity.capitalizedName}Controller.ts`,
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
                description: `${uiEntity.capitalizedName}Controller.list()`,
              }
            ],
            statements: [
              writer => {
                writer
                  .writeLine('try {')
                  .writeLine(`  const ${uiEntity.name}Collection = await ${uiEntity.capitalizedName}Model.find()${getPopulatedFieldsFragment(uiEntity)};`)
                  .writeLine(`  return HTTP_OK(res, ${uiEntity.name}Collection);`)
                  .writeLine(`} catch (err) {\n  return HTTP_INTERNAL_SERVER_ERROR(res, err);\n}`)
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
                description: `${uiEntity.capitalizedName}Controller.show()`,
              }
            ],
            statements: [
              writer => {
                writer
                  .writeLine('const id = req.params.id;')
                  .writeLine(`try {`)
                  // tslint:disable-next-line:max-line-length
                  .writeLine(`  const ${uiEntity.name}Entry = await ${uiEntity.capitalizedName}Model.findOne({_id: id})${getPopulatedFieldsFragment(uiEntity)};`)
                  .writeLine(`  if (!${uiEntity.name}Entry) {\n    return HTTP_NOT_FOUND(res);\n  }`)
                  .writeLine(`  return HTTP_OK(res, ${uiEntity.name}Entry);`)
                  .writeLine(`} catch (err) {\n  return HTTP_INTERNAL_SERVER_ERROR(res, err);\n}`)
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
                description: `${uiEntity.capitalizedName}Controller.create()`,
              }
            ],
            statements: [
              writer => {
                writer
                  .writeLine(`const ${uiEntity.name}Entry = new ${uiEntity.capitalizedName}Model({\n${getFieldsForCreated(uiEntity)}\n});`)
                  .writeLine(`try {`)
                  .writeLine(`  const ${uiEntity.name}Created = await ${uiEntity.name}Entry.save();`)
                  .conditionalWriteLine(uiEntity.populate===false, () => `  return HTTP_CREATED(res, ${uiEntity.name}Created);`)
                  .conditionalWriteLine(uiEntity.populate===true, () => `  const ${uiEntity.name}CreatedPopulated = await ${uiEntity.name}Created${getPopulatedFieldsFragment(uiEntity)}.execPopulate();`)
                  .conditionalWriteLine(uiEntity.populate===true, () => `  return HTTP_CREATED(res, ${uiEntity.name}CreatedPopulated);`)
                  .writeLine(`} catch (err) {\n  return HTTP_INTERNAL_SERVER_ERROR(res, err);\n}`)
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
                description: `${uiEntity.capitalizedName}Controller.update()`,
              }
            ],
            statements: [
              writer => {
                writer
                  .writeLine(`const id = req.params.id;\nconst ${uiEntity.name}UpdateData = {${getFieldsForUpdate(uiEntity)}\n};`)
                  .writeLine(`try {`)
                  .writeLine(`  const ${uiEntity.name}Updated = await ${uiEntity.capitalizedName}Model.findByIdAndUpdate(id, ${uiEntity.name}UpdateData, {new: true})${getPopulatedFieldsFragment(uiEntity)};`)
                  .writeLine(`  if (!${uiEntity.name}Updated) {\n    return HTTP_NOT_FOUND(res);\n  }`)
                  .writeLine(`  return HTTP_OK(res, ${uiEntity.name}Updated);`)
                  .writeLine(`} catch (err) {\n  return HTTP_INTERNAL_SERVER_ERROR(res, err);\n}`)
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
                description: `${uiEntity.capitalizedName}Controller.delete()`,
              }
            ],
            statements: [
              writer => {
                writer
                  .writeLine('const id = req.params.id;')
                  .writeLine(`try {\n  const ${uiEntity.name}Deleted = await ${uiEntity.capitalizedName}Model.findByIdAndDelete(id);\n  if (!${uiEntity.name}Deleted) {\n    return HTTP_NOT_FOUND(res);\n  }\n  return HTTP_NO_CONTENT(res);\n} catch (err) {\n  return HTTP_INTERNAL_SERVER_ERROR(res, err);\n}`)
              }
            ],
          },
        ],
      }
    ]
  };
}
