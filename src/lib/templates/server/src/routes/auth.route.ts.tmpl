import { Router } from 'express';
import { Auth } from '../middleware/auth';
import { AuthController } from '../controllers/auth.controller';

export class AuthRoute {
  public router = Router();

  constructor() {
    const controller = new AuthController();
    this.router.post('/login', controller.getToken);
    this.router.get('/profile', Auth.isAuthenticated(), controller.show);
    this.router.post('/register', controller.create);
    this.router.put('/profile', Auth.isAuthenticated(), controller.update);
    this.router.delete('/profile', Auth.isAuthenticated(), controller.delete);
    this.router.get('/init', controller.init);
  }
}
