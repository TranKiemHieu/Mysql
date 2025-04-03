"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tutorial_controller_1 = __importDefault(require("../controllers/tutorial.controller"));
class TutorialRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new tutorial_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/", this.wrapAsync(this.controller.create.bind(this.controller)));
        this.router.get("/published", this.wrapAsync(this.controller.findAllPublished.bind(this.controller)));
        this.router.get("/:id", this.wrapAsync(this.controller.findOne.bind(this.controller)));
        this.router.get("/", this.wrapAsync(this.controller.findAll.bind(this.controller)));
        this.router.put("/:id", this.wrapAsync(this.controller.update.bind(this.controller)));
        this.router.delete("/:id", this.wrapAsync(this.controller.delete.bind(this.controller)));
        this.router.delete("/", this.wrapAsync(this.controller.deleteAll.bind(this.controller)));
    }
    // Middleware để xử lý lỗi async (nếu controller trả về lỗi)
    wrapAsync(fn) {
        return (req, res, next) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
    }
}
exports.default = new TutorialRoutes().router;
