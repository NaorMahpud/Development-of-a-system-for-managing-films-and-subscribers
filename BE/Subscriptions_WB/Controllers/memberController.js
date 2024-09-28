const express = require('express');
const router = express.Router();
const memberService = require('../Services/memberService');

const filterAllowedFields = (data, allowedFields) => {
    return Object.keys(data)
        .filter(key => allowedFields.includes(key))
        .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {});
};

router.get('/', async (req, res) => {
    try {
        const members = await memberService.getAllMembers();
        return res.json(members);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const member = await memberService.getMemberById(req.params.id);
        return res.json(member);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.post('/', async (req, res) => {
    try {
        
        const allowedFields = ['name', 'email', 'city'];
        const filteredData = filterAllowedFields(req.body, allowedFields);
        
        const status = await memberService.createMember(filteredData);
        return res.json(status);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const allowedFields = ['name', 'email', 'city'];
        const filteredData = filterAllowedFields(req.body, allowedFields);

        const status = await memberService.updateMember(id, filteredData);
        return res.json(status);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const status = await memberService.deleteMember(req.params.id);
        return res.json(status);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;
