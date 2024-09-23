const express = require('express');
const router = express.Router();
const memberService = require('../Services/memberService');
const authAdmin = require("../Middlewares/authAdmin");

router.get('/', async (req, res) => {
    try {
        const members = await memberService.getMembers();
        return res.json(members);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch members: ' + err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const member = await memberService.getMemberById(req.params.id);
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        return res.json(member);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch member: ' + err.message });
    }
});

router.post('/', authAdmin, async (req, res) => {
    try {
        const { name, email, city } = req.body;

        if (!name || !email || !city) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const memberData = await memberService.createMember(req.body);
        return res.status(201).json({ message: 'Member added successfully', member: memberData });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add member: ' + err.message });
    }
});

router.put('/:id', authAdmin, async (req, res) => {
    try {
        const updatedMember = await memberService.updateMember(req.params.id, req.body);
        return res.json({ message: 'Member updated successfully', member: updatedMember });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update member: ' + err.message });
    }
});

router.delete('/:id', authAdmin, async (req, res) => {
    try {
        const deletedMember = await memberService.deleteMember(req.params.id);
        return res.json({ message: 'Member deleted successfully', member: deletedMember });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete member: ' + err.message });
    }
});

module.exports = router;
