import UsersRepository from "../repository/users.repository.js";

const getUsersAll = async () => {
    return await UsersRepository.getUsersAll();
};

const createUser = async (newUser) => {
    return await UsersRepository.createUser(newUser);
};

const userLogin = async (email) => {
    return await UsersRepository.userLogin(email);
};

const getUserById = async (userId) => {
    return await UsersRepository.getUserById(userId);
};

export default { getUsersAll, createUser, userLogin, getUserById };