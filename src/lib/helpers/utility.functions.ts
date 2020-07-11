import { promises as fs } from 'fs';
import * as path from 'path';
import { basename, extname } from 'path';
import { UI } from '../interfaces/ui.model';


export const getPopulatedFieldsFragment = (input: any) => {
  let fragment = '';
  if (input.populate) {
    const fieldsToPopulate = input.fields.filter((modelField: any) => {
      return modelField.type === 'ObjectId'
    })
    for (const field of fieldsToPopulate) {
      fragment += `.populate('${field.name}')`;
    }
    return fragment;
  }
  return fragment;
}

export const getFieldsForCreated = (userInput: any) => {
  let fragment = '';
  for (let i = 0; i < userInput.fields.length; i++) {
    fragment += `  ${userInput.fields[i].name}: req.body.${userInput.fields[i].name}`;
    if (i !== (userInput.fields.length - 1)) {
      fragment += `,\n`;
    }
  }
  return fragment;
}

export const getFieldsForUpdate = (userInput: any) => {
  let fragment = '';
  for (let i = 0; i < userInput.fields.length; i++) {
    fragment += `\r\n  ...(req.body.${userInput.fields[i].name}) && {${userInput.fields[i].name}: req.body.${userInput.fields[i].name}}`;
    if (i !== (userInput.fields.length - 1)) {
      fragment += `,`;
    }
  }
  return fragment;
}

export const getModelPropertiesForGenerator = (userInput: any) => {
  let modelFieldsString = '{';
  userInput.fields.forEach((field: any, index: number) => {
    if (field.type === 'ObjectId' || field.required || field.unique) {
      modelFieldsString += `\r\n${field.name}: {\r\n  type: ${field.type === 'ObjectId' ? 'Schema.Types.ObjectId' : field.type}`;
      if (field.ref) modelFieldsString += `,\r\n  ref: '${field.ref}'`;
      if (field.required) modelFieldsString += `,\r\n  required: ${field.required}`;
      if (field.unique) modelFieldsString += `,\r\n  unique: ${field.unique}`;
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
  if (userInput.timestamps) modelFieldsString += ', {timestamps: true}';
  return modelFieldsString;
}

export const generateSampleJson = async () => {
  const output: UI = {
    generateApp: true,
    projectName: 'myapi',
    srcFolder: 'src',
    entities: [
      {
        name: 'book',
        capitalizedName: 'Book',
        fields: [
          {
            name: 'title',
            type: 'String',
            required: true
          },
          {
            name: 'isbn',
            type: 'Number',
            unique: true
          },
          {
            name: 'author',
            type: 'ObjectId',
            ref: 'user',
            required: true
          }
        ],
        timestamps: true,
        populate: true
      }
    ],
    swaggerDocs: true,
    swaggerPath: 'myapi/swagger.yaml'
  }
  return await fs.writeFile('neth-api-gen-sample.json', JSON.stringify(output, null, 2));
}

export const readFromJson = async (jsonFilePath: string) => {
  const file = await fs.readFile(jsonFilePath);
  return JSON.parse(file.toString());
}

export const copyAppTemplateFiles = async (src: null | string = null, dest: any) => {
  if (src === null) {
    src = path.join(__dirname + '/../templates')
  }
  const stat = await fs.lstat(src);
  if (stat.isDirectory()) {
    await fs.mkdir(dest, {recursive: true});
    const directories = (await fs.readdir(src));
    for (const childItemName of (await fs.readdir(src))) {
      const ext = extname(childItemName)
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
}

export const camelCase = (str: string, isPascal = false) => {
  let output = (' ' + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => {
    return chr.toUpperCase();
  });
  if (!isPascal) {
    output = output.charAt(0).toLowerCase() + output.slice(1);
  }
  return output;
};

export const firstLowerCase = (str: string) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};
