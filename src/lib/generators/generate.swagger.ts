import * as path from 'path';
import { promises as fs } from 'fs';
import * as YAML from 'yaml';
import * as pluralize from 'pluralize';
import { UI } from '../interfaces/ui.model';
import { SwaggerEntity } from '../interfaces/swagger.entity.model';
import { SwaggerPaths } from '../interfaces/swagger.paths.model';
import { SwaggerComponentSchema, SwaggerPropertiesSchema } from '../interfaces/swagger.component.schema.model';
import { UIEntity } from '../interfaces/ui.entity.model';
import { camelCase } from '../helpers/utility.functions';
import { UINestedField } from '../interfaces/ui.nested.field.model';

export const generateSwagger = async (ui: UI) => {
  const yamlPath = path.join(process.cwd(), ui.swaggerPath);
  const yamlFile = (await fs.readFile(yamlPath)).toString();
  const yamlContents = YAML.parse(yamlFile);
  for (const uiEntity of ui.entities) {
    const swaggerEntity: SwaggerEntity = {
      tagName: pluralize.plural(uiEntity.capitalizedName),
      route: pluralize.plural(uiEntity.name),
      entity: uiEntity
    }

    const swaggerComponentSchema: SwaggerComponentSchema = {};
    const requiredProperties = getRequiredSwaggerProperties(uiEntity);
    swaggerComponentSchema[uiEntity.capitalizedName] = {
      type: 'object',
      properties: uiFieldsToSwaggerProperties(uiEntity),
      ...(requiredProperties.length > 0) && {required: requiredProperties}
    }

    const paths: SwaggerPaths = {};
    paths[`/${swaggerEntity.route}`] = {
      get: swaggerListMethodDeclaration(swaggerEntity),
      post: swaggerCreateMethodDeclaration(swaggerEntity)
    };
    paths[`/${swaggerEntity.route}/{id}`] = {
      get: swaggerShowMethodDeclaration(swaggerEntity),
      put: swaggerUpdateMethodDeclaration(swaggerEntity),
      delete: swaggerDeleteMethodDeclaration(swaggerEntity)
    }
    const tagFound = yamlContents.tags.find((tag: any) => tag.name === swaggerEntity.tagName);
    if (!tagFound) {
      yamlContents.tags.push({name: swaggerEntity.tagName});
    }
    yamlContents.paths = {...yamlContents.paths, ...paths};
    yamlContents.components.schemas = {...yamlContents.components.schemas, ...swaggerComponentSchema}
  }
  await fs.writeFile(yamlPath, YAML.stringify(yamlContents));
}


const swaggerListMethodDeclaration = (swaggerEntity: SwaggerEntity): any => {
  return {
    tags: [
      swaggerEntity.tagName
    ],
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: `#/components/schemas/${swaggerEntity.entity.capitalizedName}`
              }
            }
          }
        }
      },
      500: {
        $ref: '#/components/responses/HTTP_INTERNAL_SERVER_ERROR'
      }
    },
    security: [
      {
        Bearer: []
      }
    ]
  };
}

const swaggerShowMethodDeclaration = (swaggerEntity: SwaggerEntity): any => {
  return {
    tags: [
      swaggerEntity.tagName
    ],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              $ref: `#/components/schemas/${swaggerEntity.entity.capitalizedName}`
            }
          }
        }
      },
      404: {
        $ref: '#/components/responses/HTTP_NOT_FOUND'
      },
      500: {
        $ref: '#/components/responses/HTTP_INTERNAL_SERVER_ERROR'
      }
    },
    security: [
      {
        Bearer: []
      }
    ]
  }
}

const swaggerCreateMethodDeclaration = (swaggerEntity: SwaggerEntity): any => {
  return {
    tags: [
      swaggerEntity.tagName
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: `#/components/schemas/${swaggerEntity.entity.capitalizedName}`
          }
        }
      }
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              $ref: `#/components/schemas/${swaggerEntity.entity.capitalizedName}`
            }
          }
        }
      },
      404: {
        $ref: '#/components/responses/HTTP_NOT_FOUND'
      },
      500: {
        $ref: '#/components/responses/HTTP_INTERNAL_SERVER_ERROR'
      }
    },
    security: [
      {
        Bearer: []
      }
    ]
  };
}

