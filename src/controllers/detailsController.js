import { Router } from "express";
import { editDevice, getOneDevice, isCreator, deleteDevice, preferDevice } from "../services/devices-service.js";
import { isUser } from "../middlewares/auth-middleware.js";
const detailsController = Router();

//*details  

detailsController.get('/details/:deviceId', async (req, res) => {
    try {
        const deviceId = req.params.deviceId;
        const device = await getOneDevice(deviceId);
        const deviceCreatorId = device.creator.toString();
        let alreadyPreferred;
        let isOwner;
        if(req.user === undefined){
            isOwner = false;
            alreadyPreferred = false;
        } else{
            const userId = req.user.id; 
            isOwner = isCreator(userId, deviceCreatorId);
            alreadyPreferred = device.prefferedList.includes(userId);
        }
 
        res.render('details', { device, isOwner, alreadyPreferred });  
    } catch(err){
        console.log(err.message);
    }
});

//*edit

detailsController.get('/details/:deviceId/edit', isUser, async (req, res) => {
    const deviceId = req.params.deviceId;
    const device = await getOneDevice(deviceId);
    const userId = req.user.id;
    if(userId !== device.creator.toString()){
        return res.redirect('/404');
    }
    
    res.render('edit', { device });
});

detailsController.post('/details/:deviceId/edit', isUser, async (req, res) => {
    const data = req.body;
    const deviceId = req.params.deviceId;
    try{
        await editDevice(deviceId, data);
        res.redirect(`/details/${deviceId}`);
    } catch(err){
        console.log(err.message);
        res.render('edit', {error: err.message, tempData: data})
    }
});

//*delete

detailsController.get('/details/:deviceId/delete', isUser, async (req, res) => {
    try{
        const deviceId = req.params.deviceId;
        const device = await getOneDevice(deviceId);
        const userId = req.user.id;
        const deviceCreatorId = device.creator;
        if(deviceCreatorId.toString() !== userId){
            res.redirect('/404');
        } 
        await deleteDevice(deviceId);
        res.redirect('/catalog');
    } catch(err){
        console.log(err.message);
    }
});


//*prefer

detailsController.get('/prefer/:deviceId', isUser, async (req, res) => {
    try{
        const deviceId = req.params.deviceId;
        const userId = req.user.id;
        const device = await getOneDevice(deviceId);
        if(device.creator.toString() === userId){
            return res.redirect('/404');
        }
    
        await preferDevice(deviceId, userId);
        return res.redirect(`/details/${deviceId}`);
    } catch(err){
        console.log(err.message);
        return res.redirect('/404');
    }
});

export default detailsController;