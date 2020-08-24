import { Request, Response } from 'express';
import RoleModel from '../models/role.model';
import { HTTP_CREATED, HTTP_INTERNAL_SERVER_ERROR, HTTP_NO_CONTENT, HTTP_NOT_FOUND, HTTP_OK } from '../helpers/http.responses';
import { queryBuilderCollection } from '../helpers/query-builder-collection';


/** RoleController.ts */
export class RoleController {
  /** RoleController.list() */
  public async list(req: Request, res: Response): Promise<Response> {
    try {
      const roleCollection = await queryBuilderCollection(req, RoleModel);
      return HTTP_OK(res, roleCollection);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** RoleController.show() */
  public async show(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    try {
      const roleEntry = await RoleModel.findOne({_id: id});
      if (!roleEntry) {
        return HTTP_NOT_FOUND(res);
      }
      return HTTP_OK(res, roleEntry);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** RoleController.create() */
  public async create(req: Request, res: Response): Promise<Response> {
    const roleEntry = new RoleModel({
      name: req.body.name,
      isAuthenticated: req.body.isAuthenticated,
      description: req.body.description
    });
    try {
      const roleCreated = await roleEntry.save();
      return HTTP_CREATED(res, roleCreated);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** RoleController.update() */
  public async update(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const roleUpdateData = {
      ...(req.body.name !== undefined) && {name: req.body.name},
      ...(req.body.isAuthenticated !== undefined) && {isAuthenticated: req.body.isAuthenticated},
      ...(req.body.description !== undefined) && {description: req.body.description}
    };
    try {
      const roleUpdated = await RoleModel.findByIdAndUpdate(id, roleUpdateData, {new: true});
      if (!roleUpdated) {
        return HTTP_NOT_FOUND(res);
      }
      return HTTP_OK(res, roleUpdated);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** RoleController.delete() */
  public async delete(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    try {
      const roleDeleted = await RoleModel.findByIdAndDelete(id);
      if (!roleDeleted) {
        return HTTP_NOT_FOUND(res);
      }
      return HTTP_NO_CONTENT(res);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }
}
