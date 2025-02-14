import { Router } from "express";
import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import catalogController from "./controllers/catalogController.js";
import createController from "./controllers/createController.js";
import detailsController from "./controllers/detailsController.js";
import profileController from "./controllers/profileController.js";
const routes = Router();

routes.use(homeController);
routes.use(authController);
routes.use(catalogController);
routes.use(createController);
routes.use(detailsController);
routes.use(profileController);

routes.get('*', (req, res) => {
    res.render('404')
});

export default routes;