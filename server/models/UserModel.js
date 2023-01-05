const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    mobileNumber: {
        type: Number,
        require: true
    },

    country: {
        type: String,
        require: true
    },

    gender: {
        type: String,
        require: true
    },

    refferalCode: {
        type: String,
        require: true
    },

    age: {
        type: Number,
        require: true
    },

    height: {
        type: Number,
        require: true            
    },

    weight: {
        type: Number,
        require: true
    },

    dateOfBirth: {
        type: Date,
        require: true
    },

    coins: {
        type: Number,
        default: 20
    },

    plan:{
        type: String,
        default: "basic"
    },

    bio: {
        type: String,
        default: "Hi!",
        require: false
    },

    timeToady: {
        type: Number,
        default: 0,
        required: false
    },

    strengthTime: {
        type: Number,
        default: 0,
        required: false
    },

    daysActive: {
        type: Number,
        default: 1,
        required: false
    },

    profilePicture: {
        type: String,
        default: "hi",
        required: false
    },

    alternateEmail: {
        type: String,
        require: false,
        default: " "
    },

    calories:{
        type: Number,
        default: 0
    },

    userStats : [{
        date : String,
        calories : Number
    }],

    userTime:[{
        date : String,
        time : Number
    }]

},

{
    timestamps: true
}
)


UserSchema.pre("save",async function(next) {
    if(!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})


UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}

// create user model
const User = mongoose.model("User",UserSchema);
module.exports = User;