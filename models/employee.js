const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    fullname: { type: String, required: true },
    gender: { type: String, required: true },
    contacts: { type: String, required: true },
    dateOfCreate: { type: String, required: true },
    salary: { type: String, required: true },
    position: { type: String, required: true },
})

module.exports = model('Employee', schema)
