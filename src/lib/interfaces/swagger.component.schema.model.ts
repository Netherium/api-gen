export interface SwaggerComponentSchema {
  [key: string]: {
    type: string,
    properties: SwaggerPropertiesSchema,
    required?: string[],
  }
}

export interface SwaggerPropertiesSchema {
  [key: string]: {
    type?: string,
    format?: string,
    readOnly?: boolean,
    writeOnly?: boolean
    $ref?: string
    items?: SwaggerPropertiesSchema
  }
}
