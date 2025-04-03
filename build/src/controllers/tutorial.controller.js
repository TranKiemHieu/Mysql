"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tutorial_model_1 = __importDefault(require("../models/tutorial.model"));
const tutorial_repository_1 = __importDefault(require("../repositories/tutorial.repository"));
class TutorialController {
    // Tạo mới một tutorial
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, published } = req.body;
                // Tạo mới tutorial bằng repository
                const newTutorial = yield tutorial_model_1.default.create({
                    title,
                    description,
                    published
                });
                res.status(201).json({
                    message: "Tutorial created successfully",
                    tutorial: newTutorial
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
    // Lấy tất cả tutorials với điều kiện tìm kiếm
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, published } = req.query;
                // Tìm tất cả tutorial từ repository với điều kiện
                const tutorials = yield tutorial_repository_1.default.retrieveAll({
                    title: title,
                    published: published === "true" ? true : undefined
                });
                res.status(200).json({
                    message: "Tutorials retrieved successfully",
                    tutorials
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
    // Lấy một tutorial theo ID
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // Tìm tutorial theo ID từ repository
                const tutorial = yield tutorial_repository_1.default.retrieveById(Number(id));
                if (!tutorial) {
                    return res.status(404).json({
                        message: `Tutorial with ID ${id} not found!`
                    });
                }
                res.status(200).json({
                    message: "Tutorial retrieved successfully",
                    tutorial
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
    // Cập nhật tutorial
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { title, description, published } = req.body;
                // Dùng Sequelize Model để update
                const [updatedRows] = yield tutorial_model_1.default.update({ title, description, published }, { where: { id: Number(id) } });
                if (updatedRows === 0) {
                    return res.status(404).json({
                        message: `Tutorial with ID ${id} not found!`
                    });
                }
                res.status(200).json({
                    message: "Tutorial updated successfully",
                    id,
                    updatedFields: { title, description, published }
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
    // Xóa tutorial theo ID
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // Xóa tutorial từ repository
                const deletedRows = yield tutorial_repository_1.default.delete(Number(id));
                if (deletedRows === 0) {
                    return res.status(404).json({
                        message: `Tutorial with ID ${id} not found!`
                    });
                }
                res.status(200).json({
                    message: "Tutorial deleted successfully",
                    id
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
    // Xóa tất cả tutorials
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Xóa tất cả tutorials từ repository
                const deletedCount = yield tutorial_repository_1.default.deleteAll();
                res.status(200).json({
                    message: `Deleted ${deletedCount} tutorials successfully`
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
    // Lấy tất cả tutorials đã xuất bản
    findAllPublished(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Lấy tất cả tutorial đã được xuất bản
                const tutorials = yield tutorial_repository_1.default.retrieveAll({
                    published: true
                });
                res.status(200).json({
                    message: "Published tutorials retrieved successfully",
                    tutorials
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
}
exports.default = TutorialController;
