const express = require('express');
const router = express.Router();
const subscriptionService = require('../Services/subscriptionService');

router.get('/', async (req, res) => {
    try {
        const subscriptions = await subscriptionService.getSub();
        return res.json(subscriptions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch subscriptions: ' + err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const subscription = await subscriptionService.getSubById(req.params.id);
        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }
        return res.json(subscription);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch subscription: ' + err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { memberId, movies } = req.body;

        if (!memberId || !movies) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const subscriptionData = await subscriptionService.createSub(req.body);
        return res.status(201).json({ message: 'Subscription added successfully', subscription: subscriptionData });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add subscription: ' + err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedSubscription = await subscriptionService.updateSub(req.params.id, req.body);
        return res.json({ message: 'Subscription updated successfully', subscription: updatedSubscription });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update subscription: ' + err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedSubscription = await subscriptionService.deleteSub(req.params.id);
        return res.json({ message: 'Subscription deleted successfully', subscription: deletedSubscription });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete subscription: ' + err.message });
    }
});

module.exports = router;
