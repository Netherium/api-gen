import { Application, NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import resourcePermissionModel from '../models/resource-permission.model';
import { HTTP_FORBIDDEN, HTTP_INTERNAL_SERVER_ERROR, HTTP_UNAUTHORIZED } from '../helpers/http.responses';
import { ResourcePermissionSetting } from '../models/resource-pemission-setting.model';

export class Auth {
  static isAuthenticated() {
    return (req: Request, res: Response, next: NextFunction) => {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.secret, (err, decoded) => {
          if (err) {
            return res.status(403).json({message: 'Failed to authenticate token.'});
          } else {
            res.locals.authUser = decoded;
            next();
          }
        });
      } else {
        return res.status(403).json({message: 'Failed to authenticate token.'});
      }
    };
  }

  static getAcl() {
    return async (req: Request, res: Response, next: NextFunction) => {
      let rolesPerResourceMethod: any;
      try {
        const currentResource = req.baseUrl.replace(new RegExp('\/(.*)\/'), '');
        const currentMethod = req.route.stack.find((stackItem: any) => stackItem.name !== '<anonymous>').name;
        rolesPerResourceMethod = req.app.locals.resourcePermissions
          .find((resourcePermission: any) => resourcePermission.resourceName === currentResource).methods
          .find((methodName: any) => methodName.name === currentMethod).roles;
      } catch (err) {
        return HTTP_INTERNAL_SERVER_ERROR(res, 'No ACL');
      }
      if (rolesPerResourceMethod.some((role: { isAuthenticated: boolean; }) => role.isAuthenticated === false)) {
        next();
      } else {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          try {
            const token = req.headers.authorization.split(' ')[1];
            res.locals.authUser = await jwt.verify(token, process.env.secret);
            if (rolesPerResourceMethod.some((role: { name: string; }) => role.name === res.locals.authUser.role)) {
              next();
            } else {
              return HTTP_UNAUTHORIZED(res);
            }
          } catch {
            return HTTP_FORBIDDEN(res);
          }
        } else {
          return HTTP_FORBIDDEN(res);
        }
      }
    };
  }

  static async updateAppPermissions(req: Request = null, app: Application = null) {
    try {
      const resourcePermissionsDoc = await resourcePermissionModel.find()
        .populate({
          path: 'methods',
          populate: {
            path: 'roles',
            options: {lean: true}
          }
        }).lean().exec();
      const resourcePermissions = resourcePermissionsDoc.map((resourcePermission: any) => {
        return {
          resourceName: resourcePermission.resourceName,
          methods: resourcePermission.methods.map((method: any) => {
            return {
              name: method.name,
              roles: method.roles.map((role: { name: any; isAuthenticated: any; }) => {
                return {
                  name: role.name,
                  isAuthenticated: role.isAuthenticated
                };
              })
            };
          })
        };
      }) as ResourcePermissionSetting[];
      if (req === null) {
        app.locals.resourcePermissions = resourcePermissions;
      } else {
        req.app.locals.resourcePermissions = resourcePermissions;
      }
    } catch (err) {
      throw err;
    }
  }
}
