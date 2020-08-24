import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import {
  HTTP_CREATED,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_NO_CONTENT,
  HTTP_NOT_FOUND,
  HTTP_OK
} from '../helpers/http.responses';
import { queryBuilderCollection } from '../helpers/query-builder-collection';


/** UserController.ts */
export class UserController {
  /** UserController.list() */
  public async list(req: Request, res: Response): Promise<Response> {
    try {
      const userCollection = await queryBuilderCollection(req, UserModel, [{path: 'role'}, {path: 'display'}]);
      return HTTP_OK(res, userCollection);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** UserController.show() */
  public async show(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    try {
      const userEntry = await UserModel.findOne({_id: id}).populate('role').populate('display').exec();
      if (!userEntry) {
        return HTTP_NOT_FOUND(res);
      }
      return HTTP_OK(res, userEntry);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** UserController.create() */
  public async create(req: Request, res: Response): Promise<Response> {
    const userEntry = new UserModel({
      email: req.body.email,
      name: req.body.name,
      role: req.body.role,
      display: req.body.display,
      isVerified: req.body.isVerified,
      password: req.body.password
    });
    try {
      const userCreated = await userEntry.save();
      const userCreatedPopulated = await userCreated.populate('role').populate('display').execPopulate();
      return HTTP_CREATED(res, userCreatedPopulated);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** UserController.update() */
  public async update(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const userUpdateData = {
      ...(req.body.email !== undefined) && {email: req.body.email},
      ...(req.body.name !== undefined) && {name: req.body.name},
      ...(req.body.role !== undefined) && {role: req.body.role},
      ...(req.body.display !== undefined) && {display: req.body.display},
      ...(req.body.isVerified !== undefined) && {isVerified: req.body.isVerified},
      ...(req.body.password !== undefined) && {password: req.body.password}
    };
    try {
      const userUpdated = await UserModel.findByIdAndUpdate(id, userUpdateData, {new: true}).populate('role').populate('display').exec();
      if (!userUpdated) {
        return HTTP_NOT_FOUND(res);
      }
      return HTTP_OK(res, userUpdated);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** UserController.delete() */
  public async delete(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
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
}
