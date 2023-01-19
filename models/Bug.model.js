const mongoose = require("mongoose")

const bugSchema = mongoose.Schema({
    bug : {type: 'string', required: true},
    severity:{type: 'string', required: true}
})

const BugModel = mongoose.model("bugtrackerdata", bugSchema)

module.exports = {
    BugModel
}