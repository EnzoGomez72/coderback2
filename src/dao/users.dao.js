import usersModel from "../models/users.model.js";

export default class UsersDao {
    static async find() {
        return await usersModel.find();
    }

    static async findById(userId) {
        return await usersModel.findById(userId).populate("cart");
    }

    static async findByEmail(email) {
        return await usersModel.findOne({ email });
    }

    static async create(user) {
        return await usersModel.create(user);
    }
}