const userModel = require('../Models/userModel')
const userJsonRepo = require('../Repositories/userRepo')
const permissionRepo = require('../Repositories/permissionRepo');

const getAllUsers = async () => {
    try {
        const usersFromDb = await userModel.find({});
        const usersFromJson = await userJsonRepo.readUserJson();
        const permissionsFromJson = await permissionRepo.readPermissionJson();

        const combinedUsers = usersFromDb.map((dbUser) => {
            const userId = dbUser._id.toString();

            const jsonUser = usersFromJson.find(jsonUser => jsonUser.id === userId);
            const userPermissions = permissionsFromJson.find(permission => permission.id === userId);

            const { id, ...jsonUserWithoutId } = jsonUser || {};

            return {
                ...dbUser.toObject(),
                ...jsonUserWithoutId,
                permissions: userPermissions ? userPermissions.permissions : []
            };
        });

        return combinedUsers;
    } catch (err) {
        throw new Error('Error merging users: ' + err.message);
    }
};

const getUserById = async (id) => {
    try {
        const userDB = await userModel.findById(id)
        if (!userDB) {
            throw new Error('User not found in the system')
        }
        const usersFromJson = await userJsonRepo.readUserJson();
        const userJson = usersFromJson.find(userJson => userJson.id === id)

        const permissionsFromJson = await permissionRepo.readPermissionJson();
        const userPermissions = permissionsFromJson.find(permission => permission.id === id);

        const { id: jsonId, ...jsonUserWithoutId } = userJson || {};
        return {
            ...userDB.toObject(),
            ...jsonUserWithoutId,
            permissions: userPermissions ? userPermissions.permissions : []
        }
    } catch (err) {
        throw new Error('Error fetching user by ID: ' + err.message);
    }

}

const createUser = async (userData) => {
    try {
        const newUser = new userModel({
            username: userData.username,
            password: "",
            role: "User"
        })
        const savedUser = await newUser.save()
        const userId = savedUser._id.toString()

        const usersFromJson = await userJsonRepo.readUserJson()
        usersFromJson.push({
            id: userId,
            firstName: userData.firstName,
            lastName: userData.lastName,
            createdDate: new Date().toISOString().split("T")[0],
            sessionTimeOut: +userData.sessionTimeOut
        })
        await userJsonRepo.writeToUserJson(usersFromJson)

        const permissionsFromJson = await permissionRepo.readPermissionJson()
        permissionsFromJson.push({
            id: userId,
            permissions: userData.permissions
        })
        await permissionRepo.writeToPermissionJson(permissionsFromJson)

        return {
            status: "Successfully Created!!",
            ...savedUser.toObject(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            sessionTimeout: userData.sessionTimeout,
            permissions: userData.permissions
        };

    } catch (err) {
        throw new Error('Error creating user: ' + err.message);
    }
}

const updateUser = async (id, updatedData) => {
    try {
        const { username, permissions, firstName, lastName, sessionTimeOut } = updatedData || {}
        const dbUser = await userModel.findByIdAndUpdate(id, { username }, { new: true });
        if (!dbUser) {
            throw new Error('Username not found in DB');
        }

        const usersFromJson = await userJsonRepo.readUserJson();
        const userIndex = usersFromJson.findIndex(jsonUser => jsonUser.id === id);
        if (userIndex !== -1) {
            usersFromJson[userIndex] = {
                ...usersFromJson[userIndex],
                ...{ firstName, lastName, sessionTimeOut: +sessionTimeOut }
            };
            await userJsonRepo.writeToUserJson(usersFromJson);
        }

        const permissionsFromJson = await permissionRepo.readPermissionJson();
        const permissionIndex = permissionsFromJson.findIndex(permission => permission.id === id);
        if (permissionIndex !== -1) {
            permissionsFromJson[permissionIndex].permissions = permissions;
            await permissionRepo.writeToPermissionJson(permissionsFromJson);
        }

        return {
            status: "Successfully Updated!!",
            ...dbUser.toObject(),
            ...updatedData
        };
    } catch (err) {
        throw new Error('Error updating user: ' + err.message);
    }
};

const deleteUser = async (id) => {
    try {
        const deleteUser = await userModel.findByIdAndDelete(id)
        if (!deleteUser) {
            throw new Error('User not found in MongDB')
        }

        const usersFromJson = await userJsonRepo.readUserJson()
        const filteredUsers = usersFromJson.filter(jsonUser => jsonUser.id !== id)
        await userJsonRepo.writeToUserJson(filteredUsers)
        const userIndex = usersFromJson.findIndex(jsonUser => jsonUser.id === id)

        const permissionsFromJson = await permissionRepo.readPermissionJson()
        const filteredPermissions = permissionsFromJson.filter(per => per.id !== id)
        await permissionRepo.writeToPermissionJson(filteredPermissions)

        return {
            status: "Successfully Deleted!!",
            _id: deleteUser._id,
            firstName: usersFromJson[userIndex].firstName,
            lastName: usersFromJson[userIndex].lastName
        }

    } catch (err) {
        throw new Error('Error deleting user: ' + err.message);
    }
}


module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser }
