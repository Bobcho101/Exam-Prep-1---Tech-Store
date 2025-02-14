import Device from "../models/DeviceModel.js";

export async function getUserCreatedDevices(userId) {
    return await Device.find({ creator: userId});
}
