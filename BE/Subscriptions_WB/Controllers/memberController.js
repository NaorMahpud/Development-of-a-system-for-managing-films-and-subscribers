const express = require('express')
const route = express.Router()
const memberService = require('../Services/memberService')

route.get('/', async (req, res) => {
    try {
        const members = await memberService.getAllMembers()
        return res.json(members)
    } catch (err) {
        throw (err.message)
    }
})

route.get('/:id', async (req, res) => {
    try {
        const member = await memberService.getMemberById(req.params.id)
        return res.json(member)
    } catch (err) {
        throw (err.message)
    }
})

route.post('/', async (req, res) => {
    try {
        const status = await memberService.createMember(req.body)
        return res.json(status)
    } catch (err) {
        throw (err.message)
    }
})

route.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const status = await memberService.updateMember(id, req.body)
        return res.json(status)
    } catch (err) {
        throw (err.message)
    }
})

route.delete('/:id', async (req, res) => {
    try {
        const status = await memberService.deleteMember(req.params.id)
        return res.json(status)
    } catch (err) {
        throw (err.message)
    }
})

module.exports = route
