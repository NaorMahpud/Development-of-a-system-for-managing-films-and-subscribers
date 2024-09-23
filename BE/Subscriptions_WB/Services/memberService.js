const memberModel = require('../Models/memberModel')


const getAllMembers = async () => {
    const members = await memberModel.find({})
    return members
}

const getMemberById = async (id) => {
    const member = await memberModel.findById(id)
    return member
}

const createMember = async (newOne) => {
    const newMember = new memberModel(newOne)
    await newMember.save()
    return "Created"
}

const updateMember = async (id, updatedOne) => {
    await memberModel.findByIdAndUpdate(id, updatedOne)
    return "Updated"
}

const deleteMember = async (id) => {
    await memberModel.findByIdAndDelete(id)
    return "Deleted"
}

module.exports = { deleteMember, updateMember, createMember, getAllMembers, getMemberById }