const { Router } = require('express');
const TodoItem = require('../../models/TodoItem');

const router = Router()

router.get('/', async (req, res) => {
    try {
        const todoItems = await TodoItem.find()
        if (!todoItems) throw new Error('No todo items found')
    
        const sorted = todoItems.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        res.status(200).json(sorted)
    } catch(err) {
        res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {
    const newTodoItem = new TodoItem(req.body)
    try {
        const todoItem = await newTodoItem.save()
        if (!todoItem) throw new Error('Something went wrong in item creation')
        res.status(201).json(todoItem)
    } catch(err) {
        res.status(500).json(err)
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const res = await TodoItem.findByIdAndUpdate(id, req.body)
        if (!res) throw new Error('Something went wrong in item update')
        const updated = { ...res._doc, ...req.body }
        res.status(202).json(updated)
    } catch(err) {
        res.status(500).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const res = await TodoItem.findByIdAndDelete(id)
        if (!res) throw new Error('Something went wrong in item deletion')
        res.status(200).json(res)
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router