import { kebabCase, pascalCase } from '../../helpers/string-functions';
import { generateController } from './generate-controller';
import { generateModel } from './generate-model';
import { generateRoute } from './generate-route';
import { Project, ProjectOptions, StructureKind } from 'ts-morph';
import { UI } from '../../interfaces/ui.model';
import { generateServer } from './generate-server';
import pluralize from 'pluralize';


export const generateServerSuite =
  (projectOptions: ProjectOptions, userInput: UI, serverSuiteDir: string): { project: Project, entitiesWritten: any } => {
    const project = new Project(projectOptions);
    const entitiesWritten: any = [];
    const baseEntitiesDir = `${serverSuiteDir}/src`;
    for (const uiEntity of userInput.entities) {
      const controllerFile = project.createSourceFile(
        `${baseEntitiesDir}/controllers/${kebabCase(uiEntity.name)}.controller.ts`,
        generateController(uiEntity),
        {overwrite: true}
      );

      const modelFile = project.createSourceFile(
        `${baseEntitiesDir}/models/${kebabCase(uiEntity.name)}.model.ts`,
        generateModel(uiEntity),
        {overwrite: true}
      );

      const routeFile = project.createSourceFile(
        `${baseEntitiesDir}/routes/${kebabCase(uiEntity.name)}.route.ts`,
        generateRoute(uiEntity),
        {overwrite: true}
      );

      entitiesWritten.push(
        {
          name: uiEntity.name,
          controllerFilePath: controllerFile.getFilePath(),
          modelFilePath: modelFile.getFilePath(),
          routeFilePath: routeFile.getFilePath()
        }
      )
    }
    if (userInput.generateApp) {
      project.createSourceFile(
        `${baseEntitiesDir}/server.ts`,
        generateServer(userInput),
        {overwrite: true}
      );
    }
    return {project, entitiesWritten};
  }

export const updateServerFile = async (projectOptions: ProjectOptions, userInput: UI, serverSuiteDir: string) => {
  const project = new Project(projectOptions);
  for (const uiEntity of userInput.entities) {
    const serverPath = `${serverSuiteDir}/src/server.ts`;
    const serverFileSource = project.addSourceFileAtPath(serverPath);
    const appStructure = serverFileSource.getClass('App').getStructure();
    const routesMethod = appStructure.methods.find(item => {
      return item.name === 'routes';
    });
    if ('statements' in routesMethod) {
      const routesStatements = routesMethod.statements as string[];
      const routeStatement = `this.express.use('/api/${pluralize(kebabCase(uiEntity.name))}', new ${pascalCase(uiEntity.name)}Route().router);`
      if (!routesStatements.includes(routeStatement)) {
        routesStatements.push(routeStatement);
        appStructure.methods.map(item => {
          if (item.name === 'routes') {
            item = routesMethod;
          }
          return item;
        });
        serverFileSource.getClass('App').set(appStructure);
      }
      const importsDeclarations = serverFileSource.getImportDeclarations();
      let importFound = false;
      const moduleSpecifier = `./routes/${kebabCase(uiEntity.name)}.route`;
      for (const importDeclaration of importsDeclarations) {
        if (importDeclaration.getStructure().moduleSpecifier === moduleSpecifier ) {
          importFound = true;
          break;
        }
      }
      if (!importFound) {
        serverFileSource.addImportDeclaration({
            kind: StructureKind.ImportDeclaration,
            isTypeOnly: false,
            moduleSpecifier: moduleSpecifier,
            namedImports: [{kind: StructureKind.ImportSpecifier, name: `${pascalCase(uiEntity.name)}Route`}]
          }
        )
      }
      await project.save();
    }
  }
}
