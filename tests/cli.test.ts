import { should } from 'chai';
import * as path from 'path';
import * as fs from 'fs';
import * as YAML from 'yaml';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { cliExecute, KEYSTROKE } from './cmd.helper';

should();

describe('CLI', () => {
  const sampleFileName = 'neth-api-gen-sample.json';
  const jsonFalseFile = 'non-existing.json';
  const entryFile = 'src/bin/main.ts';
  const apiNoEntities = 'apiNoEntities';
  const apiTwoEntities = 'apiTwoEntities';
  const apiNoAppWDocs = 'apiNoAppWDocs';
  const apiNoAppNoDocs = 'apiNoAppNoDocs';
  describe('with argument "-s"', () => {
    it('should exit with a zero exit code and sample file exported', async () => {
      const cli = await cliExecute([entryFile, '-s']);
      cli.should.have.property('code').eqls(0);
      cli.should.have.property('data').contains(`Exported sample file: ${sampleFileName}`);
    });
    it('should not write sample json if permission is read only', async () => {
      await fs.promises.chmod(sampleFileName, 0o444);
      const cli = await cliExecute([entryFile, '-s']);
      cli.should.have.property('code').eqls(0);
      cli.should.have.property('data').contains('Error occurred while exporting sample file:');
      await fs.promises.chmod(sampleFileName, 0o777);
    });
    after(async () => {
      await fs.promises.unlink(sampleFileName);
    });
  });
  describe('with argument "-i"', () => {
    before(async () => {
      await cliExecute([entryFile, '-s']);
    });
    it('should exit with a zero code, read json file and generate project/resources', async () => {
      const cli = await cliExecute([entryFile, '-i', sampleFileName]);
      cli.should.have.property('code').eqls(0);
      cli.should.have.property('data').contains('Project generated in').contains('Resource generated for');
    });
    it('should exit with a zero exit code and not have read json file', async () => {
      const cli = await cliExecute([entryFile, '-i', jsonFalseFile]);
      cli.should.have.property('code').eqls(0);
      cli.should.have.property('data').contains('Error occurred while reading json file:');
    });
    after(async () => {
      fs.rmdirSync('myapi', {recursive: true});
      await fs.promises.unlink(sampleFileName);
    });
  });
  describe('with no arguments', () => {
    before(async () => {
      const sampleYaml: any = {
        tags: [],
        paths: {},
        components: {
          responses: {},
          schemas: {}
        }
      };
      await fs.promises.mkdir(apiTwoEntities);
      await fs.promises.writeFile(`${apiTwoEntities}/empty.ts`, '',);
      await fs.promises.mkdir(apiNoAppWDocs);
      await fs.promises.writeFile(`${apiNoAppWDocs}/swagger.yaml`, YAML.stringify(sampleYaml));
      await fs.promises.mkdir(apiNoAppNoDocs);
    });
    it('should generate app without entities', async () => {
      const cli = await cliExecute([entryFile], [
        KEYSTROKE.ENTER,                          // App
        `${apiNoEntities}${KEYSTROKE.ENTER}`,     // Project name
        `N${KEYSTROKE.ENTER}`                     // Add entities
      ], true, 30000, 2000, 500);
      cli.should.have.property('data').contains('Project generated in');
    });
    it('should generate app with 2 entities', async () => {
      const cli = await cliExecute([entryFile], [
        KEYSTROKE.ENTER,                  // App
        `%${KEYSTROKE.ENTER}`,                    // Wrong project name
        KEYSTROKE.BACKSPACE,                      // Delete wrong project name
        `${apiTwoEntities}${KEYSTROKE.ENTER}`,    // Project Name
        `Y${KEYSTROKE.ENTER}`,                    // Dir not empty
        `Y${KEYSTROKE.ENTER}`,            // Add entities
        `%${KEYSTROKE.ENTER}`,            // Wrong entity name
        KEYSTROKE.BACKSPACE,              // Delete wrong entity name
        `post${KEYSTROKE.ENTER}`,         // post entity
        `%${KEYSTROKE.ENTER}`,            // Wrong property name
        KEYSTROKE.BACKSPACE,              // Delete wrong property name
        `body${KEYSTROKE.ENTER}`,         // body property
        KEYSTROKE.ENTER,                  // String
        KEYSTROKE.ENTER,                  // Indexed
        KEYSTROKE.ENTER,                  // No restrictions on property
        `Y${KEYSTROKE.ENTER}`,            // Add another property
        `createdBy${KEYSTROKE.ENTER}`,    // createdBy property
        KEYSTROKE.DOWN,                   // Scroll 5 times, select 6th option 'ObjectId'
        KEYSTROKE.DOWN,
        KEYSTROKE.DOWN,
        KEYSTROKE.DOWN,
        KEYSTROKE.DOWN,
        KEYSTROKE.ENTER,
        `user${KEYSTROKE.ENTER}`,         // Entity ref
        `name${KEYSTROKE.ENTER}`,         // Property displayProperty
        KEYSTROKE.ENTER,                  // No restrictions on property
        `N${KEYSTROKE.ENTER}`,            // Add another property
        `N${KEYSTROKE.ENTER}`,            // Timestamps
        `N${KEYSTROKE.ENTER}`,            // Populate
        `Y${KEYSTROKE.ENTER}`,            // Add another entity
        `book-test${KEYSTROKE.ENTER}`,    // book-test entity
        `title${KEYSTROKE.ENTER}`,        // title property
        KEYSTROKE.ENTER,                  // string type
        KEYSTROKE.ENTER,                  // Indexed
        KEYSTROKE.SPACE,                  // Required
        KEYSTROKE.DOWN,
        KEYSTROKE.SPACE,                  // Unique
        KEYSTROKE.ENTER,
        `Y${KEYSTROKE.ENTER}`,            // Add another property
        `isbn${KEYSTROKE.ENTER}`,         // isbn property
        KEYSTROKE.DOWN,                   // number type
        KEYSTROKE.ENTER,
        KEYSTROKE.ENTER,                  // No restrictions on property
        `Y${KEYSTROKE.ENTER}`,            // Add another property
        `author${KEYSTROKE.ENTER}`,       // author property
        KEYSTROKE.DOWN,                   // Scroll 5 times, select 6th option 'ObjectId'
        KEYSTROKE.DOWN,
        KEYSTROKE.DOWN,
        KEYSTROKE.DOWN,
        KEYSTROKE.DOWN,
        KEYSTROKE.ENTER,
        `user${KEYSTROKE.ENTER}`,         // Entity ref
        `name${KEYSTROKE.ENTER}`,         // Property displayProperty
        KEYSTROKE.ENTER,                  // No restrictions on property
        `N${KEYSTROKE.ENTER}`,            // Add another property
        `Y${KEYSTROKE.ENTER}`,            // Timestamps
        `Y${KEYSTROKE.ENTER}`,            // Populate
        `N${KEYSTROKE.ENTER}`,            // No
      ], true, 60000, 2000, 500);
      cli.should.have.property('data').contains('Project name cannot be empty');
      cli.should.have.property('data').contains('Project generated in ');
      cli.should.have.property('data').contains('Resource generated for post');
      cli.should.have.property('data').contains('Resource generated for book');
      const controller = await fs.promises.readdir(path.join(process.cwd(), apiTwoEntities, 'server', 'src', 'controllers'));
      controller.should.include.members(['post.controller.ts', 'book.controller.ts']);
    });
    it('should create entities without app but with docs', async () => {
      const cli = await cliExecute([entryFile], [
        KEYSTROKE.DOWN,
        KEYSTROKE.ENTER,
        `${apiNoAppWDocs}${KEYSTROKE.ENTER}`,
        `product${KEYSTROKE.ENTER}`,
        `title${KEYSTROKE.ENTER}`,
        KEYSTROKE.ENTER,                  // String property
        KEYSTROKE.ENTER,                  // Indexed property
        KEYSTROKE.ENTER,
        `Y${KEYSTROKE.ENTER}`,
        `tags${KEYSTROKE.ENTER}`,
        KEYSTROKE.DOWN,
        KEYSTROKE.DOWN,
        KEYSTROKE.DOWN,
        KEYSTROKE.DOWN,
        KEYSTROKE.ENTER,
        KEYSTROKE.ENTER,
        KEYSTROKE.SPACE,                  // Required
        KEYSTROKE.DOWN,
        KEYSTROKE.SPACE,                  // Unique
        KEYSTROKE.ENTER,
        `Y${KEYSTROKE.ENTER}`,
        `images${KEYSTROKE.ENTER}`,
        KEYSTROKE.DOWN,
        KEYSTROKE.DOWN,
        KEYSTROKE.DOWN,
        KEYSTROKE.DOWN,
        KEYSTROKE.ENTER,
        KEYSTROKE.DOWN,
        KEYSTROKE.DOWN,
        KEYSTROKE.DOWN,
        KEYSTROKE.DOWN,
        KEYSTROKE.ENTER,
        `mediaObject${KEYSTROKE.ENTER}`,
        KEYSTROKE.SPACE,                  // Required
        KEYSTROKE.DOWN,
        KEYSTROKE.SPACE,                  // Unique
        KEYSTROKE.ENTER,
        `N${KEYSTROKE.ENTER}`,
        `N${KEYSTROKE.ENTER}`,
        `Y${KEYSTROKE.ENTER}`,
        `N${KEYSTROKE.ENTER}`,
        `Y${KEYSTROKE.ENTER}`,
        `${apiNoAppWDocs}/swagger.yaml${KEYSTROKE.ENTER}`
      ], true, 50000, 2000, 500);
      const controller = await fs.promises.readdir(path.join(process.cwd(), apiNoAppWDocs, 'server', 'src', 'controllers'));
      controller.should.include.members(['product.controller.ts']);
      cli.should.have.property('data').contains('Resource generated for product');
      cli.should.have.property('data').contains('Swagger docs updated');
    });
    it('should create entities without app without docs', async () => {
      const cli = await cliExecute([entryFile], [
        KEYSTROKE.DOWN,
        KEYSTROKE.ENTER,
        `${apiNoAppNoDocs}${KEYSTROKE.ENTER}`,
        `post${KEYSTROKE.ENTER}`,
        `title${KEYSTROKE.ENTER}`,
        KEYSTROKE.ENTER,
        KEYSTROKE.ENTER,
        KEYSTROKE.ENTER,
        `N${KEYSTROKE.ENTER}`,
        `N${KEYSTROKE.ENTER}`,
        `N${KEYSTROKE.ENTER}`,
        // `${apiNoAppNoDocs}/src${KEYSTROKE.ENTER}`,
        `N${KEYSTROKE.ENTER}`
      ], true, 20000, 2000, 500);
      const controller = await fs.promises.readdir(path.join(process.cwd(), 'apiNoAppNoDocs', 'server', 'src', 'controllers'));
      controller.should.include.members(['post.controller.ts']);
      cli.should.have.property('data').contains('Resource generated for post');
    });
    after(async () => {
      fs.rmdirSync(apiNoEntities, {recursive: true});
      fs.rmdirSync(apiTwoEntities, {recursive: true});
      fs.rmdirSync(apiNoAppWDocs, {recursive: true});
      fs.rmdirSync(apiNoAppNoDocs, {recursive: true});
    });
  });
});
