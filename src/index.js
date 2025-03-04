import express from "express";
import config from "./config/env.js"
import { engine } from "express-handlebars"
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./middlewares/passportMiddleware.js";
import productRoutes from "./routes/products.routes.js"
import cartRoutes from "./routes/carts.routes.js"
import userRoutes from './routes/users.routes.js'
import viewRoutes from "./routes/views.routes.js";
import connectDb from "./config/database.js";


//settings
const app = express();
app.set("PORT", config.port || 3000)
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use(express.static('public'));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*app.use(cookieParser(signCookie));*/
app.use(cookieParser(config.sign));
//passport
initializePassport();
app.use(passport.initialize());
// app.use(passport.session());
//routes
app.get("/", (req, res) => {
    res.json({ title: "Home Page" });
});
app.use('/api/carts',cartRoutes)
app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/', viewRoutes);
//listeners
connectDb(config.mongodb_url);
app.listen(app.get("PORT"), () => {
  console.log(`Server on port ${app.get("PORT")}`);
});