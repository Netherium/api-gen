import * as express from 'express';

interface Endpoint {
  endpointPath: string;
  method: string;
  handler: string;
}

export class EndpointService {
  private expressPathRegex = /^\/\^(.*)\\\/\?\(\?=\\\/\|\$\)\/i/;
  private app: express.Application;
  private basePath: string;

  constructor(app: express.Application, basePath: string = '') {
    this.app = app;
    this.basePath = basePath;
  }

  private static getMethodHandler(routeStack: any) {
    return routeStack.find((stackItem: any) => stackItem.name !== '<anonymous>');
  }

  public listApiEndpoints() {
    const stack = this.app.stack || (this.app._router && this.app._router.stack);
    const endPoints: Endpoint[] = [];
    stack.forEach((stackItem: any) => {
      if (stackItem.name === 'router') {
        if (this.expressPathRegex.test(stackItem.regexp)) {
          const routerEndpointPath = this.getEndpointPath(stackItem);
          stackItem.handle.stack.forEach((innerStackItem: any) => {
            const routeMethod = EndpointService.getMethodHandler(innerStackItem.route.stack);
            const endPoint: Endpoint = {
              endpointPath: routerEndpointPath + (innerStackItem.route.path === '/' ? '' : innerStackItem.route.path),
              method: routeMethod.method.toUpperCase(),
              handler: routeMethod.name
            };
            endPoints.push(endPoint);
          });
        }
      }
    });
    return endPoints;
  }

  private getEndpointPath(stackItem: any) {
    let routerEndpointPath = stackItem.regexp.toString().replace(this.expressPathRegex, '$1').replace(/\\\//g, '/');
    if (routerEndpointPath === '') {
      routerEndpointPath = '/';
    }
    return routerEndpointPath;
  }
}
