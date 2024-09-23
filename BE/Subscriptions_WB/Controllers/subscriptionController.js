const express = require('express')
const route = express.Router()
const subService = require("../Services/subscriptionService")

route.get('/', async (req, res) => {
    try {
        const subs = await subService.getAllSubs()
        return res.json(subs)
    } catch (err) {
        throw (err.message)
    }
})

route.get('/:id', async (req, res) => {
    try {
        const sub = await subService.getSubById(req.params.id)
        return res.json(sub)
    } catch (err) {
        throw (err.message)
    }
})

route.post('/', async (req, res) => {
    try {
        const status = await subService.createSub(req.body)
        return res.json(status)
    } catch (err) {
        throw (err.message)
    }
})

route.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const status = await subService.updateSub(id, req.body)
        return res.json(status)
    } catch (err) {
        throw (err.message)
    }
})

route.delete('/:id', async (req, res) => {
    try {
        const status = await subService.deleteSub(req.params.id)
        return res.json(status)
    } catch (err) {
        throw (err.message)
    }
})

module.exports = route
