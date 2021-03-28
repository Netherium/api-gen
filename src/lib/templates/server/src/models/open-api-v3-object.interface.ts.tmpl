/**
 * Interface according to specs https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#securityRequirementObject
 */
export interface OpenApiV3Object {
  openapi?: string,
  info?: InfoObject,
  servers?: ServerObject[],
  paths: Record<string, PathItemObject>
  components?: ComponentsObject,
  security?: Record<string, string[]>[],
  tags?: TagObject[],
  externalDocs?: ExternalDocumentationObject[]
}

interface InfoObject {
  title?: string,
  description?: string,
  termsOfService?: string,
  contact?: ContactObject,
  license?: LicenseObject,
  version: string
}

interface ContactObject {
  name?: string,
  url?: string,
  email?: string
}

interface LicenseObject {
  name: string,
  url?: string
}

interface ServerObject {
  url: string,
  description?: string,
  variables?: Record<string, ServerVariableObject>
}

interface ServerVariableObject {
  enum?: string[],
  default: string
  description?: string
}

interface ComponentsObject {
  schemas?: Record<string, SchemaObject | ReferenceObject>,
  responses?: Record<string, ResponseObject | ReferenceObject>,
  parameters?: Record<string, ParameterObject | ReferenceObject>,
  examples?: Record<string, ExampleObject | ReferenceObject>,
  requestBodies?: Record<string, RequestBodyObject | ReferenceObject>,
  headers?: Record<string, HeaderObject | ReferenceObject>,
  securitySchemes?: Record<string, SecuritySchemeObject | ReferenceObject>,
  links?: Record<string, LinkObject | ReferenceObject>,
  callbacks?: Record<string, CallbackObject | ReferenceObject>,
}

interface PathItemObject {
  $ref?: string,
  summary?: string,
  description?: string,
  get?: OperationObject,
  put?: OperationObject,
  post?: OperationObject,
  delete?: OperationObject,
  options?: OperationObject,
  head?: OperationObject,
  patch?: OperationObject,
  trace?: OperationObject,
  servers?: ServerObject[],
  parameters?: (ParameterObject | ReferenceObject)[],
}

interface OperationObject {
  tags?: string[],
  summary?: string,
  description?: string,
  externalDocs?: ExternalDocumentationObject,
  operationId?: string,
  parameters?: (ParameterObject | ReferenceObject)[],
  requestBody?: RequestBodyObject | ReferenceObject,
  responses: Record<string, ReferenceObject | ResponseObject>,
  callbacks?: Record<string, CallbackObject | ReferenceObject>,
  deprecated?: boolean,
  security?: Record<string, string[]>[],
  servers?: ServerObject[],
}

interface ExternalDocumentationObject {
  url: string,
  description?: string
}

interface ParameterObject extends ParameterBaseObject {
  name?: string,
  in: 'query' | 'header' | 'path' | 'cookie'
}

interface ParameterBaseObject {
  description?: string,
  required: boolean,
  deprecated?: boolean,
  allowEmptyValue?: boolean,
  style?: string,
  explode?: boolean,
  allowReserved?: boolean,
  schema?: SchemaObject | ReferenceObject,
  example?: any,
  examples?: Record<string, ExampleObject | ReferenceObject>
}

interface RequestBodyObject {
  description?: string,
  content: Record<string, MediaTypeObject>,
  required?: boolean
}

interface MediaTypeObject {
  schema?: SchemaObject | ReferenceObject,
  example?: any,
  examples?: Record<string, ExampleObject | ReferenceObject>,
  encoding?: Record<string, EncodingObject>
}


interface EncodingObject {
  contentType?: string,
  headers?: Record<string, HeaderObject | ReferenceObject>,
  style?: string,
  explode?: boolean,
  allowReserved?: boolean,
}

interface ResponseObject {
  description?: string,
  headers?: Record<string, HeaderObject | ReferenceObject>,
  content?: Record<string, MediaTypeObject>,
  links?: Record<string, LinkObject | ReferenceObject>,
}

interface CallbackObject {
  [url: string]: PathItemObject;
}

interface ExampleObject {
  summary?: string;
  description?: string;
  value?: any;
  externalValue?: string;
}

interface LinkObject {
  operationRef?: string;
  operationId?: string;
  parameters?: Record<string, any>;
  requestBody?: any;
  description?: string;
  server?: ServerObject;
}

// tslint:disable-next-line:no-empty-interface
interface HeaderObject extends ParameterBaseObject {
}

interface TagObject {
  name: string
  description?: string,
  externalDocs?: ExternalDocumentationObject
}


interface ReferenceObject {
  $ref: string
}

interface SchemaObject {
  title?: string
  multipleOf?: number,
  maximum?: number
  exclusiveMaximum?: boolean,
  minimum?: number
  exclusiveMinimum?: boolean
  maxLength?: number,
  minLength?: number,
  pattern?: string,
  maxItems?: number,
  minItems?: number,
  uniqueItems?: boolean,
  maxProperties?: number,
  minProperties?: number,
  required?: string[],
  enum?: any[],
  type?: string,
  allOf?: (SchemaObject | ReferenceObject)[],
  oneOf?: (SchemaObject | ReferenceObject)[],
  anyOf?: (SchemaObject | ReferenceObject)[],
  not?: SchemaObject | ReferenceObject,
  items?: SchemaObject | ReferenceObject,
  properties?: Record<string, SchemaObject | ReferenceObject>,
  additionalProperties?: boolean | SchemaObject | ReferenceObject,
  description?: string,
  format?: string,
  default?: any,
  nullable?: boolean,
  discriminator?: DiscriminatorObject,
  readOnly?: boolean,
  writeOnly?: boolean,
  xml?: XMLObject,
  externalDocs?: ExternalDocumentationObject,
  example?: any,
  deprecated?: boolean
}

interface DiscriminatorObject {
  propertyName: string,
  mapping?: Record<string, string>
}

interface XMLObject {
  name?: string,
  namespace?: string,
  prefix?: string,
  attribute?: boolean,
  wrapped?: boolean,
}

type SecuritySchemeObject =
  | HttpSecuritySchemeObject
  | ApiKeySecuritySchemeObject
  | OAuth2SecuritySchemeObject
  | OpenIdSecuritySchemeObject;

interface HttpSecuritySchemeObject {
  type: 'http';
  description?: string;
  scheme: string;
  bearerFormat?: string;
}

interface ApiKeySecuritySchemeObject {
  type: 'apiKey';
  description?: string;
  name: string;
  in: string;
}

interface OAuth2SecuritySchemeObject {
  type: 'oauth2';
  flows: {
    implicit?: {
      authorizationUrl: string;
      refreshUrl?: string;
      scopes: Record<string, string>;
    };
    password?: {
      tokenUrl: string;
      refreshUrl?: string;
      scopes: Record<string, string>;
    };
    clientCredentials?: {
      tokenUrl: string;
      refreshUrl?: string;
      scopes: Record<string, string>;
    };
    authorizationCode?: {
      authorizationUrl: string;
      tokenUrl: string;
      refreshUrl?: string;
      scopes: Record<string, string>;
    };
  };
}

interface OpenIdSecuritySchemeObject {
  type: 'openIdConnect';
  description?: string;
  openIdConnectUrl: string;
}
