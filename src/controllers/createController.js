import { Router } from "express";
import { ObjectId } from "mongodb";
import { createDevice } from "../services/devices-service.js";
import { isUser } from "../middlewares/auth-middleware.js";
const createController = Router();


createController.get('/create', isUser, (req, res) => {
    res.render('create');
});

createController.post('/create', async (req, res) => {
    const data = req.body;
    data.creator = new ObjectId(req.user.id);
    try{
        await createDevice(data);
        res.redirect('/');
    } catch(err){
        console.log(err.message);
        res.render('create', {error: err.message, data})
    }
});

export default createController;