const memberModel = require('../Models/memberModel');

const getAllMembers = async () => {
    try {
        const members = await memberModel.find({});
        return members;
    } catch (error) {
        throw new Error('Failed to retrieve members');
    }
};

const getMemberById = async (id) => {
    try {
        const member = await memberModel.findById(id);
        if (!member) {
            throw new Error('Member not found');
        }
        return member;
    } catch (error) {
        throw new Error('Failed to retrieve member');
    }
};


const createMember = async (newOne) => {
    try {
        const newMember = new memberModel(newOne);
        await newMember.save();
        return {
            status: "Successfully Created",
            member: newMember 
        };
    } catch (error) {
        throw new Error('Failed to create member');
    }
};


const updateMember = async (id, updatedOne) => {
    try {
        const updatedMember = await memberModel.findByIdAndUpdate(id, updatedOne, { new: true });
        if (!updatedMember) {
            throw new Error('Member not found');
        }
        return {
            status: "Successfully Updated",
            member: updatedMember
        };
    } catch (error) {
        throw new Error('Failed to update member');
    }
};

const deleteMember = async (id) => {
    try {
        const deletedMember = await memberModel.findByIdAndDelete(id);
        console.log(deletedMember)
        if (!deletedMember) {
            throw new Error('Member not found');
        }
        return {
            status: "Successfully Deleted",
            member: deletedMember 
        };
    } catch (error) {
        throw new Error('Failed to delete member');
    }
};

module.exports = { deleteMember, updateMember, createMember, getAllMembers, getMemberById };
