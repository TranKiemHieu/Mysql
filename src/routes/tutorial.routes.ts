import { Router } from "express";
import TutorialController from "../controllers/tutorial.controller";

class TutorialRoutes {
  public router: Router;
  private controller: TutorialController;

  constructor() {
    this.router = Router();
    this.controller = new TutorialController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/", this.wrapAsync(this.controller.create.bind(this.controller)));
    this.router.get("/published", this.wrapAsync(this.controller.findAllPublished.bind(this.controller)));
    this.router.get("/:id", this.wrapAsync(this.controller.findOne.bind(this.controller)));
    this.router.get("/", this.wrapAsync(this.controller.findAll.bind(this.controller)));
    this.router.put("/:id", this.wrapAsync(this.controller.update.bind(this.controller)));
    this.router.delete("/:id", this.wrapAsync(this.controller.delete.bind(this.controller)));
    this.router.delete("/", this.wrapAsync(this.controller.deleteAll.bind(this.controller)));
    
  }

  // Middleware để xử lý lỗi async (nếu controller trả về lỗi)
  private wrapAsync(fn: Function) {
    return (req: any, res: any, next: any) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}

export default new TutorialRoutes().router;
