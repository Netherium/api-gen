import { ImportDeclarationStructure, OptionalKind, PropertySignatureStructure, SourceFileStructure, StructureKind } from 'ts-morph';
import { kebabCase, pascalCase } from '../../helpers/string-functions';
import { UIField } from '../../interfaces/ui-field.model';
import { UIEntity } from '../../interfaces/ui-entity.model';
import { UINestedField } from '../../interfaces/ui-nested-field.model';


export const generateModel = (uiEntity: UIEntity): OptionalKind<SourceFileStructure> => {
  const importDeclarations = getImportDeclarations(uiEntity);
  return {
    statements: [
      ...importDeclarations,
      {
        name: `${pascalCase(uiEntity.name)}`,
        isExported: true,
        isDefaultExport: false,
        hasDeclareKeyword: false,
        properties: getModelProperties(uiEntity),
        kind: StructureKind.Interface
      }], kind: StructureKind.SourceFile
  };
}

const getFieldType = (uiField: UIField | UINestedField): string => {
  const mongooseTSTypeMatch = [
    {
      mongooseName: 'String',
      typescriptName: 'string'
    },
    {
      mongooseName: 'Number',
      typescriptName: 'number'
    },
    {
      mongooseName: 'Date',
      typescriptName: 'Date'
    },
    {
      mongooseName: 'Boolean',
      typescriptName: 'boolean'
    }
  ];
  for (let i = 0; i < mongooseTSTypeMatch.length; i++) {
    if (mongooseTSTypeMatch[i].mongooseName === uiField.type) {
      return mongooseTSTypeMatch[i].typescriptName;
    }
  }
  if (uiField.type === 'ObjectId') {
    return pascalCase(uiField.ref);
  }
  if (uiField.type instanceof Array) {
    return getFieldType((uiField.type)[0]) + '[]';
  }
}

const getImportDeclarations = (uiEntity: UIEntity): ImportDeclarationStructure[] => {
  const assocImportDeclarations: { [key: string]: ImportDeclarationStructure } = {};
  for (const uiField of uiEntity.fields) {
    if (uiField.type === 'ObjectId') {
      assocImportDeclarations[pascalCase(uiField.ref)] = {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: `../${kebabCase(uiField.ref)}/${kebabCase(uiField.ref)}.model`,
        namedImports: [
          {
            kind: StructureKind.ImportSpecifier,
            name: `${pascalCase(uiField.ref)}`
          }
        ]
      };
    }
    if (uiField.type instanceof Array) {
      const nestedField = (uiField.type)[0] as UINestedField;
      if (nestedField.type === 'ObjectId') {
        assocImportDeclarations[pascalCase(nestedField.ref)] = {
          kind: StructureKind.ImportDeclaration,
          isTypeOnly: false,
          moduleSpecifier: `../${kebabCase(nestedField.ref)}/${kebabCase(nestedField.ref)}.model`,
          namedImports: [
            {
              kind: StructureKind.ImportSpecifier,
              name: `${pascalCase(nestedField.ref)}`
            }
          ]
        };
      }
    }
  }
  const importDeclarations: ImportDeclarationStructure[] = [];
  Object.values(assocImportDeclarations).forEach(importDeclaration => {
    importDeclarations.push(importDeclaration);
  })
  return importDeclarations;
}


const getModelProperties = (uiEntity: UIEntity): OptionalKind<PropertySignatureStructure>[] => {
  const modelProperties: PropertySignatureStructure[] = [
    {
      name: '_id',
      type: 'string',
      hasQuestionToken: false,
      isReadonly: false,
      kind: StructureKind.PropertySignature
    }
  ];
  for (const uiField of uiEntity.fields) {
    const propertyType = getFieldType(uiField);
    const propSig: PropertySignatureStructure = {
      name: uiField.name,
      type: propertyType,
      hasQuestionToken: true,
      isReadonly: false,
      kind: StructureKind.PropertySignature
    }
    modelProperties.push(propSig);
  }
  if (uiEntity.timestamps) {
    const timeStampPropsSig: PropertySignatureStructure[] = [
      {
        name: 'createdAt',
        type: 'Date',
        hasQuestionToken: true,
        isReadonly: true,
        kind: StructureKind.PropertySignature
      },
      {
        name: 'updatedAt',
        type: 'Date',
        hasQuestionToken: true,
        isReadonly: true,
        kind: StructureKind.PropertySignature
      },
    ]
    modelProperties.push(...timeStampPropsSig);
  }

  return modelProperties;
}
