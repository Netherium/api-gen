import { Request, Response } from 'express';
import YModel from '../models/y.model';
import { HTTP_CREATED, HTTP_INTERNAL_SERVER_ERROR, HTTP_NO_CONTENT, HTTP_NOT_FOUND, HTTP_OK } from '../helpers/http.responses';
import { queryBuilderCollection } from '../helpers/query-builder-collection';

/** YController.ts */
export class YController {
  /** YController.list() */
  public async list(req: Request, res: Response): Promise<Response> {
    try {
      const yCollection = await queryBuilderCollection(req, YModel, [{path: 'images'}]);
      return HTTP_OK(res, yCollection);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** YController.show() */
  public async show(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    try {
      const yEntry = await YModel.findOne({_id: id}).populate('images').exec();
      if (!yEntry) {
        return HTTP_NOT_FOUND(res);
      }
      return HTTP_OK(res, yEntry);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** YController.create() */
  public async create(req: Request, res: Response): Promise<Response> {
    const yEntry = new YModel({
      tags: req.body.tags,
      images: req.body.images
    });
    try {
      const yCreated = await yEntry.save();
      const yCreatedPopulated = await yCreated.populate('images').execPopulate();
      return HTTP_CREATED(res, yCreatedPopulated);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** YController.update() */
  public async update(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const yUpdateData = {
      ...(req.body.tags !== undefined) && {tags: req.body.tags},
      ...(req.body.images !== undefined) && {images: req.body.images}
    };
    try {
      const yUpdated = await YModel.findByIdAndUpdate(id, yUpdateData, {new: true}).populate('images').exec();
      if (!yUpdated) {
        return HTTP_NOT_FOUND(res);
      }
      return HTTP_OK(res, yUpdated);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** YController.delete() */
  public async delete(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    try {
      const yDeleted = await YModel.findByIdAndDelete(id);
      if (!yDeleted) {
        return HTTP_NOT_FOUND(res);
      }
      return HTTP_NO_CONTENT(res);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }
}
