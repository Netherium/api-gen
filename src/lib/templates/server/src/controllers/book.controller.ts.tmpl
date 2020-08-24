import { Request, Response } from 'express';
import BookModel from '../models/book.model';
import { HTTP_CREATED, HTTP_INTERNAL_SERVER_ERROR, HTTP_NO_CONTENT, HTTP_NOT_FOUND, HTTP_OK } from '../helpers/http.responses';
import { queryBuilderCollection } from '../helpers/query-builder-collection';

/** BookController.ts */
export class BookController {
  /** BookController.list() */
  public async list(req: Request, res: Response): Promise<Response> {
    try {
      const bookCollection = await queryBuilderCollection(req, BookModel, [{path: 'author'}, {path: 'cover'}, {path: 'images'}, ]);
      return HTTP_OK(res, bookCollection);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** BookController.show() */
  public async show(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    try {
      const bookEntry = await BookModel.findOne({_id: id}).populate('author').populate('cover').populate('images').exec();
      if (!bookEntry) {
        return HTTP_NOT_FOUND(res);
      }
      return HTTP_OK(res, bookEntry);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** BookController.create() */
  public async create(req: Request, res: Response): Promise<Response> {
    const bookEntry = new BookModel({
      title: req.body.title,
      isbn: req.body.isbn,
      author: req.body.author,
      isPublished: req.body.isPublished,
      cover: req.body.cover,
      images: req.body.images,
      publishedAt: req.body.publishedAt,
      tags: req.body.tags
    });
    try {
      const bookCreated = await bookEntry.save();
      const bookCreatedPopulated = await bookCreated.populate('author').populate('cover').populate('images').execPopulate();
      return HTTP_CREATED(res, bookCreatedPopulated);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** BookController.update() */
  public async update(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const bookUpdateData = {
      ...(req.body.title !== undefined) && {title: req.body.title},
      ...(req.body.isbn !== undefined) && {isbn: req.body.isbn},
      ...(req.body.author !== undefined) && {author: req.body.author},
      ...(req.body.isPublished !== undefined) && {isPublished: req.body.isPublished},
      ...(req.body.cover !== undefined) && {cover: req.body.cover},
      ...(req.body.images !== undefined) && {images: req.body.images},
      ...(req.body.publishedAt !== undefined) && {publishedAt: req.body.publishedAt},
      ...(req.body.tags !== undefined) && {tags: req.body.tags}
    };
    try {
      const bookUpdated = await BookModel.findByIdAndUpdate(id, bookUpdateData, {new: true}).populate('author').populate('cover').populate('images').exec();
      if (!bookUpdated) {
        return HTTP_NOT_FOUND(res);
      }
      return HTTP_OK(res, bookUpdated);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /** BookController.delete() */
  public async delete(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    try {
      const bookDeleted = await BookModel.findByIdAndDelete(id);
      if (!bookDeleted) {
        return HTTP_NOT_FOUND(res);
      }
      return HTTP_NO_CONTENT(res);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }
}
