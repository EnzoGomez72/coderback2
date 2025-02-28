import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import usersModel from "../models/users.model.js";
import passport from 'passport';
import { isValidPassword, createHash, createToken, verifyToken } from "../utils/index.js";
const router = Router();

router.get("/", usersController.getUsersAll);

router.post("/register", usersController.createUser);

router.post('/login', usersController.userLogin);


/*router.get('/profile', passport.authenticate('current', { session: false }), (req, res) => {
  try {
    const user = { ...req.user._doc };
    res.render('profile', { user });
  } catch (error) {
    console.error('Error al procesar la solicitud de perfil:', error);
    res.status(500).send('Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.');
  }
});*/

router.get('/current', passport.authenticate('current', { session: false }), usersController.getCurrentUser);

router.get('/auth/google', passport.authenticate('google', {scope: [ "email", "profile" ] }));

router.get('/api/users/auth/google/callback', 
  passport.authenticate('google', {
      successRedirect: '/profile',
  })
);

export default router;


/*router.get("/", async (req, res) => {
  try {
    const users = await usersModel.find();

    if (users.length === 0) {
      return res.status(404).json({ status: "Error", message: "No se encontraron usuarios" });
    }

    res.status(200).json({ status: "Ok", payload: users });
  } catch (error) {
    res.status(500).json({ status: "Error", error: error.message });
  }
});

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password, role } = req.body;

  try {
    // Validar que los campos obligatorios estén presentes
    if (!first_name || !last_name || !email || !password || !age) {
      return res.status(400).json({ status: "Error", message: "Todos los campos son obligatorios" });
    }

    // Validar la longitud mínima de la contraseña
    if (password.length < 6) {
      return res.status(400).json({ status: "Error", message: "La contraseña debe tener al menos 6 caracteres" });
    }

    // Crear el nuevo usuario
    const newUser = {
      first_name,
      last_name,
      email,
      age,
      password: createHash(password), // Hashear la contraseña
    };

    // Agregar el rol si está presente
    if (role) newUser.role = role;

    // Guardar el usuario en la base de datos
    await usersModel.create(newUser);

    // Redirigir al login después del registro exitoso
    res.redirect("/login");
  } catch (error) {
    // Manejar errores de duplicación de email (código 11000 de MongoDB)
    if (error.code === 11000) {
      return res.status(400).json({ status: "Error", message: "El email ya está en uso" });
    }
    // Otros errores
    res.status(500).json({ status: "Error", error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      if (!email || !password) {
          return res.status(400).json({ status: "error", message: "Todos los campos son obligatorios" });
      }

      const userFound = await usersModel.findOne({ email });

      if (!userFound) {
          return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
      }

      const isValid = isValidPassword(password, userFound.password);
      if (!isValid) {
          return res.status(401).json({ status: "error", message: "Contraseña incorrecta" });
      }

      const user = userFound._doc;
      delete user.password;
      console.log(user);


      const token = createToken(user);
      console.log('Login exitoso:', user);
      res.cookie("authCookie", token, { maxAge: 60 * 60 * 1000, httpOnly: true});
      res.json({ status: "success", message: "Login successful", token });
  } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
  }
});


router.get('/profile', passport.authenticate('current', { session: false }), (req, res) => {
  try {
    const user = { ...req.user._doc };
    res.render('profile', { user });
  } catch (error) {
    console.error('Error al procesar la solicitud de perfil:', error);
    res.status(500).send('Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.');
  }
});

router.get('/current', passport.authenticate('current', { session: false }), (req, res) => {
  try {
    const user = { ...req.user._doc };
    res.status(200).json({ user });  // Enviar la respuesta como JSON
  } catch (error) {
    console.error('Error al procesar la solicitud del usuario actual:', error);
    res.status(500).json({ message: 'Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.' });
  }
});

router.get('/auth/google', passport.authenticate('google', {scope: [ "email", "profile" ] }));

router.get('/api/users/auth/google/callback', 
  passport.authenticate('google', {
      successRedirect: '/profile',
  })
);

export default router;*/
