import { ImportDeclarationStructure, OptionalKind, Scope, SourceFileStructure, StructureKind, VariableDeclarationKind } from 'ts-morph';
import { UI } from '../../interfaces/ui.model';
import pluralize from 'pluralize';
import { kebabCase, pascalCase } from '../../helpers/string-functions';

export const generateServer = (ui: UI): OptionalKind<SourceFileStructure> => {
  const registerRoutes: string[] = [];
  const importDeclarations: ImportDeclarationStructure[] = [];
  ui.entities.forEach(uiEntity => {
      registerRoutes.push(
        `this.express.use('/api/${pluralize(kebabCase(uiEntity.name))}',
        new ${pascalCase(uiEntity.name)}Route().router);`
      );
      importDeclarations.push(
        {
          kind: StructureKind.ImportDeclaration,
          isTypeOnly: false,
          moduleSpecifier: `./routes/${kebabCase(uiEntity.name)}.route`,
          namedImports: [{kind: StructureKind.ImportSpecifier, name: `${pascalCase(uiEntity.name)}Route`}]
        }
      );
    }
  );

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
        namedImports: [
          {
            kind: StructureKind.ImportSpecifier,
            name: 'resolve'
          }
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: 'dotenv',
        namedImports: [
          {
            kind: StructureKind.ImportSpecifier,
            name: 'config'
          }
        ]
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
        moduleSpecifier: './helpers/http.responses',
        namedImports: [
          {
            kind: StructureKind.ImportSpecifier,
            name: 'HTTP_BAD_REQUEST'
          },
          {
            kind: StructureKind.ImportSpecifier,
            name: 'HTTP_NOT_FOUND'
          }
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './helpers/server.utils',
        namedImports: [
          {
            kind: StructureKind.ImportSpecifier,
            name: 'getApiURL'
          }
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './models/open-api-v3-object.interface',
        namedImports: [
          {
            kind: StructureKind.ImportSpecifier,
            name: 'OpenApiV3Object'
          }
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './middleware/auth',
        namedImports: [
          {
            kind: StructureKind.ImportSpecifier,
            name: 'Auth'
          }
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './services/upload.service',
        namedImports: [
          {
            kind: StructureKind.ImportSpecifier,
            name: 'UploadService'
          }
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './services/endpoint.service',
        namedImports: [
          {
            kind: StructureKind.ImportSpecifier,
            name: 'EndpointService'
          }
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './routes/media-object.route',
        namedImports: [
          {
            kind: StructureKind.ImportSpecifier,
            name: 'MediaObjectRoute'
          }
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './routes/resource-permission.route',
        namedImports: [
          {
            kind: StructureKind.ImportSpecifier,
            name: 'ResourcePermissionRoute'
          }
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './routes/role.route',
        namedImports: [
          {
            kind: StructureKind.ImportSpecifier,
            name: 'RoleRoute'
          }
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './routes/auth.route',
        namedImports: [
          {
            kind: StructureKind.ImportSpecifier,
            name: 'AuthRoute'
          }
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './routes/root.route',
        namedImports: [
          {
            kind: StructureKind.ImportSpecifier,
            name: 'RootRoute'
          }
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './routes/user.route',
        namedImports: [
          {
            kind: StructureKind.ImportSpecifier,
            name: 'UserRoute'
          }
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './routes/endpoint.route',
        namedImports: [
          {
            kind: StructureKind.ImportSpecifier,
            name: 'EndpointRoute'
          }
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: false,
        moduleSpecifier: './routes/book.route',
        namedImports: [
          {
            kind: StructureKind.ImportSpecifier,
            name: 'BookRoute'
          }
        ]
      },
      {
        isAbstract: false,
        name: 'App',
        isExported: false,
        isDefaultExport: false,
        hasDeclareKeyword: false,
        kind: StructureKind.Class,
        properties: [
          {
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
          }
        ],
        ctors: [
          {
            statements: [
              'this.express = express();',
              'this.setupEnvironment();',
              'this.middleware();',
              'this.enableCors();',
              'this.routes();',
              'this.setupSwagger();',
              'this.registerServices();',
              'this.registerHttpExceptions();',
              'this.launch();'
            ],
            kind: StructureKind.Constructor
          }
        ],
        methods: [
          {
            name: 'setupEnvironment',
            statements: [
              'switch (process.env.NODE_ENV) {\r\n  case \'production\': {\r\n    config({path: resolve(__dirname, \'../.env.production\')});\r\n    break;\r\n  }\r\n  case \'test\': {\r\n    this.express.use(errorHandler());\r\n    config({path: resolve(__dirname, \'../.env.test\')});\r\n    break;\r\n  }\r\n  default: {\r\n    this.express.use(logger(\'dev\'));\r\n    this.express.use(errorHandler());\r\n    config({path: resolve(__dirname, \'../.env\')});\r\n    break;\r\n  }\r\n}'
            ],
            docs: [
              {
                kind: StructureKind.JSDoc,
                description: '\r\nLoad .env and set logging'
              }
            ],
            isGenerator: false,
            isAsync: false,
            isStatic: false,
            hasQuestionToken: false,
            scope: Scope.Private,
            isAbstract: false,
            kind: StructureKind.Method
          },
          {
            name: 'middleware',
            statements: [
              'this.express.set(\'address\', process.env.ADDRESS);',
              'this.express.set(\'port\', process.env.PORT);',
              'this.express.use(compression());',
              'this.express.use(express.urlencoded({extended: true}));',
              'this.express.use(express.json());'
            ],
            docs: [
              {
                kind: StructureKind.JSDoc,
                description: '\r\nRegister Middleware'
              }
            ],
            isGenerator: false,
            isAsync: false,
            isStatic: false,
            hasQuestionToken: false,
            scope: Scope.Private,
            isAbstract: false,
            kind: StructureKind.Method
          },
          {
            name: 'enableCors',
            statements: [
              {
                isExported: false,
                isDefaultExport: false,
                hasDeclareKeyword: false,
                kind: StructureKind.VariableStatement,
                declarationKind: VariableDeclarationKind.Const,
                declarations: [
                  {
                    name: 'options',
                    initializer: '{\r\n      allowedHeaders: [\'Origin\', \'X-Requested-With\', \'Content-Type\', \'Accept\', \'X-Access-Token\', \'Authorization\'],\r\n      credentials: true,\r\n      methods: \'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE\',\r\n      origin: \'*\',\r\n      preflightContinue: false\r\n    }',
                    type: 'cors.CorsOptions',
                    hasExclamationToken: false,
                    kind: StructureKind.VariableDeclaration
                  }
                ]
              },
              'this.express.use(cors(options));',
              'this.express.options(\'*\', cors(options));'
            ],
            docs: [
              {
                kind: StructureKind.JSDoc,
                description: '\r\nEnable Cross-Origin Resource Sharing'
              }
            ],
            isGenerator: false,
            isAsync: false,
            isStatic: false,
            hasQuestionToken: false,
            scope: Scope.Private,
            isAbstract: false,
            kind: StructureKind.Method
          },
          {
            name: 'routes',
            statements: [
              'if (process.env.UPLOAD_PROVIDER === \'local\') {\r\n  this.express.use(\'/uploads\', express.static(process.env.UPLOAD_PROVIDER_FOLDER));\r\n}',
              'this.express.use(\'/\', new RootRoute().router);',
              'this.express.use(`/${process.env.API_NAME}/auth`, new AuthRoute().router);',
              'this.express.use(`/${process.env.API_NAME}/users`, new UserRoute().router);',
              'this.express.use(`/${process.env.API_NAME}/resource-permissions`, new ResourcePermissionRoute().router);',
              'this.express.use(`/${process.env.API_NAME}/roles`, new RoleRoute().router);',
              'this.express.use(`/${process.env.API_NAME}/media-objects`, new MediaObjectRoute().router);',
              'this.express.use(`/${process.env.API_NAME}/endpoints`, new EndpointRoute().router);',
              'this.express.use(`/${process.env.API_NAME}/books`, new BookRoute().router);'
            ],
            docs: [
              {
                kind: StructureKind.JSDoc,
                description: '\r\nRegister routes'
              }
            ],
            isGenerator: false,
            isAsync: false,
            isStatic: false,
            hasQuestionToken: false,
            scope: Scope.Private,
            isAbstract: false,
            kind: StructureKind.Method
          },
          {
            name: 'setupSwagger',
            statements: [
              {
                isExported: false,
                isDefaultExport: false,
                hasDeclareKeyword: false,
                kind: StructureKind.VariableStatement,
                declarationKind: VariableDeclarationKind.Const,
                declarations: [
                  {
                    name: 'options',
                    initializer: '{\r\n      customSiteTitle: process.env.SITE_TITLE,\r\n      swaggerOptions: {\r\n        layout: \'BaseLayout\',\r\n        tryItOutEnabled: true\r\n      }\r\n    }',
                    type: 'swaggerUI.SwaggerUiOptions',
                    hasExclamationToken: false,
                    kind: StructureKind.VariableDeclaration
                  }
                ]
              },
              {
                isExported: false,
                isDefaultExport: false,
                hasDeclareKeyword: false,
                kind: StructureKind.VariableStatement,
                declarationKind: VariableDeclarationKind.Const,
                declarations: [
                  {
                    name: 'swaggerDoc',
                    initializer: 'yaml.load(\'./swagger.yaml\') as OpenApiV3Object',
                    hasExclamationToken: false,
                    kind: StructureKind.VariableDeclaration
                  }
                ]
              },
              'swaggerDoc.info.title = process.env.SITE_TITLE;',
              'swaggerDoc.servers = [\r\n  {\r\n    url: getApiURL()\r\n  }\r\n];',
              'this.express.use(`/${process.env.API_NAME}/docs`, swaggerUI.serve, swaggerUI.setup(swaggerDoc, options));'
            ],
            docs: [
              {
                kind: StructureKind.JSDoc,
                description: '\r\nSetup Swagger and inject server configuration as defined in .env'
              }
            ],
            isGenerator: false,
            isAsync: false,
            isStatic: false,
            hasQuestionToken: false,
            scope: Scope.Private,
            isAbstract: false,
            kind: StructureKind.Method
          },
          {
            name: 'registerServices',
            statements: [
              'this.express.set(\'services\', {\r\n  uploadService: new UploadService(),\r\n  endpointService: new EndpointService(this.express)\r\n});'
            ],
            docs: [
              {
                kind: StructureKind.JSDoc,
                description: '\r\nRegister services'
              }
            ],
            isGenerator: false,
            isAsync: false,
            isStatic: false,
            hasQuestionToken: false,
            scope: Scope.Private,
            isAbstract: false,
            kind: StructureKind.Method
          },
          {
            name: 'registerHttpExceptions',
            statements: [
              'this.express.use((req: express.Request, res: express.Response) => {\r\n  return HTTP_NOT_FOUND(res);\r\n});',
              'this.express.use((err: any, req: express.Request, res: express.Response) => {\r\n  return HTTP_BAD_REQUEST(res, err);\r\n});'
            ],
            docs: [
              {
                kind: StructureKind.JSDoc,
                description: '\r\nRegister 404 / 400 responses'
              }
            ],
            isGenerator: false,
            isAsync: false,
            isStatic: false,
            hasQuestionToken: false,
            scope: Scope.Private,
            isAbstract: false,
            kind: StructureKind.Method
          },
          {
            name: 'launch',
            statements: [
              {
                isExported: false,
                isDefaultExport: false,
                hasDeclareKeyword: false,
                kind: StructureKind.VariableStatement,
                declarationKind: VariableDeclarationKind.Const,
                declarations: [
                  {
                    name: 'mongooseOptions',
                    initializer: '{\r\n      useNewUrlParser: true,\r\n      useCreateIndex: true,\r\n      useFindAndModify: false,\r\n      useUnifiedTopology: true\r\n    }',
                    type: 'mongoose.ConnectionOptions',
                    hasExclamationToken: false,
                    kind: StructureKind.VariableDeclaration
                  }
                ]
              },
              'mongoose.connect(process.env.MONGODB_URL, mongooseOptions)\r\n.then(() => {\r\n  // tslint:disable-next-line:no-console\r\n  console.info(`MongoDB connected at ${process.env.MONGODB_URL}`);\r\n  this.express.listen(this.express.get(\'port\'), this.express.get(\'address\'), async () => {\r\n    // tslint:disable-next-line\r\n    console.info(`API running at http://${this.express.get(\'address\')}:${this.express.get(\'port\')} in ${this.express.get(\'env\')} mode`);\r\n    await Auth.updateAppPermissions(null, this.express);\r\n    this.express.emit(\'Express_TS_Started\');\r\n  });\r\n})\r\n.catch((err: any) => {\r\n  console.error(`MongoDB cannot connect at ${process.env.MONGODB_URL}\\nError: ${err}`);\r\n  process.exit(1);\r\n});'
            ],
            docs: [
              {
                kind: StructureKind.JSDoc,
                description: '\r\nConnect to DB and launch app'
              }
            ],
            isGenerator: false,
            isAsync: false,
            isStatic: false,
            hasQuestionToken: false,
            scope: Scope.Private,
            isAbstract: false,
            kind: StructureKind.Method
          }
        ]
      },
      {
        kind: StructureKind.ExportAssignment,
        expression: 'new App()',
        isExportEquals: false
      }
    ],
    kind: StructureKind.SourceFile
  };
};
