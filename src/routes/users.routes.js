import { Router } from "express";
import usersController from "../controllers/users.controller.js";
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


/*router.get('/auth/google', passport.authenticate('google', {scope: [ "email", "profile" ] }));

router.get('/api/users/auth/google/callback', 
  passport.authenticate('google', {
      successRedirect: '/profile',
  })
);

export default router;*/
