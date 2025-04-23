import Tutorial from "../models/tutorial.model";
import { Op } from "sequelize";

interface ITutorialRepository {
  save(tutorial: Tutorial): Promise<Tutorial>;
  retrieveAll(searchParams: {title: string, published: boolean}): Promise<Tutorial[]>;
  retrieveById(tutorialId: number): Promise<Tutorial | null>;
  retrieveByUserId(userId: number): Promise<Tutorial[]>;
  update(tutorial: Tutorial): Promise<number>;
  delete(tutorialId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class TutorialRepository implements ITutorialRepository {
    //create new object
    async save(tutorial: Tutorial): Promise<Tutorial> {
        try {
            return await Tutorial.create({
                title: tutorial.title,
                description: tutorial.description,
                published: tutorial.published,
                userid: tutorial.userid,
            });
        } catch (err) {
            throw new Error("Failed to create Tutorial!");
        }
    }

    //Retrieve objects (with conditions)
    async retrieveAll(searchParams: {title?: string, published?: boolean}): Promise<Tutorial[]> {
        try {
            //let condition: SearchCondition = {};
            let condition: { [key: string]: any } = {};
        
            //if (searchParams?.published) condition.published = true;

            if (typeof searchParams.published === "boolean") {
                condition.published = searchParams.published;
              }
            if (searchParams?.title)
              condition.title = { [Op.like]: `%${searchParams.title}%` };
        
            return await Tutorial.findAll({ where: condition });
        } catch (error) {
            throw new Error("Failed to retrieve Tutorials!");
        }
    }

    //Retrieve object by Id
    async retrieveById(tutorialId: number): Promise<Tutorial | null> { 
        try {
            return await Tutorial.findByPk(tutorialId);
        } catch (error) {
            throw new Error("Failed to retrieve Tutorials!");
        }
    }

    async retrieveByUserId(userId: number): Promise<Tutorial[]> { 
        try {
            return await Tutorial.findAll({ where: { userid: userId }});
        } catch (error) {
            throw new Error("Failed to retrieve Tutorials!");
        }
    }

    //Update an object
    async update(tutorial: Tutorial): Promise<number> {
        const { id, title, description, published } = tutorial;

        try {
            const affectedRows = await Tutorial.update(
            { title, description, published },
            { where: { id: id } }
            );

            return affectedRows[0];
        } catch (error) {
            throw new Error("Failed to update Tutorial!");
        }
    }

    //Delete an object
    async delete(tutorialId: number): Promise<number> { 
        try {
            const affectedRows = await Tutorial.destroy({ where: { id: tutorialId } });
        
            return affectedRows;
        } catch (error) {
            throw new Error("Failed to delete Tutorial!");
        }
    }

    //Delete all objects
    async deleteAll(): Promise<number> { 
        try {
            return Tutorial.destroy({
              where: {},
              truncate: false
            });
        } catch (error) {
            throw new Error("Failed to delete Tutorials!");
        }
    }
}

export default new TutorialRepository();