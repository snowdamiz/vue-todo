const { Schema, model } = require('mongoose')

const todoItemSchema = new Schema({
    todo: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

const TodoItem = model('TodoItem', todoItemSchema)
module.exports = TodoItem