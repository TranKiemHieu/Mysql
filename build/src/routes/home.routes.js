"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const home_controller_1 = require("../controllers/home.controller");
const auth_controller_1 = require("../controllers/auth.controller");
class HomeRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/', home_controller_1.welcome);
        this.router.post('/auth/signup', auth_controller_1.signup);
        this.router.post('/auth/signin', auth_controller_1.signin);
    }
}
exports.default = new HomeRoutes().router;
