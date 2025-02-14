import { Router } from "express";
import { isUser } from "../middlewares/auth-middleware.js";
import { getUserCreatedDevices, getUserPreferredDevices } from "../services/profile-service.js";
const profileController = Router();

profileController.get('/profile', isUser, async (req, res) => {
    const user = req.user;
    const userDevices = await getUserCreatedDevices(user.id);
    const userPreferredDevices = await getUserPreferredDevices(user.id);
    console.log(userPreferredDevices);
    

    return res.render('profile', { user, userDevices, userPreferredDevices });
});

export default profileController;