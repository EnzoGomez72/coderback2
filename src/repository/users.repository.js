import UsersDao from "../dao/users.dao.js";

export default class UsersRepository {
    static async getUsersAll() {
        return await UsersDao.find();
    }

    static async createUser(newUser) {
        return await UsersDao.create(newUser);
    }

    static async userLogin(email) {
        return await UsersDao.findByEmail(email);
    }

    static async getUserById(userId) {
        return await UsersDao.findById(userId);
    }
}