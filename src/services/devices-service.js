import Device from "../models/DeviceModel.js";
import { ObjectId } from "mongodb";

export async function createDevice(data){
    return await Device.create(data);
}

export async function getDevices(){
    return await Device.find();
}

export async function editDevice(deviceId, newData) {
    return await Device.findByIdAndUpdate(deviceId, newData, { runValidators: true });
}

export async function deleteDevice(deviceId){
    return await Device.findByIdAndDelete(deviceId);
}

export async function getOneDevice(deviceId) {
    const device = await Device.findById(deviceId)
    return device;
}

export function isCreator(userId, postId){
    if(userId === postId) {
        return true;
    } else{
        return false;
    }
}

export async function preferDevice(deviceId, userId){
    const device = await getOneDevice(deviceId);
    if(device.prefferedList.includes(userId)){
        throw new Error("This user already preferred this device!");
    }
    device.prefferedList.push(userId);
    await device.save();
}