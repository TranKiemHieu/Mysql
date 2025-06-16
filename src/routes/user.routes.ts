import { Router, Request, Response, NextFunction } from 'express';
import UserController from '../controllers/user.controller';
import { verifyToken, isAdmin } from '../middleware/authJwt';

class UserRoutes {
    public router: Router;
    private controller: UserController;

    constructor() {
        this.router = Router();
        this.controller = new UserController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/:id', verifyToken, this.wrapAsync(this.controller.findOneUser.bind(this.controller)));
    }

    private wrapAsync(fn: (req: Request, res: Response, next?: NextFunction) => Promise<void | Response>) {
        return (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
    }
}

export default new UserRoutes().router;