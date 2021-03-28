import { Request, Response } from 'express';
import MediaObjectModel from '../models/media-object.model';
import {
  HTTP_CREATED,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_NO_CONTENT,
  HTTP_NOT_FOUND,
  HTTP_OK,
  HTTP_UNPROCESSABLE_ENTITY
} from '../helpers/http.responses';
import { MediaObject, UploadService } from '../services/upload.service';
import { UploadedFile } from 'express-fileupload';
import { queryBuilderCollection } from '../helpers/query-builder-collection';

/** UploadController.ts */
export class MediaObjectController {

  /** UploadController.list() */
  public async list(req: Request, res: Response): Promise<Response> {
    try {
      const mediaObjectCollection = await queryBuilderCollection(req, MediaObjectModel);
      return HTTP_OK(res, mediaObjectCollection);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** UploadController.show() */
  public async show(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    try {
      const mediaObjectEntry = await MediaObjectModel.findOne({_id: id}).exec();
      if (!mediaObjectEntry) {
        return HTTP_NOT_FOUND(res);
      }
      return HTTP_OK(res, mediaObjectEntry);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** UploadController.create() */
  public async create(req: Request, res: Response): Promise<Response> {
    if (!req.files || Object.keys(req.files).length === 0 || typeof req.files.file !== 'object' || req.files.file === null) {
      return HTTP_UNPROCESSABLE_ENTITY(res);
    }
    // TODO Check for all allowed media types
    // @ts-ignore
    // if (!isMimeTypePhoto(req.files.file.mimetype)) {
    //   return HTTP_UNSUPPORTED_MEDIA_TYPE(res);
    // }
    try {
      const {uploadService}: { uploadService: UploadService } = req.app.get('services');
      const uploadedFile = await uploadService.uploadFile(req.files.file as UploadedFile, req.body.alternativeText, req.body.caption);
      const mediaObjectEntry = new MediaObjectModel(uploadedFile);
      const mediaObjectCreated = await mediaObjectEntry.save();
      return HTTP_CREATED(res, mediaObjectCreated);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** UploadController.update() */
  public async update(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const mediaObjectModified = {
      ...(req.body.alternativeText !== undefined) && {alternativeText: req.body.alternativeText},
      ...(req.body.caption !== undefined) && {caption: req.body.caption}
    };
    try {
      const mediaObjectUpdated = await MediaObjectModel.findByIdAndUpdate(id, mediaObjectModified, {new: true}).exec();
      if (!mediaObjectUpdated) {
        return HTTP_NOT_FOUND(res);
      }
      return HTTP_OK(res, mediaObjectUpdated);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** UploadController.delete() */
  public async delete(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    try {
      const {uploadService}: { uploadService: UploadService } = req.app.get('services');
      const mediaObjectDeleted = await MediaObjectModel.findByIdAndDelete(id).exec();
      if (!mediaObjectDeleted) {
        return HTTP_NOT_FOUND(res);
      }
      await uploadService.deleteFile(mediaObjectDeleted.toObject() as MediaObject);
      return HTTP_NO_CONTENT(res);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

}
