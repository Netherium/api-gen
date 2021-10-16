import { promises as fs } from 'fs';
import * as path from 'path';
import { basename, extname } from 'path';
import { UI } from '../interfaces/ui.model';
import { UIEntity } from '../interfaces/ui-entity.model';
import { UIField } from '../interfaces/ui-field.model';

export const getPopulatedFieldsFragment = (input: UIEntity, existingDocument = false): string => {
  let fragment = '';
  if (input.populate) {
    const fieldsToPopulate = input.fields.filter((modelField: any) => {
      return modelField.type === 'ObjectId' || modelField.type instanceof Array;
    });
    for (const field of fieldsToPopulate) {
      if (field.type instanceof Array) {
        if (field.type.some(e => e.type === 'ObjectId')) {
          fragment += `.populate('${field.name}')`;
        }
      } else {
        fragment += `.populate('${field.name}')`;
      }
    }
    if (existingDocument) {
      fragment += `.execPopulate()`;
    }
  }
  if (!existingDocument) {
    fragment += `.exec()`;
  }
  return fragment;
};

export const getPopulatedQueryBuilderFields = (input: UIEntity): string => {
  let populatedOptions = '';
  if (input.populate) {
    populatedOptions += '[';
    const fieldsToPopulate = input.fields.filter((modelField: any) => {
      return modelField.type === 'ObjectId' || modelField.type instanceof Array;
    });
    for (const field of fieldsToPopulate) {
      if (field.type instanceof Array) {
        if (field.type.some(e => e.type === 'ObjectId')) {
          populatedOptions += `{path: '${field.name}'}, `;
        }
      } else {
        populatedOptions += `{path: '${field.name}'}, `;
      }
    }
    if (fieldsToPopulate.length > 0) {
      populatedOptions = populatedOptions.slice(0, -2);
    }
    populatedOptions += ']';
  }

  return populatedOptions;
};

export const getFieldsForCreated = (userInput: any): string => {
  let fragment = '';
  for (let i = 0; i < userInput.fields.length; i++) {
    fragment += `  ${userInput.fields[i].name}: req.body.${userInput.fields[i].name}`;
    if (i !== (userInput.fields.length - 1)) {
      fragment += `,\n`;
    }
  }
  return fragment;
};

export const getFieldsForUpdate = (userInput: any): string => {
  let fragment = '';
  for (let i = 0; i < userInput.fields.length; i++) {
    // eslint-disable-next-line max-len
    fragment += `\r\n  ...(req.body.${userInput.fields[i].name} !== undefined) && {${userInput.fields[i].name}: req.body.${userInput.fields[i].name}}`;
    if (i !== (userInput.fields.length - 1)) {
      fragment += `,`;
    }
  }
  return fragment;
};

export const getModelPropertiesForGenerator = (userInput: any): string => {
  let modelFieldsString = '{';
  userInput.fields.forEach((field: any, index: number) => {
    if (field.type instanceof Array) {
      modelFieldsString += `\r\n${field.name}: [\r\n`;
      for (const nestedField of field.type) {
        modelFieldsString += `\t{\r\n\t\ttype: ${nestedField.type === 'ObjectId' ? 'Schema.Types.ObjectId' : nestedField.type}`;
        if (nestedField.ref) {
          modelFieldsString += `,\r\n\t\tref: '${nestedField.ref}'`;
        }
        if (nestedField.required) {
          modelFieldsString += `,\r\n\t\trequired: ${nestedField.required}`;
        }
        if (nestedField.unique) {
          modelFieldsString += `,\r\n\t\tunique: ${nestedField.unique}`;
        }
        modelFieldsString += `\r\n\t}`;
      }
      modelFieldsString += `\r\n]`;
    } else if (field.type === 'ObjectId' || field.required || field.unique) {
      modelFieldsString += `\r\n${field.name}: {\r\n\ttype: ${field.type === 'ObjectId' ? 'Schema.Types.ObjectId' : field.type}`;
      if (field.ref) {
        modelFieldsString += `,\r\n\tref: '${field.ref}'`;
      }
      if (field.required) {
        modelFieldsString += `,\r\n\trequired: ${field.required}`;
      }
      if (field.unique) {
        modelFieldsString += `,\r\n\tunique: ${field.unique}`;
      }
      modelFieldsString += `\r\n}`;
    } else {
      modelFieldsString += `\r\n${field.name}: ${field.type}`;
    }
    if (!userInput.fields[index + 1]) {
      modelFieldsString += '\r';
    } else {
      modelFieldsString += ',';
    }
  });
  modelFieldsString += '}';
  if (userInput.timestamps) {
    modelFieldsString += ', {timestamps: true}';
  }
  return modelFieldsString;
};

