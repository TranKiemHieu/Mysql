import { Router } from 'express';
import { welcome } from '../controllers/home.controller';
import { signup, signin } from '../controllers/auth.controller';

class HomeRoutes {
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', welcome);
    this.router.post('/auth/signup', signup); 
    this.router.post('/auth/signin', signin);
  }
}

export default new HomeRoutes().router;