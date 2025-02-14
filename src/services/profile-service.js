import Device from "../models/DeviceModel.js";

export async function getUserCreatedDevices(userId) {
    return await Device.find({ creator: userId});
}

export async function getUserPreferredDevices(userId) {
    return await Device.find({ prefferedList: userId});
}