const swaggerUpdateMethodDeclaration = (swaggerEntity: SwaggerEntity): any => {
  return {
    tags: [
      swaggerEntity.tagName
    ],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: `#/components/schemas/${swaggerEntity.entity.capitalizedName}`
          }
        }
      }
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              $ref: `#/components/schemas/${swaggerEntity.entity.capitalizedName}`
            }
          }
        }
      },
      404: {
        $ref: '#/components/responses/HTTP_NOT_FOUND'
      },
      500: {
        $ref: '#/components/responses/HTTP_INTERNAL_SERVER_ERROR'
      }
    },
    security: [
      {
        Bearer: []
      }
    ]
  };
}

const swaggerDeleteMethodDeclaration = (swaggerEntity: SwaggerEntity): any => {
  return {
    tags: [
      swaggerEntity.tagName
    ],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    responses: {
      204: {
        $ref: '#/components/responses/HTTP_NO_CONTENT'
      },
      404: {
        $ref: '#/components/responses/HTTP_NOT_FOUND'
      },
      500: {
        $ref: '#/components/responses/HTTP_INTERNAL_SERVER_ERROR'
      }
    },
    security: [
      {
        Bearer: []
      }
    ]
  };
}

const uiFieldsToSwaggerProperties = (uiEntity: UIEntity): SwaggerPropertiesSchema => {
  const swaggerProperties: SwaggerPropertiesSchema = {};
  swaggerProperties._id = {
    type: 'string',
    readOnly: true
  }
  for (const field of uiEntity.fields) {
    swaggerProperties[field.name] = {};
    switch (true) {
      case field.type === 'String':
        swaggerProperties[field.name] = {
          type: 'string',
        }
        break;
      case field.type === 'Number':
        swaggerProperties[field.name] = {
          type: 'number',
        }
        break;
      case field.type === 'Date':
        swaggerProperties[field.name] = {
          type: 'string',
          format: 'date-time'
        }
        break;
      case field.type === 'Boolean':
        swaggerProperties[field.name] = {
          type: 'boolean'
        }
        break;
      case field.type instanceof Array:
        let items: any = {};
        for (const nestedField of field.type as UINestedField[]) {
          items = getNestedUiFieldsToSwaggerProperties(nestedField);
        }
        swaggerProperties[field.name] = {
          type: 'array',
          ...items
        }
        break;
      case field.type === 'ObjectId':
        swaggerProperties[field.name] = {
          $ref: `#/components/schemas/${camelCase(field.ref, true)}`
        }
    }
  }
  if (uiEntity.timestamps) {
    swaggerProperties.createdAt = {
      type: 'string',
      format: 'date-time',
      readOnly: true
    }
    swaggerProperties.updatedAt = {
      type: 'string',
      format: 'date-time',
      readOnly: true
    }
  }
  return swaggerProperties;
}

const getRequiredSwaggerProperties = (uiEntity: UIEntity): string[] => {
  const requiredProperties = [];
  for (const field of uiEntity.fields) {
    if (field.required) {
      requiredProperties.push(field.name);
    }
  }
  return requiredProperties;
}

const getNestedUiFieldsToSwaggerProperties = (uiNested: UINestedField): any => {
  const swaggerNestedProperties: SwaggerPropertiesSchema = {};
  swaggerNestedProperties.items = {};
  switch (uiNested.type) {
    case 'String':
      swaggerNestedProperties.items.type = 'string';
      break;
    case 'Number':
      swaggerNestedProperties.items.type = 'number';
      break;
    case 'Date':
      swaggerNestedProperties.items.type = 'string';
      swaggerNestedProperties.items.format = 'date-time';
      break;
    case 'Boolean':
      swaggerNestedProperties.items.type = 'boolean';
      break;
    case 'ObjectId':
      swaggerNestedProperties.items.$ref = `#/components/schemas/${camelCase(uiNested.ref, true)}`;
  }
  return swaggerNestedProperties;
}
