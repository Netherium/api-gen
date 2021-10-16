#!/usr/bin/env node

/**
 * Entry point for neth-api-gen
 */

import chalk from 'chalk';
import { copyAppTemplateFiles, generateSampleJson, readFromJson } from '../lib/helpers/server-utility-functions';
import { orchestratePrompts } from '../lib/helpers/prompts';
import * as yargs from 'yargs';
import { UI } from '../lib/interfaces/ui.model';
import { IndentationText, NewLineKind, Project, ProjectOptions, QuoteKind } from 'ts-morph';
import * as path from 'path';
import { generateSwagger } from '../lib/generators/server/generate-swagger';
import { generateServerSuite, updateServerFile } from '../lib/generators/server/generate-server-suite';
import { generateClientHtmlComponents, generateClientSuite, updateAppRoutingModule } from '../lib/generators/client/generate-client-suite';

console.info(chalk.magenta(' _   _        _    _                            _                             '));
console.info(chalk.magenta('\| \\ \| \|      \| \|  \| \|                          (_)                            '));
console.info(chalk.magenta('\|  \\\| \|  ___ \| \|_ \| \|__   ______   __ _  _ __   _  ______   __ _   ___  _ __  '));
console.info(chalk.magenta('\| . ` \| / _ \\\| __\|\| \'_ \\ \|______\| / _` \|\| \'_ \\ \| \|\|______\| / _` \| / _ \\\| \'_ \\ '));
console.info(chalk.magenta('\| \|\\  \|\|  __/\| \|_ \| \| \| \|        \| (_\| \|\| \|_) \|\| \|        \| (_\| \|\|  __/\| \| \| \|'));
console.info(chalk.magenta('\\_\| \\_/ \\___\| \\__\|\|_\| \|_\|         \\__,_\|\| .__/ \|_\|         \\__, \| \\___\|\|_\| \|_\|'));
console.info(chalk.magenta('                                        \| \|                 __/ \|             '));
console.info(chalk.magenta('                                        \|_\|                \|___/              '));

(async (): Promise<void> => {
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
    .epilog(chalk.magenta('copyright@2021 Netherium'));


  if (argv.sample) {
    try {
      await generateSampleJson();
      console.info(chalk.magenta(`✔ Exported sample file: neth-api-gen-sample.json`));
    } catch (err) {
      console.error(chalk.red(`❌ Error occurred while exporting sample file: ${err}`));
    }
    process.exit();
  }

  let userInput: UI;
  if (argv.inputFile !== undefined) {
    try {
      userInput = await readFromJson(argv.inputFile);
    } catch (err) {
      console.error(chalk.red(`❌ Error occurred while reading json file: ${err}`));
      process.exit();
    }
  }

  if (!argv.sample && (argv.inputFile === undefined)) {
    userInput = await orchestratePrompts();
  }
  console.info(JSON.stringify(userInput, null, 2));
  if (userInput) {
    const projectOptions: ProjectOptions = {
      manipulationSettings: {
        indentationText: IndentationText.TwoSpaces,
        newLineKind: NewLineKind.LineFeed,
        quoteKind: QuoteKind.Single,
        usePrefixAndSuffixTextForRename: false,
        useTrailingCommas: false
      }
    };
    let project: Project;
    let entitiesWritten: any;
    const serverSuiteDir = userInput.projectName + '/server';
    const clientSuiteDir = userInput.projectName + '/client';
    // eslint-disable-next-line prefer-const
    ({project, entitiesWritten} = generateServerSuite(projectOptions, userInput, serverSuiteDir));
    project = await generateClientSuite(project, userInput, clientSuiteDir);
    if (userInput.generateApp) {
      try {
        await copyAppTemplateFiles(null, userInput.projectName);
        console.info(chalk.magenta(`✔ Project generated in ${path.join(process.cwd(), userInput.projectName)}!`));
      } catch (e) {
        console.error(chalk.red(`❌ Error occurred while generating project: ${e}`));
      }
    }

    try {
      await project.save();
      await generateClientHtmlComponents(userInput, clientSuiteDir);
      for (const entityWritten of entitiesWritten) {
        console.info(chalk.magenta(`✔ Resource generated for ${entityWritten.name}! (Make sure to add a resource-permission for it)`));
      }
    } catch (e) {
      console.error(chalk.red(`❌ Error occurred while generating resource: ${e}`));
    }

    try {
      await updateServerFile(projectOptions, userInput, serverSuiteDir);
      console.info(chalk.magenta(`✔ Updated routes in server.ts!`));
    } catch (e) {
      console.error(chalk.red(`❌ Error occurred while updating ${serverSuiteDir}/src/server.ts: ${e}`));
    }

    try {
      await updateAppRoutingModule(projectOptions, userInput, clientSuiteDir);
      console.info(chalk.magenta(`✔ Updated routes in app-routing.module.ts!`));
    } catch (e) {
      console.error(chalk.red(`❌ Error occurred while updating ${clientSuiteDir}/src/app/app-routing.module.ts: ${e}`));
    }

    if (userInput.swaggerDocs || userInput.generateApp) {
      try {
        await generateSwagger(userInput);
        console.info(chalk.magenta(`✔ Swagger docs updated!`));
      } catch (e) {
        console.error(chalk.red(`❌ Error occurred while updating swagger docs: ${e}`));
      }
    }
  }
})();
