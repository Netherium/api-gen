export interface SwaggerPaths {
  [key: string]: {
    get?: string,
    post?: string,
    put?: string,
    delete?: string,
  }
}
