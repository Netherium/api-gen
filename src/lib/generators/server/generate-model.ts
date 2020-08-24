import { OptionalKind, SourceFileStructure, StructureKind, VariableDeclarationKind } from 'ts-morph';
import { getFuzzySearchProperties, getModelPropertiesForGenerator } from '../../helpers/server-utility-functions';
import { UIEntity } from '../../interfaces/ui-entity.model';

export const generateModel = (uiEntity: UIEntity): OptionalKind<SourceFileStructure> => {
  return {
    statements: [
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: 'mongoose',
        namespaceImport: 'mongoose',
        trailingTrivia: writer => {
          writer.blankLine()
        }
      },
      {
        docs: [],
        kind: StructureKind.VariableStatement,
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
          {
            name: 'fuzzySearching',
            initializer: 'require(\'mongoose-fuzzy-searching\')',
            kind: StructureKind.VariableDeclaration
          }
        ]
      },
      {
        kind: StructureKind.VariableStatement,
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
          {
            kind: StructureKind.VariableDeclaration,
            name: 'Schema',
            initializer: 'mongoose.Schema',
          }
        ]
      },
      {
        kind: StructureKind.VariableStatement,
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
          {
            kind: StructureKind.VariableDeclaration,
            name: `${uiEntity.name}Schema`,
            initializer: `new Schema(${getModelPropertiesForGenerator(uiEntity)})`,
          }
        ]
      },
      `${uiEntity.name}Schema.plugin(fuzzySearching, {fields: ${getFuzzySearchProperties(uiEntity)}});`,
      {
        kind: StructureKind.ExportAssignment,
        isExportEquals: false,
        expression: `mongoose.model('${uiEntity.name}', ${uiEntity.name}Schema)`,
      }
    ]
  };
}
