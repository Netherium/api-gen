import * as inquirer from 'inquirer';
import { UIField } from '../interfaces/ui.field.model';
import { UI } from '../interfaces/ui.model';
import { UIEntity } from '../interfaces/ui.entity.model';
import * as fs from 'fs';
import { camelCase, firstLowerCase } from './utility.functions';
import { UINestedField } from '../interfaces/ui.nested.field.model';

inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

export const orchestratePrompts = async (): Promise<UI> => {
  let projectName = '.';
  let srcFolder = 'src';

  const generateApp = (await promptGenerateAction()).type === 'App';
  if (generateApp) {
    let dirExistsNotEmpty: boolean;
    do {
      projectName = (await promptProjectName()).name;
      dirExistsNotEmpty = (fs.existsSync(projectName) && (await fs.promises.readdir(projectName)).length > 0);
    } while ((dirExistsNotEmpty === true) && (await promptProjectNameAgain()).projectNameAgain === false);
  }
  const entities: UIEntity[] = [];
  if (!generateApp || (await promptGenerateEntities()).entities === true) {
    do {
      const entityName = (await promptEntityName()).name;
      const fields: UIField[] = [];
      do {
        const name = firstLowerCase((await promptPropertyName()).name);
        let type = (await promptPropertyType()).type;
        let ref: any;
        if (type === 'ObjectId') {
          ref = (await promptPropertyRef()).ref;
        }
        if (type === 'Array') {
          const nestedType = (await promptNestedPropertyType()).type;
          let nestedRef: string;
          if (nestedType === 'ObjectId') {
            nestedRef = (await promptPropertyRef()).ref;
          }
          const nestedProperties = (await promptPropertyRestrictions()).properties;
          const nestedField: UINestedField = {
            type: nestedType,
            ...(nestedRef) && {ref: nestedRef},
            ...(nestedProperties.includes('Required')) && {required: true},
            ...(nestedProperties.includes('Unique')) && {unique: true},
          }
          type = [nestedField];
        }
        let properties = [];
        if (!(type instanceof Array)) {
          properties = (await promptPropertyRestrictions()).properties;
        }
        const newField: UIField = {
          ...(name) && {name},
          ...(type) && {type},
          ...(ref) && {ref},
          ...(properties.includes('Required')) && {required: true},
          ...(properties.includes('Unique')) && {unique: true},
        };
        fields.push(newField);
      } while ((await promptEntityPropertyAgain()).askAgain === true);
      const canBePopulated = fields.find(o => o.type === 'ObjectId' || o.type instanceof Array)
      const entity: UIEntity = {
        name: camelCase(entityName),
        capitalizedName: camelCase(entityName, true),
        fields,
        timestamps: (await promptEntityTimestamps()).timestamps,
        populate: canBePopulated ? (await promptEntityPropertiesPopulate()).populate : false
      };
      entities.push(entity);
    } while ((await promptEntityAgain()).askAgain === true)
  }

  let swaggerPath = `${projectName}/swagger.yaml`;
  let swaggerDocs = false;
  if (!generateApp) {
    srcFolder = (await promptRoutesOutputFolder(srcFolder)).outputFolder;
    swaggerDocs = (await promptSwaggerDocs()).swaggerDocs;
    if (swaggerDocs) {
      swaggerPath = (await promptSwaggerPath()).swaggerPath;
    }
  }
  return {
    generateApp,
    projectName,
    srcFolder,
    entities,
    swaggerDocs,
    swaggerPath
  }
}

const promptProjectNameAgain = async () => {
  return inquirer.prompt(
    {
      type: 'confirm',
      name: 'projectNameAgain',
      message: 'Directory not empty, are you sure (enter for NO)?',
      default: false
    });
}
const promptGenerateAction = async () => {
  return inquirer.prompt(
    {
      type: 'list',
      name: 'type',
      message: 'What would you like to generate:',
      choices: ['App', 'Entities'],
    }
  );
}

const promptGenerateEntities = async () => {
  return inquirer.prompt(
    {
      type: 'confirm',
      name: 'entities',
      message: 'Add entities (enter for YES)?',
      default: true
    });
}

