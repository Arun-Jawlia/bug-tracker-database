const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email : {type: 'string', required: true},
    password : {type: 'string', required: true},
})

const UserModel = mongoose.model("bugTrackeruser", userSchema)

module.exports = {
    UserModel
}