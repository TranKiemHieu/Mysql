import { Request, Response } from "express";
import Tutorial from "../models/tutorial.model";
import tutorialRepository from "../repositories/tutorial.repository";

export default class TutorialController {
  // Tạo mới một tutorial
  async create(req: Request, res: Response) {
    try {
      const { title, description, published } = req.body;

      // Tạo mới tutorial bằng repository
      const newTutorial = await Tutorial.create({
        title,
        description,
        published
      });

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

  // Lấy tất cả tutorials với điều kiện tìm kiếm
  async findAll(req: Request, res: Response) {
    try {
      const { title, published } = req.query;

      // Tìm tất cả tutorial từ repository với điều kiện
      const tutorials = await tutorialRepository.retrieveAll({
        title: title as string,
        published: published === "true" ? true : undefined
      });

      res.status(200).json({
        message: "Tutorials retrieved successfully",
        tutorials
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
      const { title, description, published } = req.body;
  
      // Dùng Sequelize Model để update
      const [updatedRows] = await Tutorial.update(
        { title, description, published }, 
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
      // Lấy tất cả tutorial đã được xuất bản
      const tutorials = await tutorialRepository.retrieveAll({
        published: true
      });

      res.status(200).json({
        message: "Published tutorials retrieved successfully",
        tutorials
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }
}
