import { Router, Request, Response, NextFunction } from 'express';
import TutorialController from '../controllers/tutorial.controller';
import { verifyToken, isAdmin } from '../middleware/authJwt';

class TutorialRoutes {
  public router: Router;
  private controller: TutorialController;

  constructor() {
    this.router = Router();
    this.controller = new TutorialController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', [verifyToken, isAdmin], this.wrapAsync(this.controller.create.bind(this.controller)));
    this.router.get('/user', verifyToken, this.wrapAsync(this.controller.findByUser.bind(this.controller)));
    this.router.get('/published', verifyToken, this.wrapAsync(this.controller.findAllPublished.bind(this.controller)));
    this.router.get('/:id', verifyToken, this.wrapAsync(this.controller.findOne.bind(this.controller)));
    this.router.get('/', verifyToken, this.wrapAsync(this.controller.findAll.bind(this.controller)));
    this.router.put('/:id', verifyToken, this.wrapAsync(this.controller.update.bind(this.controller)));
    this.router.delete('/:id', verifyToken, this.wrapAsync(this.controller.delete.bind(this.controller)));
    this.router.delete('/', [verifyToken, isAdmin], this.wrapAsync(this.controller.deleteAll.bind(this.controller)));
  }

  private wrapAsync(fn: (req: Request, res: Response, next?: NextFunction) => Promise<void | Response>) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}

export default new TutorialRoutes().router;