export const getFuzzySearchProperties = (userInput: any): string => {
  let fuzzySearchProperties = '[';
  const fieldsWithFuzzySearch = userInput.fields.filter((field: UIField) => {
    return field.indexed === true;
  });
  fieldsWithFuzzySearch.forEach((field: UIField) => {
    fuzzySearchProperties += `'${field.name}', `;
  });
  if (fieldsWithFuzzySearch.length > 0) {
    fuzzySearchProperties = fuzzySearchProperties.slice(0, -2);
  }
  fuzzySearchProperties += ']';
  return fuzzySearchProperties;
};

export const generateSampleJson = async (): Promise<void> => {
  const output: UI = {
    generateApp: true,
    projectName: 'myapi',
    entities: [
      {
        name: 'book',
        fields: [
          {
            name: 'title',
            type: 'String',
            required: true,
            indexed: true
          },
          {
            name: 'isbn',
            type: 'Number',
            required: true,
            unique: true
          },
          {
            name: 'isPublished',
            type: 'Boolean'
          },
          {
            name: 'publishedAt',
            type: 'Date',
            required: true
          },
          {
            name: 'author',
            type: 'ObjectId',
            ref: 'user',
            displayProperty: 'email',
            required: true
          },
          {
            name: 'collaborators',
            type: [
              {
                type: 'ObjectId',
                ref: 'user',
                displayProperty: 'email'
              }
            ]
          },
          {
            name: 'cover',
            type: 'ObjectId',
            ref: 'mediaObject'
          },
          {
            name: 'images',
            type: [
              {
                type: 'ObjectId',
                ref: 'mediaObject'
              }
            ]
          },
          {
            name: 'tags',
            type: [
              {
                type: 'String'
              }
            ]
          },
          {
            name: 'pagesForReview',
            type: [
              {
                type: 'Number'
              }
            ]
          },
          {
            name: 'datesForReview',
            type: [
              {
                type: 'Date'
              }
            ]
          }
        ],
        timestamps: true,
        populate: true
      }
    ],
    swaggerDocs: true,
    swaggerPath: './myapi/server/swagger.yaml'
  };
  return await fs.writeFile('neth-api-gen-sample.json', JSON.stringify(output, null, 2));
};

export const readFromJson = async (jsonFilePath: string): Promise<any> => {
  const file = await fs.readFile(jsonFilePath);
  return JSON.parse(file.toString());
};

export const copyAppTemplateFiles = async (src: null | string = null, dest: any): Promise<void> => {
  if (src === null) {
    src = path.join(__dirname + '/../templates');
  }
  const stat = await fs.lstat(src);
  if (stat.isDirectory()) {
    await fs.mkdir(dest, {recursive: true});
    const directories = (await fs.readdir(src));
    for (const childItemName of directories) {
      const ext = extname(childItemName);
      let baseFileName: string;
      if (ext === '.tmpl') {
        baseFileName = basename(childItemName, ext);
      } else {
        baseFileName = childItemName;
      }
      await copyAppTemplateFiles(path.join(src, childItemName), path.join(dest, baseFileName));
    }
  } else {
    await fs.copyFile(src, dest);
  }
};
