import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import passport from 'passport';
const router = Router();

router.get("/", usersController.getUsersAll);

router.post("/register", usersController.createUser);

router.post('/login', usersController.userLogin);

router.get('/current', passport.authenticate('current', { session: false }), usersController.getCurrentUser);

/*router.get('/auth/google', passport.authenticate('google', {scope: [ "email", "profile" ] }));

router.get('/api/users/auth/google/callback', 
  passport.authenticate('google', {
      successRedirect: '/profile',
  })
);*/

export default router;


/*router.get('/auth/google', passport.authenticate('google', {scope: [ "email", "profile" ] }));

router.get('/api/users/auth/google/callback', 
  passport.authenticate('google', {
      successRedirect: '/profile',
  })
);

export default router;*/
