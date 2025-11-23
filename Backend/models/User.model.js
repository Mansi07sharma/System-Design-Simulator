import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    "name":String,
    "email": {type: String, unique: true, required: true},
    "photo":String,
    "createdAt": { type: Date, default: Date.now },
    "password": {type:String, default:""}
})

const User = mongoose.model('User', userSchema);
export default User;