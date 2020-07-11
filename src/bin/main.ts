#!/usr/bin/env node

/**
 * Entry point for neth-api-gen
 */

import { IndentationText, NewLineKind, Project, QuoteKind } from 'ts-morph';
import chalk from 'chalk';
import { generateController } from '../lib/generators/generate.controller';
import { generateModel } from '../lib/generators/generate.model';
import { generateRoute } from '../lib/generators/generate.route';
import { copyAppTemplateFiles, generateSampleJson, readFromJson } from '../lib/helpers/utility.functions';
import { orchestratePrompts } from '../lib/helpers/prompts';
import * as yargs from 'yargs';
import { UI } from '../lib/interfaces/ui.model';
import * as path from 'path';
import { generateSwagger } from '../lib/generators/generate.swagger';
import { generateServer } from '../lib/generators/generate.server';


console.log(chalk.magenta(' _   _        _    _                            _                             '));
console.log(chalk.magenta('\| \\ \| \|      \| \|  \| \|                          (_)                            '));
console.log(chalk.magenta('\|  \\\| \|  ___ \| \|_ \| \|__   ______   __ _  _ __   _  ______   __ _   ___  _ __  '));
console.log(chalk.magenta('\| . ` \| / _ \\\| __\|\| \'_ \\ \|______\| / _` \|\| \'_ \\ \| \|\|______\| / _` \| / _ \\\| \'_ \\ '));
console.log(chalk.magenta('\| \|\\  \|\|  __/\| \|_ \| \| \| \|        \| (_\| \|\| \|_) \|\| \|        \| (_\| \|\|  __/\| \| \| \|'));
console.log(chalk.magenta('\\_\| \\_/ \\___\| \\__\|\|_\| \|_\|         \\__,_\|\| .__/ \|_\|         \\__, \| \\___\|\|_\| \|_\|'));
console.log(chalk.magenta('                                        \| \|                 __/ \|             '));
console.log(chalk.magenta('                                        \|_\|                \|___/              '));

(async () => {
  const {argv}: any = yargs
    .scriptName('neth-api-gen')
    .usage('Usage: $0')
    .usage('Usage: $0 -s')
    .option('sample', {
      description: 'Prints a sample .json to use as input',
      type: 'boolean'
    })
    .usage('Usage: $0 -i my.json')
    .option('inputFile', {
      description: 'Input from a json file',
      type: 'string',
      nargs: 1
    })
    .conflicts('sample', 'input')
    .alias('s', 'sample')
    .alias('i', 'inputFile')
    .alias('h', 'help')
    .alias('v', 'version')
    .showHelpOnFail(true, 'Specify --help for available options')
    .epilog(chalk.magenta('copyright@2020 Netherium'));


  if (argv.sample) {
    try {
      await generateSampleJson();
      console.log(chalk.magenta(`✔ Exported sample file: neth-api-gen-sample.json`));
    } catch (err) {
      console.log(chalk.red(`❌ Error occurred while exporting sample file: ${err}`));
    }
    process.exit();
  }

  let userInput: UI;
  if (argv.inputFile !== undefined) {
    try {
      userInput = await readFromJson(argv.inputFile);
    } catch (err) {
      console.log(chalk.red(`❌ Error occurred while reading json file: ${err}`));
      process.exit();
    }
  }

  if (!argv.sample && (argv.inputFile === undefined)) {
    userInput = await orchestratePrompts();
  }

  console.log(JSON.stringify(userInput, null, 2));
  console.log('current working dir', process.cwd());
  console.log('dirname', __dirname);
  if (userInput) {
    const project = new Project({
      manipulationSettings: {
        indentationText: IndentationText.TwoSpaces,
        newLineKind: NewLineKind.LineFeed,
        quoteKind: QuoteKind.Single,
        usePrefixAndSuffixTextForRename: false,
        useTrailingCommas: false
      }
    });
    const entitiesWritten: any = [];
    const baseEntitiesDir = `${userInput.projectName}/${userInput.srcFolder}`;
    for (const entity of userInput.entities) {
      const controllerFile = project.createSourceFile(
        `${baseEntitiesDir}/controllers/${entity.name}.controller.ts`,
        generateController(entity),
        {overwrite: true}
      );

      const modelFile = project.createSourceFile(
        `${baseEntitiesDir}/models/${entity.name}.model.ts`,
        generateModel(entity),
        {overwrite: true}
      );

      const routeFile = project.createSourceFile(
        `${baseEntitiesDir}/routes/${entity.name}.route.ts`,
        generateRoute(entity),
        {overwrite: true}
      );

      entitiesWritten.push(
        {
          name: entity.name,
          controllerFilePath: controllerFile.getFilePath(),
          modelFilePath: modelFile.getFilePath(),
          routeFilePath: routeFile.getFilePath()
        }
      )
    }

    if (userInput.generateApp) {
      try {
        project.createSourceFile(
          `${baseEntitiesDir}/server.ts`,
          generateServer(userInput),
          {overwrite: true}
        );
        await copyAppTemplateFiles(null, userInput.projectName);
        console.log(chalk.magenta(`✔ Project generated in ${path.join(process.cwd(), userInput.projectName)}`));
      } catch (e) {
        console.log(chalk.red(`❌ Error occurred while generating project: ${e}`));
      }
    }

    try {
      await project.save();
      for (const entityWritten of entitiesWritten) {
        console.log(chalk.magenta(`✔ Resource generated for ${entityWritten.name}`));
      }
    } catch (e) {
      console.log(chalk.red(`❌ Error occurred while generating resource: ${e}`));
    }

    if (userInput.swaggerDocs || userInput.generateApp) {
      try {
        await generateSwagger(userInput);
        console.log(chalk.magenta(`✔ Swagger docs updated`));
      } catch (e) {
        console.log(chalk.red(`❌ Error occurred while updating swagger docs: ${e}`));
      }
    }
    const breakpoint = 0;
  }
})();
