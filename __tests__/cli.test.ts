import { should } from 'chai';
import * as path from 'path';
import * as fs from 'fs';
import { cliExecute, KEYSTROKE } from './cmd.helper';

should();

describe('CLI', () => {
  const sampleFileName = 'neth-api-gen-sample.json';
  const jsonFalseFile = 'non-existing.json';
  const baseCommand = 'npx ts-node --transpile-only src/bin/main.ts';
  before(async () => {
    // Create non empty directories so that promptProjectNameAgain will execute
    await fs.promises.mkdir('mygenapi');
    await fs.promises.writeFile('mygenapi/empty.ts', '');
    await fs.promises.mkdir('mygenapi2');
    await fs.promises.writeFile('mygenapi2/empty.ts', '');
  });
  describe('with argument "-s"', () => {
    it('should exit with a zero exit code and sample file exported', async () => {
      const cli = await cliExecute(`${baseCommand} -s`);
      cli.should.have.property('code').eqls(0);
      cli.should.have.property('data').contains(`Exported sample file: ${sampleFileName}`);
    });
    it('should not write sample json if permission is read only', async () => {
      await fs.promises.chmod(sampleFileName, 0o444);
      const cli = await cliExecute(`${baseCommand} -s`);
      cli.should.have.property('code').eqls(0);
      cli.should.have.property('data').contains('Error occurred while exporting sample file:');
      await fs.promises.chmod(sampleFileName, 0o777);
    });
  });
  describe('with argument "-i"', () => {
    it('should exit with a zero code, read json file and generate project/resources', async () => {
      const cli = await cliExecute(`${baseCommand} -i ${sampleFileName}`);
      cli.should.have.property('code').eqls(0);
      cli.should.have.property('data').contains('Project generated in').contains('Resource generated for');
    });
    it('should exit with a zero exit code and not have read json file', async () => {
      const cli = await cliExecute(`${baseCommand} -i ${jsonFalseFile}`);
      cli.should.have.property('code').eqls(0);
      cli.should.have.property('data').contains('Error occurred while reading json file:');
    });
  });
  describe('with no arguments', () => {
    it('should generate app without entities', async () => {
      const cli = await cliExecute('npx ts-node --transpile-only src/bin/main.ts', [
        KEYSTROKE.ENTER,                  // App
        `%${KEYSTROKE.ENTER}`,            // Wrong project name
        KEYSTROKE.BACKSPACE,              // Delete wrong project name
        `mygenapi${KEYSTROKE.ENTER}`,     // Project name
        `Y${KEYSTROKE.ENTER}`,            // Dir not empty
        `N${KEYSTROKE.ENTER}`             // Add entities
      ], true, 20000, 1500, 1000);
      cli.should.have.property('data').contains('Project name cannot be empty');
      cli.should.have.property('data').contains('Project generated in');
    });
    it('should generate app with 2 entities', async () => {
      const cli = await cliExecute('npx ts-node --transpile-only src/bin/main.ts', [
        KEYSTROKE.ENTER,                  // App
        `mygenapi2${KEYSTROKE.ENTER}`,    // Project Name
        `Y${KEYSTROKE.ENTER}`,            // Dir not empty
        `Y${KEYSTROKE.ENTER}`,            // Add entities
        `%${KEYSTROKE.ENTER}`,            // Wrong entity name
        KEYSTROKE.BACKSPACE,              // Delete wrong entity name
        `post${KEYSTROKE.ENTER}`,         // post entity
        `%${KEYSTROKE.ENTER}`,            // Wrong property name
        KEYSTROKE.BACKSPACE,              // Delete wrong property name
        `body${KEYSTROKE.ENTER}`,         // body property
        KEYSTROKE.ENTER,                  // String
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
        KEYSTROKE.ENTER,                  // No restrictions on property
        `N${KEYSTROKE.ENTER}`,            // Add another property
        `N${KEYSTROKE.ENTER}`,            // Timestamps
        `N${KEYSTROKE.ENTER}`,            // Populate
        `Y${KEYSTROKE.ENTER}`,            // Add another entity
        `book${KEYSTROKE.ENTER}`,         // book entity
        `title${KEYSTROKE.ENTER}`,        // title property
        KEYSTROKE.ENTER,                  // string type
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
        KEYSTROKE.ENTER,                  // No restrictions on property
        `N${KEYSTROKE.ENTER}`,            // Add another property
        `Y${KEYSTROKE.ENTER}`,            // Timestamps
        `Y${KEYSTROKE.ENTER}`,            // Populate
        `N${KEYSTROKE.ENTER}`,            // No
      ], true, 60000, 1500, 1000);
      cli.should.have.property('data').contains('Project generated in ');
      cli.should.have.property('data').contains('Resource generated for post');
      cli.should.have.property('data').contains('Resource generated for book');
    });
    it('should verify files', async () => {
      const controller = await fs.promises.readdir(path.join(process.cwd(), 'mygenapi2', 'src', 'controllers'));
      controller.should.include.members(['post.controller.ts', 'book.controller.ts']);
    });
    it('should create entities without app but with docs', async () => {
      const cli = await cliExecute('npx ts-node --transpile-only src/bin/main.ts', [
        KEYSTROKE.DOWN,
        KEYSTROKE.ENTER,
        `product${KEYSTROKE.ENTER}`,
        `title${KEYSTROKE.ENTER}`,
        KEYSTROKE.ENTER,
        KEYSTROKE.ENTER,
        `N${KEYSTROKE.ENTER}`,
        `N${KEYSTROKE.ENTER}`,
        `N${KEYSTROKE.ENTER}`,
        `mygenapi2/src${KEYSTROKE.ENTER}`,
        `Y${KEYSTROKE.ENTER}`,
        `mygenapi2/swagger.yaml${KEYSTROKE.ENTER}`
      ], true, 20000, 1500, 1000);
      const controller = await fs.promises.readdir(path.join(process.cwd(), 'mygenapi2', 'src', 'controllers'));
      controller.should.include.members(['post.controller.ts', 'book.controller.ts', 'product.controller.ts']);
      cli.should.have.property('data').contains('Resource generated for product');
      cli.should.have.property('data').contains('Swagger docs updated');
    });
    it('should create entities without app without docs', async () => {
      const cli = await cliExecute('npx ts-node --transpile-only src/bin/main.ts', [
        KEYSTROKE.DOWN,
        KEYSTROKE.ENTER,
        `product${KEYSTROKE.ENTER}`,
        `title${KEYSTROKE.ENTER}`,
        KEYSTROKE.ENTER,
        KEYSTROKE.ENTER,
        `N${KEYSTROKE.ENTER}`,
        `N${KEYSTROKE.ENTER}`,
        `N${KEYSTROKE.ENTER}`,
        `mygenapi2/src${KEYSTROKE.ENTER}`,
        `N${KEYSTROKE.ENTER}`
      ], true, 20000, 1500, 1000);
      const controller = await fs.promises.readdir(path.join(process.cwd(), 'mygenapi2', 'src', 'controllers'));
      controller.should.include.members(['post.controller.ts', 'book.controller.ts', 'product.controller.ts']);
      cli.should.have.property('data').contains('Resource generated for product');
    });
  });
  after(async () => {
    fs.rmdirSync('myapi', {recursive: true});
    fs.rmdirSync('mygenapi', {recursive: true});
    fs.rmdirSync('mygenapi2', {recursive: true});
    await fs.promises.unlink(sampleFileName);
  });
});
