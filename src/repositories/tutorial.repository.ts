import Tutorial from "../models/tutorial.model";
import { Op } from "sequelize";

interface ITutorialQueryResult {
    tutorials: Tutorial[];
    totalCount: number;
}

interface IUserQueryResult {
    tutorials: Tutorial[];
    totalCount: number;
}

interface ITutorialQueryParameters {
    limit?: number;
    offset?: number;
    userId?: number;
    priceFrom?: number;
    priceTo?: number;
    createdFrom?: string;
    createdTo?: string;
}

interface IUserQueryParameters {
    userId?: number;
    limit?: number;
    offset?: number;
}

interface IPublishedQueryParameters {
    published?: boolean;
    limit?: number;
    offset?: number;
    priceFrom?: number;
    priceTo?: number;
    createdFrom?: string;
    createdTo?: string;
}


interface ITutorialRepository {
    save(tutorial: Partial<Tutorial>): Promise<Tutorial>;
    retrieveAll(query: IPublishedQueryParameters, searchParams: { title: string, published: boolean }): Promise<ITutorialQueryResult>;
    retrieveById(tutorialId: number): Promise<Tutorial | null>;
    retrieveByUserId(query: IUserQueryParameters, userId: number): Promise<IUserQueryResult>;
    update(tutorial: Tutorial): Promise<number>;
    delete(tutorialId: number): Promise<number>;
    deleteAll(): Promise<number>;
    listPaginated(query: ITutorialQueryParameters, userId?: number): Promise<ITutorialQueryResult>;
    //listPaginatedPublished(query: ITutorialQueryParameters): Promise<ITutorialQueryResult>;
    //listUserPaginated(query: ITutorialQueryParameters, userId?: number): Promise<IUserQueryResult>;
}


class TutorialRepository implements ITutorialRepository {
    private defaultLimit = 10;
    private defaultOffset = 0;

    //create new object
    async save(tutorial: Partial<Tutorial>): Promise<Tutorial> {
        try {
            return await Tutorial.create({
                title: tutorial.title,
                description: tutorial.description,
                published: tutorial.published,
                price: tutorial.price,
                userid: tutorial.userid,
            });
        } catch (err) {
            throw new Error("Failed to create Tutorial!");
        }
    }

    //Retrieve objects (with conditions)
    async retrieveAll(query: IPublishedQueryParameters, searchParams: { title?: string, published?: boolean }): Promise<ITutorialQueryResult> {
        try {
            //let condition: SearchCondition = {};
            let where: { [key: string]: any } = {};

            //if (searchParams?.published) condition.published = true;

            if (typeof searchParams.published === "boolean") {
                where.published = searchParams.published;
            }
            if (searchParams?.title)
                where.title = { [Op.like]: `%${searchParams.title}%` };

            if (query.createdFrom || query.createdTo) {
                where.createdAt = {};
                if (query.createdFrom) {
                    where.createdAt[Op.gte] = new Date(query.createdFrom);
                }
                if (query.createdTo) {
                    where.createdAt[Op.lte] = new Date(query.createdTo);
                }
            }

            if (query.priceFrom !== undefined || query.priceTo !== undefined) {
                where.price = {};
                if (query.priceFrom) {
                    where.price[Op.gte] = Number(query.priceFrom);
                }
                if (query.priceTo) {
                    where.price[Op.lte] = Number(query.priceTo);
                }
            }

            const [tutorials, totalCount] = await Promise.all([
                Tutorial.findAll({
                    where,
                    limit: query.limit || this.defaultLimit,
                    offset: query.offset || this.defaultOffset,
                }),
                Tutorial.count({ where }),
            ]);

            return {
                tutorials: tutorials,
                totalCount: totalCount,
            };

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

    async retrieveByUserId(query: IUserQueryParameters, userId: number): Promise<IUserQueryResult> {
        try {
            const where = { userid: userId };

            const [tutorials, totalCount] = await Promise.all([
                Tutorial.findAll({
                    where,
                    limit: query.limit || this.defaultLimit,
                    offset: query.offset || this.defaultOffset,
                }),
                Tutorial.count({ where }),
            ]);

            return {
                tutorials: tutorials,
                totalCount: totalCount,
            };
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

    async listPaginated(query: ITutorialQueryParameters, userId?: number): Promise<ITutorialQueryResult> {
        try {
            const where: { [key: string]: any } = {};

            // Chỉ thêm điều kiện userid nếu userId được cung cấp
            if (userId !== undefined) {
                where.userid = userId;
            }

            if (query.createdFrom || query.createdTo) {
                where.createdAt = {};
                if (query.createdFrom) {
                    where.createdAt[Op.gte] = new Date(query.createdFrom);
                }
                if (query.createdTo) {
                    where.createdAt[Op.lte] = new Date(query.createdTo);
                }
            }

            if (query.priceFrom || query.priceTo) {
                where.price = {};
                if (query.priceFrom) {
                    where.price[Op.gte] = query.priceFrom;
                }
                if (query.priceTo) {
                    where.price[Op.lte] = query.priceTo;
                }
            }

            const [tutorials, totalCount] = await Promise.all([
                Tutorial.findAll({
                    where,
                    limit: query.limit || this.defaultLimit,
                    offset: query.offset || this.defaultOffset,
                }),
                Tutorial.count({ where }),
            ]);

            return {
                tutorials: tutorials,
                totalCount: totalCount,
            };
        } catch (error) {
            throw new Error("Failed to retrieve paginated Tutorials!");
        }
    }
}

export default new TutorialRepository();