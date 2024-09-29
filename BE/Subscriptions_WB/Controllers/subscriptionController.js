const express = require('express');
const router = express.Router();
const subService = require("../Services/subscriptionService");

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
        const subs = await subService.getAllSubs();
        return res.json(subs);
    } catch (err) {
        return res.status(500).send({ error: 'Failed to retrieve subscriptions', details: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const sub = await subService.getSubById(req.params.id);
        if (!sub) {
            return res.status(404).send({ error: 'Subscription not found' });
        }
        return res.json(sub);
    } catch (err) {
        return res.status(500).send({ error: 'Failed to retrieve subscription', details: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const allowedFields = ['memberId', 'movies'];
        const filteredData = filterAllowedFields(req.body, allowedFields);

        const status = await subService.createSub(filteredData);
        return res.status(201).json(status);
    } catch (err) {
        return res.status(500).send({ error: 'Failed to create subscription', details: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const allowedFields = ['memberId', 'movies'];
        const filteredData = filterAllowedFields(req.body, allowedFields);

        const status = await subService.updateSub(id, filteredData);
        if (!status) {
            return res.status(404).send({ error: 'Subscription not found' });
        }
        return res.json(status);
    } catch (err) {
        return res.status(500).send({ error: 'Failed to update subscription', details: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const status = await subService.deleteSub(req.params.id);
        if (!status) {
            return res.status(404).send({ error: 'Subscription not found' });
        }
        return res.json(status);
    } catch (err) {
        return res.status(500).send({ error: 'Failed to delete subscription', details: err.message });
    }
});

module.exports = router;
