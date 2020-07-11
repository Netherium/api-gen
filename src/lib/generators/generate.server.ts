import { ImportDeclarationStructure, OptionalKind, Scope, SourceFileStructure, StructureKind, VariableDeclarationKind } from 'ts-morph';
import { UI } from '../interfaces/ui.model';
import pluralize from 'pluralize';

export const generateServer = (ui: UI): OptionalKind<SourceFileStructure> => {
  const registerRoutes: string[] = [];
  const importDeclarations: ImportDeclarationStructure[] = [];
  // 'this.express.use(\'/api/articles\', new ArticleRoute().router);'
  ui.entities.forEach(entity => {
        registerRoutes.push(`this.express.use('/api/${pluralize(entity.name)}', new ${entity.capitalizedName}Route().router);`);
        importDeclarations.push(
            {
              kind: StructureKind.ImportDeclaration,
              isTypeOnly: false,
              moduleSpecifier: `./routes/${entity.name}.route`,
              namedImports: [{kind: StructureKind.ImportSpecifier, name: `${entity.capitalizedName}Route`}]
            }
        )
      }
  )


  return {
    statements: [
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: 'express',
        namespaceImport: 'express'
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: 'path',
        namedImports: [{kind: StructureKind.ImportSpecifier, name: 'resolve'}]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: 'dotenv',
        namedImports: [{kind: StructureKind.ImportSpecifier, name: 'config'}]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: 'compression',
        namespaceImport: 'compression'
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: 'morgan',
        namespaceImport: 'logger'
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: 'cors',
        namespaceImport: 'cors'
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: 'mongoose',
        namespaceImport: 'mongoose'
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: 'errorhandler',
        namespaceImport: 'errorHandler'
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: 'swagger-ui-express',
        namespaceImport: 'swaggerUI'
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: 'yamljs',
        namespaceImport: 'yaml'
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './middleware/auth',
        namedImports: [{kind: StructureKind.ImportSpecifier, name: 'Auth'}]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './routes/upload.route',
        namedImports: [{kind: StructureKind.ImportSpecifier, name: 'UploadRoute'}]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './routes/resource-permission.route',
        namedImports: [{kind: StructureKind.ImportSpecifier, name: 'ResourcePermissionRoute'}]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './routes/role.route',
        namedImports: [{kind: StructureKind.ImportSpecifier, name: 'RoleRoute'}]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './routes/auth.route',
        namedImports: [{kind: StructureKind.ImportSpecifier, name: 'AuthRoute'}]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './routes/root.route',
        namedImports: [{kind: StructureKind.ImportSpecifier, name: 'RootRoute'}]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './routes/user.route',
        namedImports: [{kind: StructureKind.ImportSpecifier, name: 'UserRoute'}]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './routes/article.route',
        namedImports: [{kind: StructureKind.ImportSpecifier, name: 'ArticleRoute'}]
      },
      ...importDeclarations,
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './services/endpoint.service',
        namedImports: [{kind: StructureKind.ImportSpecifier, name: 'EndpointService'}]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './routes/endpoint.route',
        namedImports: [{kind: StructureKind.ImportSpecifier, name: 'EndpointRoute'}]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './services/upload.service',
        namedImports: [{kind: StructureKind.ImportSpecifier, name: 'UploadService'}]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './helpers/http.responses',
        namedImports: [{kind: StructureKind.ImportSpecifier, name: 'HTTP_BAD_REQUEST'}, {
          kind: StructureKind.ImportSpecifier,
          name: 'HTTP_NOT_FOUND'
        }]
      },
      {
        isAbstract: false,
        name: 'App',
        isExported: false,
        isDefaultExport: false,
        hasDeclareKeyword: false,
        kind: StructureKind.Class,
        ctors: [{
          statements: ['this.express = express();', 'this.setupEnvironment();', 'this.middleware();', 'this.enableCors();', 'this.routes();', 'this.registerServices();', 'this.registerHttpExceptions();', 'this.launch();'],
          kind: StructureKind.Constructor,
        }],
        methods: [{
          name: 'setupEnvironment',
          statements: ['switch (process.env.NODE_ENV) {\r\n  case \'production\': {\r\n    config({path: resolve(__dirname, \'../.env.production\')});\r\n    break;\r\n  }\r\n  case \'test\': {\r\n    this.express.use(errorHandler());\r\n    config({path: resolve(__dirname, \'../.env.test\')});\r\n    break;\r\n  }\r\n  default: {\r\n    this.express.use(logger(\'dev\'));\r\n    this.express.use(errorHandler());\r\n    config({path: resolve(__dirname, \'../.env\')});\r\n    break;\r\n  }\r\n}'],
          docs: [{kind: StructureKind.JSDoc, description: '\r\nLoad .env and set logging',}],
          isGenerator: false,
          isAsync: false,
          isStatic: false,
          hasQuestionToken: false,
          scope: Scope.Private,
          isAbstract: false,
          kind: StructureKind.Method,
        },
          {
            name: 'middleware',
            statements: ['this.express.set(\'port\', process.env.PORT);', 'this.express.set(\'address\', process.env.ADDRESS);', 'this.express.use(compression());', 'this.express.use(express.urlencoded({extended: true}));', 'this.express.use(express.json());'],
            docs: [{kind: StructureKind.JSDoc, description: '\r\nRegister Middleware',}],
            isGenerator: false,
            isAsync: false,
            isStatic: false,
            hasQuestionToken: false,
            scope: Scope.Private,
            isAbstract: false,
            kind: StructureKind.Method,
          },
          {
            name: 'enableCors',
            statements: [{
              isExported: false,
              isDefaultExport: false,
              hasDeclareKeyword: false,
              kind: StructureKind.VariableStatement,
              declarationKind: VariableDeclarationKind.Const,
              declarations: [{
                name: 'options',
                initializer: '{\r\n      allowedHeaders: [\'Origin\', \'X-Requested-With\', \'Content-Type\', \'Accept\', \'X-Access-Token\', \'Authorization\'],\r\n      credentials: true,\r\n      methods: \'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE\',\r\n      origin: \'*\',\r\n      preflightContinue: false\r\n    }',
                type: 'cors.CorsOptions',
                hasExclamationToken: false,
                kind: StructureKind.VariableDeclaration
              }]
            }, 'this.express.use(cors(options));', 'this.express.options(\'*\', cors(options));'],
            docs: [{kind: StructureKind.JSDoc, description: '\r\nEnable Cross-Origin Resource Sharing',}],
            isGenerator: false,
            isAsync: false,
            isStatic: false,
            hasQuestionToken: false,
            scope: Scope.Private,
            isAbstract: false,
            kind: StructureKind.Method,
          },
          {
            name: 'routes',
            statements: ['this.express.use(\'/\', new RootRoute().router);', 'this.express.use(\'/api/docs\', swaggerUI.serve, swaggerUI.setup(yaml.load(\'./swagger.yaml\'), {}));', 'if (process.env.UPLOAD_PROVIDER === \'local\') {\r\n  this.express.use(\'/uploads\', express.static(process.env.UPLOAD_PROVIDER_FOLDER));\r\n}', 'this.express.use(\'/api/auth\', new AuthRoute().router);', 'this.express.use(\'/api/users\', new UserRoute().router);', 'this.express.use(\'/api/resource-permissions\', new ResourcePermissionRoute().router);', 'this.express.use(\'/api/roles\', new RoleRoute().router);', 'this.express.use(\'/api/uploads\', new UploadRoute().router);', 'this.express.use(\'/api/endpoints\', new EndpointRoute().router);', 'this.express.use(\'/api/articles\', new ArticleRoute().router);', ...registerRoutes],
            docs: [{kind: StructureKind.JSDoc, description: '\r\nRegister routes',}],
            isGenerator: false,
            isAsync: false,
            isStatic: false,
            hasQuestionToken: false,
            scope: Scope.Private,
            isAbstract: false,
            kind: StructureKind.Method,
          },
          {
            name: 'registerServices',
            statements: ['this.express.set(\'services\', {\r\n  uploadService: new UploadService(),\r\n  endpointService: new EndpointService(this.express)\r\n});'],
            docs: [{kind: StructureKind.JSDoc, description: '\r\nRegister services',}],
            isGenerator: false,
            isAsync: false,
            isStatic: false,
            hasQuestionToken: false,
            scope: Scope.Private,
            isAbstract: false,
            kind: StructureKind.Method,
          },
          {
            name: 'registerHttpExceptions',
            statements: ['this.express.use((req: express.Request, res: express.Response) => {\r\n  return HTTP_NOT_FOUND(res);\r\n});', 'this.express.use((err: any, req: express.Request, res: express.Response) => {\r\n  return HTTP_BAD_REQUEST(res, err);\r\n});'],
            docs: [{kind: StructureKind.JSDoc, description: '\r\nRegister 404 / 400 responses',}],
            isGenerator: false,
            isAsync: false,
            isStatic: false,
            hasQuestionToken: false,
            scope: Scope.Private,
            isAbstract: false,
            kind: StructureKind.Method,
          },
          {
            name: 'launch',
            statements: [{
              isExported: false,
              isDefaultExport: false,
              hasDeclareKeyword: false,
              kind: StructureKind.VariableStatement,
              declarationKind: VariableDeclarationKind.Const,
              declarations: [{
                name: 'mongooseOptions',
                initializer: '{\r\n      useNewUrlParser: true,\r\n      useCreateIndex: true,\r\n      useFindAndModify: false,\r\n      useUnifiedTopology: true\r\n    }',
                type: 'mongoose.ConnectionOptions',
                hasExclamationToken: false,
                kind: StructureKind.VariableDeclaration
              }]
            }, 'mongoose.connect(process.env.MONGODB_URL, mongooseOptions)\r\n.then(() => {\r\n  // tslint:disable-next-line:no-console\r\n  console.info(`MongoDB connected at ${process.env.MONGODB_URL}`);\r\n  this.express.listen(this.express.get(\'port\'), this.express.get(\'address\'), async () => {\r\n    // tslint:disable-next-line\r\n    console.info(`API running at http://${this.express.get(\'address\')}:${this.express.get(\'port\')} in ${this.express.get(\'env\')} mode`);\r\n    await Auth.updateAppPermissions(null, this.express);\r\n    this.express.emit(\'Express_TS_Started\');\r\n  });\r\n})\r\n.catch((err) => {\r\n  console.error(`MongoDB cannot connect at ${process.env.MONGODB_URL}\\nError: ${err}`);\r\n  process.exit(1);\r\n});'],
            docs: [{kind: StructureKind.JSDoc, description: '\r\nConnect to DB and launch app',}],
            isGenerator: false,
            isAsync: false,
            isStatic: false,
            hasQuestionToken: false,
            scope: Scope.Private,
            isAbstract: false,
            kind: StructureKind.Method,
          }],
        properties: [{
          name: 'express',
          type: 'express.Application',
          hasQuestionToken: false,
          hasExclamationToken: false,
          isReadonly: false,
          isStatic: false,
          scope: Scope.Public,
          isAbstract: false,
          hasDeclareKeyword: false,
          kind: StructureKind.Property
        }],
      },
      {kind: StructureKind.ExportAssignment, expression: 'new App()', isExportEquals: false}], kind: StructureKind.SourceFile
  }
}
