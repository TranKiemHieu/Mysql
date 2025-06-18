import User from "../database/models/user.model";

interface IUserRepository {
    getUser(userId: number): Promise<User | null>;
}

class UserRepository implements IUserRepository {
    //Retriece user by Id
    async getUser(userId: number): Promise<User | null> {
        try {
            return await User.findByPk(userId);
        } catch (error) {
            throw new Error("Failed to retrieve User!");
        }
    }
}


export default new UserRepository();