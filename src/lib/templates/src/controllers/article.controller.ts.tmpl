import { Request, Response } from 'express';
import ArticleModel from '../models/article.model';
import { HTTP_CREATED, HTTP_INTERNAL_SERVER_ERROR, HTTP_NO_CONTENT, HTTP_NOT_FOUND, HTTP_OK } from '../helpers/http.responses';

/**
 * articleController.ts
 * @description :: Server-side logic for managing articles.
 */
export class ArticleController {

  /**
   * ArticleController.list()
   */
  public async list(req: Request, res: Response): Promise<Response> {
    try {
      const articleCollection = await ArticleModel.find().populate(['author']).exec();
      return HTTP_OK(res, articleCollection);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /**
   * ArticleController.show()
   */
  public async show(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const articleEntry = await ArticleModel.findOne({_id: id}).populate('author').exec();
      if (!articleEntry) {
        return HTTP_NOT_FOUND(res);
      }
      return HTTP_OK(res, articleEntry);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /**
   * ArticleController.create()
   */
  public async create(req: Request, res: Response) {
    const userId = res.locals.authUser;
    const articleEntry = new ArticleModel({
      title: req.body.title,
      author: userId
    });
    try {
      const articleCreated = await articleEntry.save();
      const articleCreatedPopulated = await articleCreated.populate('author').execPopulate();
      return HTTP_CREATED(res, articleCreatedPopulated);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /**
   * ArticleController.update()
   */
  public async update(req: Request, res: Response) {
    const id = req.params.id;
    const articleEntryModified: any = {
      ...(req.body.title) && {title: req.body.title}
    };
    articleEntryModified.author = res.locals.authUser;
    try {
      const articleEntry = await ArticleModel.findByIdAndUpdate(id, articleEntryModified, {new: true}).populate('author').exec();
      if (!articleEntry) {
        return HTTP_NOT_FOUND(res);
      }
      return HTTP_OK(res, articleEntry);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

  /**
   * ArticleController.delete()
   */
  public async delete(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const articleDeleted = await ArticleModel.findByIdAndDelete(id);
      if (!articleDeleted) {
        return HTTP_NOT_FOUND(res);
      }
      return HTTP_NO_CONTENT(res);
    } catch (err) {
      return HTTP_INTERNAL_SERVER_ERROR(res, err);
    }
  }

}
