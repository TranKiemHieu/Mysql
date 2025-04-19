"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tutorial_controller_1 = __importDefault(require("../controllers/tutorial.controller"));
const authJwt_1 = require("../middleware/authJwt");
class TutorialRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new tutorial_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/', [authJwt_1.verifyToken, authJwt_1.isAdmin], this.wrapAsync(this.controller.create.bind(this.controller)));
        this.router.get('/published', authJwt_1.verifyToken, this.wrapAsync(this.controller.findAllPublished.bind(this.controller)));
        this.router.get('/:id', authJwt_1.verifyToken, this.wrapAsync(this.controller.findOne.bind(this.controller)));
        this.router.get('/', authJwt_1.verifyToken, this.wrapAsync(this.controller.findAll.bind(this.controller)));
        this.router.put('/:id', authJwt_1.verifyToken, this.wrapAsync(this.controller.update.bind(this.controller)));
        this.router.delete('/:id', authJwt_1.verifyToken, this.wrapAsync(this.controller.delete.bind(this.controller)));
        this.router.delete('/', [authJwt_1.verifyToken, authJwt_1.isAdmin], this.wrapAsync(this.controller.deleteAll.bind(this.controller)));
    }
    wrapAsync(fn) {
        return (req, res, next) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
    }
}
exports.default = new TutorialRoutes().router;
