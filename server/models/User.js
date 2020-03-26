const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

/**
 *  Define user schema
 */
const UserSchema = new Schema({
    username: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    avatar: { type: String }
}, { timestamps: true })
/**
 * hashing Password pre save users 
 */
UserSchema.pre('save', async function (next){
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        let hashed = await bcrypt.hash(this.password,salt) 
        this.password = hashed;
    } catch (error) {
        next(error);
    }   
})

/**
 * compare password to the doc hashed password 
 */
UserSchema.method.comparePassword = async function (password) {
    let pass = password.toString();
    return await bcrypt.compare(pass,this.password)
    
}

module.exports = mongoose.model('User' , UserSchema)