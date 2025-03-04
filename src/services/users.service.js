import usersModel from "../models/users.model.js";

const getUsersAll = ()=> {
    return usersModel.find()
}

const createUser = async (newUser) => {
    return await usersModel.create(newUser);
};

const userLogin = async (email) => {
    return await usersModel.findOne({ email });
};

const getUserById = async (userId) => {
    return await usersModel.findById(userId).populate("cart");
};

export default { getUsersAll, createUser, userLogin, getUserById};