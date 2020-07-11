import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import { HTTP_CREATED, HTTP_INTERNAL_SERVER_ERROR, HTTP_NO_CONTENT, HTTP_NOT_FOUND, HTTP_OK } from '../helpers/http.responses';

/** UserController.ts */
export class UserController {
  /** UserController.list() */
  public async list(req: Request, res: Response): Promise<Response> {
    try {
      const userCollection = await UserModel.find().populate(['role']).exec();
      return HTTP_OK(res, userCollection);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** UserController.show() */
  public async show(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    try {
      const userEntry = await UserModel.findOne({_id: id}).populate(['role']).exec();
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
      isVerified: req.body.isVerified,
      password: req.body.password
    });
    try {
      const userCreated = await userEntry.save();
      const userCreatedPopulated = await userCreated.populate('role').execPopulate();
      return HTTP_CREATED(res, userCreatedPopulated);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** UserController.update() */
  public async update(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const userUpdateData = {
      ...(req.body.email) && {email: req.body.email},
      ...(req.body.name) && {name: req.body.name},
      ...(req.body.role) && {role: req.body.role},
      ...(req.body.isVerified) && {isVerified: req.body.isVerified},
      ...(req.body.password) && {password: req.body.password}
    };
    try {
      const userUpdated = await UserModel.findByIdAndUpdate(id, userUpdateData, {new: true}).populate('role').exec();
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
