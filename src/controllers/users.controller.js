import { isValidPassword, createHash, createToken } from "../utils/index.js";
import usersService from "../services/users.service.js";
import cartsService from "../services/carts.service.js";

const getUsersAll = async (req, res) => {
    try {
        const users = await usersService.getUsersAll();

        if (users.length === 0) {
            return res.status(404).json({ status: "Error", message: "No se encontraron usuarios" });
        }

        res.status(200).json({ status: "Ok", payload: users });
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
};

const createUser = async (req, res) => {
    const { first_name, last_name, email, age, password, role } = req.body;

    try {
        if (!first_name || !last_name || !email || !password || !age) {
            return res.status(400).json({ status: "Error", message: "Todos los campos son obligatorios" });
        }

        if (password.length < 6) {
            return res.status(400).json({ status: "Error", message: "La contraseña debe tener al menos 6 caracteres" });
        }

        const newCart = await cartsService.createCart();

        const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            cart: newCart._id,
        };

        if (role) newUser.role = role;

        await usersService.createUser(newUser);

        res.status(201).json({
            status: "Success",
            message: "Usuario creado exitosamente",
            user: newUser,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ status: "Error", message: "El email ya está en uso" });
        }
        res.status(500).json({ status: "Error", error: error.message });
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ status: "error", message: "Todos los campos son obligatorios" });
        }

        const userFound = await usersService.userLogin(email);

        if (!userFound) {
            return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
        }

        const isValid = isValidPassword(password, userFound.password);
        if (!isValid) {
            return res.status(401).json({ status: "error", message: "Contraseña incorrecta" });
        }

        const user = userFound._doc;
        delete user.password;

        const token = createToken(user);
        res.cookie("authCookie", token, { maxAge: 60 * 60 * 1000, httpOnly: true });
        res.json({ status: "success", message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await usersService.getUserById(req.user._id);
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error al procesar la solicitud del usuario actual:', error);
        res.status(500).json({ message: 'Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.' });
    }
};

export default { getUsersAll, createUser, userLogin, getCurrentUser };