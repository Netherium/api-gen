import { Request, Response } from 'express';
import ResourcePermissionModel from '../models/resource-permission.model';
import { HTTP_CREATED, HTTP_INTERNAL_SERVER_ERROR, HTTP_NO_CONTENT, HTTP_NOT_FOUND, HTTP_OK } from '../helpers/http.responses';
import { Auth } from '../middleware/auth';
import { queryBuilderCollection } from '../helpers/query-builder-collection';

/** ResourcePermissionController.ts */
export class ResourcePermissionController {

  /** ResourcePermissionController.list() */
  public async list(req: Request, res: Response): Promise<Response> {
    try {
      const resourcePermissionCollection = await queryBuilderCollection(req, ResourcePermissionModel, [{
        path: 'methods',
        populate: {
          path: 'roles'
        }
      }]);
      return HTTP_OK(res, resourcePermissionCollection);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** ResourcePermissionController.show() */
  public async show(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    try {
      const resourcePermissionEntry = await ResourcePermissionModel.findOne({_id: id})
        .populate({
          path: 'methods',
          populate: {
            path: 'roles'
          }
        }).exec();
      if (!resourcePermissionEntry) {
        return HTTP_NOT_FOUND(res);
      }
      return HTTP_OK(res, resourcePermissionEntry);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** ResourcePermissionController.create() */
  public async create(req: Request, res: Response): Promise<Response> {
    const resourcePermissionEntry = new ResourcePermissionModel({
      resourceName: req.body.resourceName,
      methods: req.body.methods
    });
    try {
      const resourcePermissionCreated = await resourcePermissionEntry.save();
      const resourcePermissionCreatedPopulated = await resourcePermissionCreated.populate({
        path: 'methods',
        populate: {
          path: 'roles'
        }
      }).execPopulate();
      await Auth.updateAppPermissions(req);
      return HTTP_CREATED(res, resourcePermissionCreatedPopulated);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** ResourcePermissionController.update() */
  public async update(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const resourcePermissionUpdateData = {
      ...(req.body.resourceName !== undefined) && {resourceName: req.body.resourceName},
      ...(req.body.methods !== undefined) && {methods: req.body.methods}
    };
    try {
      const resourcePermissionUpdated = await ResourcePermissionModel.findByIdAndUpdate(id, resourcePermissionUpdateData, {new: true});
      if (!resourcePermissionUpdated) {
        return HTTP_NOT_FOUND(res);
      }
      const resourcePermissionUpdatedPopulated = await resourcePermissionUpdated.populate({
        path: 'methods',
        populate: {
          path: 'roles'
        }
      }).execPopulate();
      await Auth.updateAppPermissions(req);
      return HTTP_OK(res, resourcePermissionUpdatedPopulated);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** ResourcePermissionController.delete() */
  public async delete(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    try {
      const resourcePermissionDeleted = await ResourcePermissionModel.findByIdAndDelete(id);
      if (!resourcePermissionDeleted) {
        return HTTP_NOT_FOUND(res);
      }
      await Auth.updateAppPermissions(req);
      return HTTP_NO_CONTENT(res);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

}
