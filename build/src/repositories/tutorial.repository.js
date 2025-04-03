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
const sequelize_1 = require("sequelize");
class TutorialRepository {
    //create new object
    save(tutorial) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield tutorial_model_1.default.create({
                    title: tutorial.title,
                    description: tutorial.description,
                    published: tutorial.published
                });
            }
            catch (err) {
                throw new Error("Failed to create Tutorial!");
            }
        });
    }
    //Retrieve objects (with conditions)
    retrieveAll(searchParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //let condition: SearchCondition = {};
                let condition = {};
                //if (searchParams?.published) condition.published = true;
                if (typeof searchParams.published === "boolean") {
                    condition.published = searchParams.published;
                }
                if (searchParams === null || searchParams === void 0 ? void 0 : searchParams.title)
                    condition.title = { [sequelize_1.Op.like]: `%${searchParams.title}%` };
                return yield tutorial_model_1.default.findAll({ where: condition });
            }
            catch (error) {
                throw new Error("Failed to retrieve Tutorials!");
            }
        });
    }
    //Retrieve object by Id
    retrieveById(tutorialId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield tutorial_model_1.default.findByPk(tutorialId);
            }
            catch (error) {
                throw new Error("Failed to retrieve Tutorials!");
            }
        });
    }
    //Update an object
    update(tutorial) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, description, published } = tutorial;
            try {
                const affectedRows = yield tutorial_model_1.default.update({ title, description, published }, { where: { id: id } });
                return affectedRows[0];
            }
            catch (error) {
                throw new Error("Failed to update Tutorial!");
            }
        });
    }
    //Delete an object
    delete(tutorialId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const affectedRows = yield tutorial_model_1.default.destroy({ where: { id: tutorialId } });
                return affectedRows;
            }
            catch (error) {
                throw new Error("Failed to delete Tutorial!");
            }
        });
    }
    //Delete all objects
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return tutorial_model_1.default.destroy({
                    where: {},
                    truncate: false
                });
            }
            catch (error) {
                throw new Error("Failed to delete Tutorials!");
            }
        });
    }
}
exports.default = new TutorialRepository();
