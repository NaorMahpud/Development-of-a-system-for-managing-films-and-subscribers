const subscriptionModel = require('../Models/subscriptionModel');

const getAllSubs = async () => {
    try {
        const subs = await subscriptionModel.find({});
        return subs;
    } catch (error) {
        throw new Error('Failed to retrieve subscriptions');
    }
};

const getSubById = async (id) => {
    try {
        const sub = await subscriptionModel.findById(id);
        if (!sub) {
            throw new Error('Subscription not found');
        }
        return sub;
    } catch (error) {
        throw new Error('Failed to retrieve subscription');
    }
};

const createSub = async (newOne) => {
    try {
        const newSub = new subscriptionModel(newOne);
        await newSub.save();
        return {
            status: "Successfully Created",
            subscription: newSub 
        };
    } catch (error) {
        throw new Error('Failed to create subscription');
    }
};

const updateSub = async (id, updatedOne) => {
    try {
        const updatedSub = await subscriptionModel.findByIdAndUpdate(id, updatedOne, { new: true });
        if (!updatedSub) {
            throw new Error('Subscription not found');
        }
        return {
            status: "Successfully Updated",
            subscription: updatedSub 
        };
    } catch (error) {
        throw new Error('Failed to update subscription');
    }
};

const deleteSub = async (id) => {
    try {
        const deletedSub = await subscriptionModel.findByIdAndDelete(id);
        if (!deletedSub) {
            throw new Error('Subscription not found');
        }
        return {
            status: "Successfully Deleted",
            subscription: deletedSub 
        };
    } catch (error) {
        throw new Error('Failed to delete subscription');
    }
};

module.exports = { deleteSub, updateSub, createSub, getAllSubs, getSubById };
