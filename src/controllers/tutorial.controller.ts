import { Request, Response } from "express";
import Tutorial from "../database/models/tutorial.model";
import tutorialRepository from "../repositories/tutorial.repository";
import config from "../database/config/database";

export default class TutorialController {
  // Tạo mới một tutorial
  async create(req: Request, res: Response) {
    try {
      const { title, description, published, price } = req.body;

      if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
      }

      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      // Tạo mới tutorial bằng repository
      const tutorial = ({
        title,
        description,
        published: published ?? false,
        price,
        userid: req.user.id,
      });

      const newTutorial = await tutorialRepository.save(tutorial);

      res.status(201).json({
        message: "Tutorial created successfully",
        tutorial: newTutorial
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  //Tìm kiếm tutorial do user tạo ra
  async findByUser(req: Request, res: Response) {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const page = parseInt(req.query.page as string, 10);
      const perPage = parseInt(req.query.perPage as string, 10);
      const userIdFromQuery = req.query.userId ? parseInt(req.query.userId as string, 10) : undefined;

      const validPage = isNaN(page) || page < 1 ? 1 : page;
      const validPerPage = isNaN(perPage) || perPage < 1 ? config.defaultPageSize : perPage;

      const limit = validPerPage;
      const offset = (validPage - 1) * validPerPage;

      const userId = userIdFromQuery ?? req.user.id;

      const result = await tutorialRepository.retrieveByUserId({
        userId,
        limit,
        offset,
      }, userId);

      res.status(200).json({
        message: 'Tutorials retrieved successfully',
        tutorials: result.tutorials,
        page: validPage,
        per_Page: validPerPage,
        total_Count: result.totalCount,
        total_Pages: Math.ceil(result.totalCount / perPage),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Internal Server Error!',
      });
    }
  }

  // Lấy tất cả tutorials với điều kiện tìm kiếm
  async findAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string, 10);
      const perPage = parseInt(req.query.perPage as string, 10);
      const userId = req.query.userId;
      const createdFrom = req.query.createdFrom as string;
      const createdTo = req.query.createdTo as string;
      const priceFrom = Number(req.query.priceFrom);
      const priceTo = Number(req.query.priceTo);

      const validPage = isNaN(page) || page < 1 ? 1 : page;
      const validPerPage = isNaN(perPage) || perPage < 1 ? config.defaultPageSize : perPage;

      const limit = validPerPage;
      const offset = (validPage - 1) * validPerPage;

      const result = await tutorialRepository.listPaginated({
        limit,
        offset,
        userId: userId ? parseInt(userId as string, 10) : undefined,
        createdFrom,
        createdTo,
        priceFrom,
        priceTo,
      });

      res.status(200).json({
        message: "Tutorials retrieved successfully",
        tutorials: result.tutorials,
        page: validPage,
        per_Page: validPerPage,
        total_Count: result.totalCount,
        total_Pages: Math.ceil(result.totalCount / perPage),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  // Lấy một tutorial theo ID
  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Tìm tutorial theo ID từ repository
      const tutorial = await tutorialRepository.retrieveById(Number(id));

      if (!tutorial) {
        return res.status(404).json({
          message: `Tutorial with ID ${id} not found!`
        });
      }

      res.status(200).json({
        message: "Tutorial retrieved successfully",
        tutorial
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  // Cập nhật tutorial
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, published, price } = req.body;

      // Dùng Sequelize Model để update
      const [updatedRows] = await Tutorial.update(
        { title, description, published, price },
        { where: { id: Number(id) } }
      );

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
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }


  // Xóa tutorial theo ID
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Xóa tutorial từ repository
      const deletedRows = await tutorialRepository.delete(Number(id));

      if (deletedRows === 0) {
        return res.status(404).json({
          message: `Tutorial with ID ${id} not found!`
        });
      }

      res.status(200).json({
        message: "Tutorial deleted successfully",
        id
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  // Xóa tất cả tutorials
  async deleteAll(req: Request, res: Response) {
    try {
      // Xóa tất cả tutorials từ repository
      const deletedCount = await tutorialRepository.deleteAll();

      res.status(200).json({
        message: `Deleted ${deletedCount} tutorials successfully`
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  // Lấy tất cả tutorials đã xuất bản
  async findAllPublished(req: Request, res: Response) {
    try {

      const page = parseInt(req.query.page as string, 10);
      const perPage = parseInt(req.query.perPage as string, 10);
      const createdFrom = req.query.createdFrom as string;
      const createdTo = req.query.createdTo as string;
      const priceFrom = Number(req.query.priceFrom);
      const priceTo = Number(req.query.priceTo);

      const validPage = isNaN(page) || page < 1 ? 1 : page;
      const validPerPage = isNaN(perPage) || perPage < 1 ? config.defaultPageSize : perPage;

      const limit = validPerPage;
      const offset = (validPage - 1) * validPerPage;

      // Lấy tất cả tutorial đã được xuất bản
      const result = await tutorialRepository.retrieveAll({
        limit,
        offset,
        createdFrom,
        createdTo,
        priceFrom,
        priceTo
      }, { published: true });

      res.status(200).json({
        message: "Published tutorials retrieved successfully",
        tutorials: result.tutorials,
        page: validPage,
        per_Page: validPerPage,
        total_Count: result.totalCount,
        total_Pages: Math.ceil(result.totalCount / perPage) || 1,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }
}
