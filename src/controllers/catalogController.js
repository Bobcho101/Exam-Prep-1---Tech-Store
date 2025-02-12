import { Router } from "express";
import { getDevices } from "../services/devices-service.js"
const catalogController = Router();

catalogController.get('/catalog', async (req, res) => {
    const devices = await getDevices();
    //const devices = [];
    
    res.render('catalog', {devices});
});

export default catalogController;