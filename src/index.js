import express from "express";
import { engine } from "express-handlebars"
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import userRoutes from './routes/users.routes.js'
import viewRoutes from "./routes/views.routes.js";
import connectDb from "./config/database.js";

const signCookie = "sign-cookie";

//settings
const app = express();
app.set("PORT", 3000);
const URL = "mongodb+srv://enzo:1234@cluster0.bkbia.mongodb.net/test";
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use(express.static('public'));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(signCookie));
//passport
initializePassport();
app.use(passport.initialize());
// app.use(passport.session());
//routes
app.get("/", (req, res) => {
    res.json({ title: "Home Page" });
});
app.use('/api/users',userRoutes)
app.use('/', viewRoutes);
//listeners
connectDb(URL);
app.listen(app.get("PORT"), () => {
  console.log(`Server on port ${app.get("PORT")}`);
});