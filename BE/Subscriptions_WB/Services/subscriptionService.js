const subscriptionModel = require('../Models/subscriptionModel')

const getAllSubs = async () => {
    const subs = await subscriptionModel.find({})
    return subs
}

const getSubById = async (id) => {
    const sub = await subscriptionModel.findById(id)
    return sub
}

const createSub = async (newOne) => {
    const newSub = new subscriptionModel(newOne, {new: true})
    await newSub.save()
    return {
        status: "Successfully Created",
        ...newSub
    }
}

const updateSub = async (id, updatedOne) => {
    await subscriptionModel.findByIdAndUpdate(id, updatedOne)
    return "Updated"
}

const deleteSub = async (id) => {
    await subscriptionModel.findByIdAndDelete(id)
    return "Deleted"
}

module.exports = { deleteSub, updateSub, createSub, getAllSubs, getSubById }