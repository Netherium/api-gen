import { Request, Response } from 'express';
import {
  HTTP_CREATED,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_NO_CONTENT,
  HTTP_NOT_FOUND,
  HTTP_OK,
  HTTP_UNAUTHORIZED
} from '../helpers/http.responses';
import RoleModel from '../models/role.model';
import UserModel from '../models/user.model';
import ResourcePermissionModel from '../models/resource-permission.model';
import { Auth } from '../middleware/auth';

/**
 * auth.controller.ts
 * @description :: Server-side logic for managing users.
 */
export class AuthController {

  /**
   * AuthController.login()
   */
  public async getToken(req: Request, res: Response) {
    try {
      const userEntry: any = await UserModel.findOne({email: req.body.email}).populate('role');
      if (!userEntry || !req.body.password || !userEntry.validPassword(req.body.password)) {
        return HTTP_UNAUTHORIZED(res);
      }
      return HTTP_CREATED(res, {token: await userEntry.generateJWT()});
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /**
   * AuthController.profile()
   */
  public async show(req: Request, res: Response) {
    const authUser = res.locals.authUser;
    try {
      const userEntry = await UserModel.findOne({_id: authUser._id}).populate('role').populate('display').exec();
      if (!userEntry) {
        return HTTP_NOT_FOUND(res);
      }
      return HTTP_OK(res, userEntry);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /**
   * AuthController.register()
   */
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const publicRole = await RoleModel.findOne({isAuthenticated: false});
      const userEntry = new UserModel({
        email: req.body.email,
        name: req.body.name,
        role: publicRole,
        display: req.body.display,
        isVerified: false,
        password: req.body.password
      });
      const userCreated = await userEntry.save();
      return HTTP_CREATED(res, userCreated);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /**
   * AuthController.update()
   */
  public async update(req: Request, res: Response) {
    const authUser = res.locals.authUser;
    const userEntryModified: any = {
      ...(req.body.email !== undefined) && {email: req.body.email},
      ...(req.body.name !== undefined) && {name: req.body.name},
      ...(req.body.password !== undefined) && {password: req.body.password},
      ...(req.body.display !== undefined) && {display: req.body.display}
    };
    try {
      const userEntry = await UserModel.findByIdAndUpdate(authUser._id, userEntryModified, {new: true}).populate('role').exec();
      if (!userEntry) {
        return HTTP_NOT_FOUND(res);
      }
      return HTTP_OK(res, userEntry);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /**
   * AuthController.delete()
   */
  public async delete(req: Request, res: Response) {
    const id = res.locals.authUser;
    try {
      const userDeleted = await UserModel.findByIdAndDelete(id);
      if (!userDeleted) {
        return HTTP_NOT_FOUND(res);
      }
      return HTTP_NO_CONTENT(res);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /**
   * AuthController.init()
   * Initializes the application
   * - Creates 2 basic Roles, 1 Public and 1 Admin
   * - Creates an admin User based on .env configuration
   * - Creates a resource permission, with defaults to admin access only,
   *  for each of the following resources
   *  'roles', 'users', 'resource-permissions', 'endpoints', 'uploads', 'articles'
   * - Updates Permissions so that will be reflected in all routes instantly
   */
  public async init(req: Request, res: Response) {
    const publicRoleEntry = new RoleModel(
      {
        name: 'Public',
        description: 'Unauthenticated user',
        isAuthenticated: false
      }
    );
    const adminRoleEntry = new RoleModel(
      {
        name: 'Admin',
        description: 'Top level authenticated user',
        isAuthenticated: true
      }
    );
    const adminUserEntry = new UserModel({
      email: process.env.ADMIN_EMAIL,
      name: process.env.ADMIN_NAME,
      role: adminRoleEntry,
      isVerified: true,
      password: process.env.ADMIN_PASSWORD,
    });
    const userExists = await UserModel.findOne({email: adminUserEntry.get('email')});
    const rolesExist = await RoleModel.findOne({
      $or: [
        {name: publicRoleEntry.get('name')},
        {name: adminRoleEntry.get('name')}
      ]
    }).exec();
    if (userExists || rolesExist) {
      return HTTP_INTERNAL_SERVER_ERROR(res, 'Admin or Roles already exist');
    }
    try {
      const publicRoleCreated = await publicRoleEntry.save();
      const adminRoleCreated = await adminRoleEntry.save();
      const adminUserCreated = await adminUserEntry.save();
      const resourceNames = ['roles', 'users', 'resource-permissions', 'endpoints', 'media-objects', 'books'];
      const methodNames = ['list', 'show', 'create', 'update', 'delete'];
      const resourcesCreated = [];
      // For each resourceName save a resource-permission that has admin roles to all its methods
      for (const resourceName of resourceNames) {
        const resourceEntry = new ResourcePermissionModel({
          resourceName,
          methods: methodNames
            .filter((method) => {
              if (resourceName !== 'endpoints') {
                return true;
              } else {
                return method === 'list';
              }
            })
            .map((method) => {
              return {
                roles: [adminRoleCreated],
                name: method
              };
            })
        });

        resourcesCreated.push(await resourceEntry.save());
      }
      await Auth.updateAppPermissions(req);
      return HTTP_CREATED(res, {
        roles: [publicRoleCreated, adminRoleCreated],
        admin: adminUserCreated,
        resourcePermissions: resourcesCreated
      });
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }
}
