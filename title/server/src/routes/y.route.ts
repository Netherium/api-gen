import { Router } from 'express';
import { YController } from '../controllers/y.controller';
import { Auth } from '../middleware/auth';

export class YRoute {
  public router = Router();

  constructor() {
    const controller = new YController();
    this.router.get('/', Auth.getAcl(), controller.list);
    this.router.get('/:id', Auth.getAcl(), controller.show);
    this.router.post('/', Auth.getAcl(), controller.create);
    this.router.put('/:id', Auth.getAcl(), controller.update);
    this.router.delete('/:id', Auth.getAcl(), controller.delete);
  }
}
