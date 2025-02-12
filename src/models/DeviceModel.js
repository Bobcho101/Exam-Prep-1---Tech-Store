import mongoose, { Schema, Types, model } from "mongoose";

const deviceSchema = new Schema({
    brand: {
        required: true,
        type: String,
        minLength: [2, 'Brand should be at least 2 characters long!'],
    },
    model: {
        required: true,
        type: String,
        minLength: [5, 'Model should be at least 5 characters long!'],
    },
    hardDisk: {
        required: true,
        type: String,
        minLength: [5, 'Hard Disk should be at least 5 characters long!'],
    },
    screenSize: {
        required: true,
        type: String,
        minLength: [1, 'Screen size should be at least 1 characters long!'],
    },
    ram: {
        required: true,
        type: String,
        minLength: [2, 'Ram should be at least 2 characters long!'],
    },
    operatingSystem: {
        required: true,
        type: String,
        minLength: [5, 'Operating System should be at least 5 characters long!'],
        maxLength: [20, 'Operating System should be 20 characters max!']
    },
    cpu: {
        required: true,
        type: String,
        minLength: [10, 'CPU should be at least 10 characters long!'],
        maxLength: [50, 'CPU should be 50 characters max!']
    },
    gpu: {
        required: true,
        type: String,
        minLength: [10, 'GPU should be at least 10 characters long!'],
        maxLength: [50, 'GPU should be 50 characters max!']
    },
    price: {
        required: true,
        type: Number,
        min: [0, 'Price cannot be a negative number!']
    },
    color: {
        required: true,
        type: String,
        minLength: [2, 'Color should be at least 2 characters long!'],
        maxLength: [10, 'Color should be 10 characters max!']
    },
    weight: {
        required: true,
        type: String,
        minLength: [1, 'Color should be at least 1 characters long!']
    },
    image: {
        required: true,
        type: String,
        match: /^https?:\/\//
    },
    prefferedList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    creator: {
        type: Types.ObjectId,
        ref: 'User'
    }
});


const Device = model('Device', deviceSchema);

export default Device;