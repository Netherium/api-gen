import { should } from 'chai';
import * as path from 'path';
import * as YAML from 'yaml';
import { promises as fs } from 'fs';
import { generateSwagger } from '../src/lib/generators/server/generate-swagger';
import { UI } from '../src/lib/interfaces/ui.model';
import { UIField } from '../src/lib/interfaces/ui-field.model';
// @ts-ignore
import { MockSwaggerAllFields } from './mocks/mock.swagger.all.fields';
import { UIEntity } from '../src/lib/interfaces/ui-entity.model';
import pluralize from 'pluralize';
import { pascalCase } from '../src/lib/helpers/string-functions';

should();

describe('Generate Swagger', () => {
  const swaggerTestPath = 'tests/mocks/sample.yaml';
  const sampleYamlPath = path.join(process.cwd(), swaggerTestPath);
  const ui: UI = {
    generateApp: false,
    entities: MockSwaggerAllFields,
    swaggerDocs: true,
    swaggerPath: swaggerTestPath
  }
  let tags: any;
  let paths: any;
  let schemas: any;
  before(async () => {
    const sampleYaml: any = {
      tags: [],
      paths: {},
      components: {
        responses: {},
        schemas: {}
      }
    };
    await fs.writeFile(sampleYamlPath, YAML.stringify(sampleYaml));
    await generateSwagger(ui);
    const yamlFile = (await fs.readFile(sampleYamlPath)).toString();
    const yamlContents = YAML.parse(yamlFile);
    tags = yamlContents.tags;
    paths = yamlContents.paths;
    schemas = yamlContents.components.schemas;
  });
  describe('with every different type of field', () => {
    it('should have "tags" equal to entities', async () => {
      tags.should.be.a('array').length(ui.entities.length);
    });
    it('should have "paths" for each resource and method', async () => {
      const pathKeys = ui.entities.reduce((acc: any, item: UIEntity, index) => {
        return [...acc, `/${pluralize(item.name)}`, `/${pluralize(item.name)}/{id}`];
      }, []);
      paths.should.be.a('object').include.keys(pathKeys);
    });
    it('should have "schemas" equal to entities', async () => {
      for (const uiEntity of ui.entities) {
        const fieldKeys = uiEntity.fields.reduce((acc: any, item: UIField, index) => {
          return [...acc, item.name];
        }, []);
        schemas.should.have.property(pascalCase(uiEntity.name)).property('properties').include.keys(fieldKeys);
      }
    });
  });
  before(async () => {
    await generateSwagger(ui);
    const yamlFile = (await fs.readFile(sampleYamlPath)).toString();
    const yamlContents = YAML.parse(yamlFile);
    tags = yamlContents.tags;
  });
  describe('generate again with same entities', () => {
    it('should not have duplicated "tags"', async () => {
      tags.should.be.a('array').length(ui.entities.length);
    });
  });
  after(async () => {
    await fs.unlink(sampleYamlPath);
  });
});
