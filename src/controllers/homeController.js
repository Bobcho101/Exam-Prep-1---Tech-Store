import { Router } from "express";
import { getDevices } from "../services/devices-service.js";
const homeController = Router();

homeController.get('/', async (req, res) => {
    let devices = await getDevices();
    devices.reverse();
    devices = devices.slice(0, 3);

    res.render('home', { devices });
});


homeController.get('/about', (req, res) => {
    res.render('about');
});

export default homeController;