import { Project, ProjectOptions } from 'ts-morph';
import { promises as fs } from 'fs';
import { generateModule } from './generate-module';
import { generateRoutingModule } from './generate-routing-module';
import { generateModel } from './generate-model';
import { kebabCase, pascalCase } from '../../helpers/string-functions';
import { generateComponentHtml } from './generate-component-html';
import { generateDetailComponentHtml } from './generate-detail-component-html';
import { generateComponent } from './generate-component';
import { generateDetailComponent } from './generate-detail-component';
import { UI } from '../../interfaces/ui.model';
import pluralize from 'pluralize';
import * as path from 'path';


export const generateClientSuite = (project: Project, userInput: UI, clientSuiteDir: string): Project => {
  for (const uiEntity of userInput.entities) {
    const moduleDir = `${clientSuiteDir}/src/app/modules/${kebabCase(uiEntity.name)}`;
    project.createSourceFile(
      `${moduleDir}/${kebabCase(uiEntity.name)}.model.ts`,
      generateModel(uiEntity),
      {overwrite: true}
    );
    project.createSourceFile(
      `${moduleDir}/${kebabCase(uiEntity.name)}.module.ts`,
      generateModule(uiEntity),
      {overwrite: true}
    );
    project.createSourceFile(
      `${moduleDir}/${kebabCase(uiEntity.name)}-routing.module.ts`,
      generateRoutingModule(uiEntity),
      {overwrite: true}
    );
    project.createSourceFile(
      `${moduleDir}/${kebabCase(uiEntity.name)}.component.ts`,
      generateComponent(uiEntity),
      {overwrite: true}
    );
    project.createSourceFile(
      `${moduleDir}/${kebabCase(uiEntity.name)}-detail/${kebabCase(uiEntity.name)}-detail.component.ts`,
      generateDetailComponent(uiEntity),
      {overwrite: true}
    );
  }
  return project;
}

export const generateClientHtmlComponents = async (userInput: UI, clientSuiteDir: string) => {
  for (const uiEntity of userInput.entities) {
    const moduleDir = `${clientSuiteDir}/src/app/modules/${kebabCase(uiEntity.name)}`;
    await fs.mkdir(`${moduleDir}/${kebabCase(uiEntity.name)}-detail`, {recursive: true});
    await fs.writeFile(`${moduleDir}/${kebabCase(uiEntity.name)}-detail/${kebabCase(uiEntity.name)}-detail.component.html`, generateDetailComponentHtml(uiEntity));
    await fs.writeFile(`${moduleDir}/${kebabCase(uiEntity.name)}.component.html`, generateComponentHtml());
  }
}

export const updateAppRoutingModule = async (projectOptions: ProjectOptions, userInput: UI, clientSuiteDir: string) => {
  const project = new Project(projectOptions);
  for (const uiEntity of userInput.entities) {
    const appRoutingPath = `${clientSuiteDir}/src/app/app-routing.module.ts`;
    const appRoutingModuleSource = project.addSourceFileAtPath(appRoutingPath);
    const childrenRoutes = appRoutingModuleSource.getVariableDeclaration('childrenRoutes').getInitializerOrThrow();
    const initialized = childrenRoutes.getText();

    if (!initialized.includes(`loadChildren: () => import('./modules/${kebabCase(uiEntity.name)}/${kebabCase(uiEntity.name)}.module').then(m => m.${pascalCase(uiEntity.name)}Module),`)) {
      const moduleRouteToInsert = `,\n  {
    path: '${kebabCase(pluralize(uiEntity.name))}',
    loadChildren: () => import('./modules/${kebabCase(uiEntity.name)}/${kebabCase(uiEntity.name)}.module').then(m => m.${pascalCase(uiEntity.name)}Module),
    data: {
      state: '${pluralize(uiEntity.name)}',
      slug: '${pascalCase(pluralize(pluralize(uiEntity.name)))}',
      icon: 'tag',
      type: 'resource'
    }
  }
]`;
      childrenRoutes.replaceWithText(initialized.replace(/\n]$/, moduleRouteToInsert));
    }
  }
  await project.save();
}
