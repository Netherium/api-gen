import * as inquirer from 'inquirer';
import { UIField } from '../interfaces/ui-field.model';
import { UI } from '../interfaces/ui.model';
import { UIEntity } from '../interfaces/ui-entity.model';
import * as fs from 'fs';
import { UINestedField } from '../interfaces/ui-nested-field.model';
import { camelCase } from './string-functions';

inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

export const orchestratePrompts = async (): Promise<UI> => {
  let projectName = '.';
  const generateApp = (await promptGenerateAction()).type === 'App';
  if(generateApp){
    let dirExistsNotEmpty: boolean;
    do {
      projectName = (await promptProjectName()).name;
      dirExistsNotEmpty = (fs.existsSync(projectName) && (await fs.promises.readdir(projectName)).length > 0);
    } while ((dirExistsNotEmpty === true) && (await promptProjectNameAgain()).projectNameAgain === false);
  }else{
    projectName = (await promptProjectLocation()).name;
  }
  const entities: UIEntity[] = [];
  if (!generateApp || (await promptGenerateEntities()).entities === true) {
    do {
      const entityName = camelCase((await promptEntityName()).name);
      const fields: UIField[] = [];
      do {
        const name = camelCase((await promptPropertyName()).name);
        let type = (await promptPropertyType()).type;
        let ref: any;
        let indexed: boolean;
        let displayProperty: string;
        if (type === 'String') {
          indexed = (await promptPropertyIndexed()).indexed;
        }
        if (type === 'ObjectId') {
          ref = (await promptPropertyRef()).ref;
          if (ref !== 'mediaObject') {
            displayProperty = (await promptPropertyDisplayProperty()).displayProperty;
          }
        }
        if (type === 'Array') {
          const nestedType = (await promptNestedPropertyType()).type;
          let nestedRef: string;
          let nestedDisplayProperty: string;
          if (nestedType === 'ObjectId') {
            nestedRef = (await promptPropertyRef()).ref;
            if (nestedRef !== 'mediaObject') {
              nestedDisplayProperty = (await promptPropertyDisplayProperty()).displayProperty;
            }
          }
          const nestedProperties = (await promptPropertyRestrictions()).properties;
          const nestedField: UINestedField = {
            type: nestedType,
            ...(nestedRef) && {ref: nestedRef},
            ...(nestedDisplayProperty) && {displayProperty: nestedDisplayProperty},
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
          ...(indexed) && {indexed},
          ...(displayProperty) && {displayProperty},
          ...(properties.includes('Required')) && {required: true},
          ...(properties.includes('Unique')) && {unique: true},
        };
        fields.push(newField);
      } while ((await promptEntityPropertyAgain()).askAgain === true);
      const canBePopulated = fields.find(o => o.type === 'ObjectId' || o.type instanceof Array)
      const entity: UIEntity = {
        name: entityName,
        fields,
        timestamps: (await promptEntityTimestamps()).timestamps,
        populate: canBePopulated ? (await promptEntityPropertiesPopulate()).populate : false
      };
      entities.push(entity);
    } while ((await promptEntityAgain()).askAgain === true)
  }

  let swaggerPath = `${projectName}/server/swagger.yaml`;
  let swaggerDocs = false;
  if (!generateApp) {
    swaggerDocs = (await promptSwaggerDocs()).swaggerDocs;
    if (swaggerDocs) {
      swaggerPath = (await promptSwaggerPath()).swaggerPath;
    }
  }
  return {
    generateApp,
    projectName,
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
        const reg = /^[a-zA-Z0-9-_\.]+$/;
        return (reg.test(name)) || 'Project name cannot be empty and can contain alphanumerical and dashes only!';
      }
    });
}

const promptProjectLocation = async () => {
  return inquirer.prompt(
    {
      type: 'input',
      name: 'name',
      message: 'Project Location ("." if in root):',
      validate: (name: any) => {
        const reg = /^[a-zA-Z0-9-_\/\.]+$/;
        return (reg.test(name)) || 'Project location cannot be empty and can contain alphanumerical, dashes and slashed only!';
      }
    });
}

const promptEntityName = async () => {
  return inquirer.prompt(
    {
      type: 'input',
      name: 'name',
      message: 'Entity Name (singular, camelCase, i.e. "flightResult"):',
      validate: (name: any) => {
        const reg = /^[a-zA-Z0-9-_]+$/;
        return (reg.test(name)) || 'Project name cannot be empty and can contain alphanumerical and dashes only!';
      }
    });
}

const promptPropertyName = async () => {
  return inquirer.prompt(
    {
      type: 'input',
      name: 'name',
      message: 'Property Name:',
      validate: function validatePropertyName(name) {
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
      message: 'Entity Reference (singular, camelCase, i.e. "mediaObject", "user", "role", ... ):'
    });
}

const promptPropertyDisplayProperty = async () => {
  return inquirer.prompt(
    {
      type: 'input',
      name: 'displayProperty',
      message: 'Display property of ObjectId (used in autocomplete, i.e. if "ref: user", then "name" or "email"):',
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

const promptPropertyIndexed = async () => {
  return inquirer.prompt(
    {
      type: 'confirm',
      name: 'indexed',
      message: 'Indexed (enter for YES)?',
      default: true
    });
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
        const excludedItems = ['node_modules', '.idea', '.nyc', 'coverage', 'tests'];
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
