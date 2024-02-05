import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        // required: true,
        unique: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    number: Number,
    countryCode: String,
    password: String
});


export interface User extends mongoose.Document {
    email: string;
    number: number;
    password: string;
    countryCode: string
}