const promptProjectName = async () => {
  return inquirer.prompt(
    {
      type: 'input',
      name: 'name',
      message: 'Project Name:',
      validate: (name: any) => {
        const reg = /^[a-zA-Z0-9-_.]+$/;
        return (reg.test(name)) || 'Project name cannot be empty and can contain alphanumerical, dashes and dots only!';
      }
    });
}

const promptEntityName = async () => {
  return inquirer.prompt(
    {
      type: 'input',
      name: 'name',
      message: 'Entity Name:',
      validate: (name: any) => {
        const reg = /^[a-zA-Z0-9-_.]+$/;
        return (reg.test(name)) || 'Entity name cannot be empty and can contain alphanumerical, dashes and dots only!';
      }
    });
}

const promptPropertyName = async () => {
  return inquirer.prompt(
    {
      type: 'input',
      name: 'name',
      message: 'Property Name:',
      validate: function validateEntityName(name) {
        const reg = /^[a-zA-Z0-9]+$/;
        return (reg.test(name)) || 'Property name cannot be empty and can contain alphanumerical only!';
      }
    },
  )
}

const promptPropertyType = async () => {
  return inquirer.prompt(
    {
      type: 'list',
      name: 'type',
      message: 'Select Type:',
      choices: ['String', 'Number', 'Date', 'Boolean', 'Array', 'ObjectId'],
    }
  );
}

const promptNestedPropertyType = async () => {
  return inquirer.prompt(
    {
      type: 'list',
      name: 'type',
      message: 'Select Nested Type:',
      choices: ['String', 'Number', 'Date', 'Boolean', 'ObjectId'],
    }
  );
}

const promptPropertyRef = async () => {
  return inquirer.prompt(
    {
      type: 'input',
      name: 'ref',
      message: 'Entity Reference: (Entity Name)'
    });
}

const promptPropertyRestrictions = async () => {
  return inquirer.prompt(
    {
      type: 'checkbox',
      message: 'Additional Restrictions',
      name: 'properties',
      choices: [
        {
          name: 'Required'
        },
        {
          name: 'Unique'
        },
      ],
    }
  );
}

const promptEntityPropertyAgain = async () => {
  return inquirer.prompt(
    {
      type: 'confirm',
      name: 'askAgain',
      message: 'Add Another Property (enter for YES)?',
      default: true
    });
}

const promptEntityTimestamps = async () => {
  return inquirer.prompt(
    {
      type: 'confirm',
      name: 'timestamps',
      message: 'Add Timestamps (enter for YES)?',
      default: true
    }
  )
}

const promptEntityPropertiesPopulate = async () => {
  return inquirer.prompt(
    {
      type: 'confirm',
      name: 'populate',
      message: 'Populate external refs?',
      default: true
    }
  )
}

const promptEntityAgain = async () => {
  return inquirer.prompt(
    {
      type: 'confirm',
      name: 'askAgain',
      message: 'Add Another Entity (enter for NO)?',
      default: false
    });
}

const promptRoutesOutputFolder = async (defaultDir: string) => {
  return inquirer.prompt(
    {
      type: 'input',
      name: 'outputFolder',
      default: defaultDir,
      message: `Output Folder:`,
    },
  )
}

const promptSwaggerDocs = async () => {
  return inquirer.prompt(
    {
      type: 'confirm',
      name: 'swaggerDocs',
      message: 'Generate Swagger Docs (enter for YES)?',
      default: true
    });
}

const promptSwaggerPath = async () => {
  return inquirer.prompt([
    {
      type: 'fuzzypath',
      name: 'swaggerPath',
      excludePath: (nodePath: string) => {
        const excludedItems = ['node_modules', '.idea', '.nyc', 'coverage', '__tests__'];
        for (const excludedItem of excludedItems) {
          if (nodePath.startsWith(excludedItem)) {
            return true;
          }
        }
        return false;
      },
      excludeFilter: (nodePath: string) => nodePath.startsWith('.'),
      itemType: 'file',
      rootPath: './',
      message: 'Locate swagger.yaml',
      default: '',
      suggestOnly: true,
      depthLimit: 3,
    }
  ]);
}
