import { Router } from 'express';
import { UploadController } from '../controllers/upload.controller';
import { Auth } from '../middleware/auth';
import * as fileUpload from 'express-fileupload';

export class UploadRoute {
  public router = Router();

  constructor() {
    const controller = new UploadController();
    this.router.get('/', Auth.getAcl(), controller.list);
    this.router.get('/:id', Auth.getAcl(), controller.show);
    this.router.post('/', [Auth.getAcl(), fileUpload()], controller.create);
    this.router.put('/:id', Auth.getAcl(), controller.update);
    this.router.delete('/:id', Auth.getAcl(), controller.delete);
  }
}
