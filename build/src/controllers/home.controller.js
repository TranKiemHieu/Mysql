"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcome = welcome;
function welcome(req, res) {
    res.json({ message: "Welcome to bezkoder application." });
}
