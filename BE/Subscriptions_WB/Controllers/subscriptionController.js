const express = require('express')
const router = express.Router()
const subService = require("../Services/subscriptionService")

router.get('/', async (req, res) => {
    try {
        const subs = await subService.getAllSubs()
        return res.json(subs)
    } catch (err) {
        throw (err.message)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const sub = await subService.getSubById(req.params.id)
        return res.json(sub)
    } catch (err) {
        throw (err.message)
    }
})

router.post('/', async (req, res) => {
    try {
        const status = await subService.createSub(req.body)
        return res.json(status)
    } catch (err) {
        throw (err.message)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const status = await subService.updateSub(id, req.body)
        return res.json(status)
    } catch (err) {
        throw (err.message)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const status = await subService.deleteSub(req.params.id)
        return res.json(status)
    } catch (err) {
        throw (err.message)
    }
})

module.exports = router
