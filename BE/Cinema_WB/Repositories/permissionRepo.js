const fs = require('fs');
const path = require('path');

const permissionsFilePath = path.join(__dirname, '../data/Permissions.json');

const readPermissionJson = async () => {
    try {
        const data = fs.readFileSync(permissionsFilePath, 'utf8');
        return JSON.parse(data).permissions;
    } catch (err) {
        throw new Error('Error reading permissions JSON file: ' + err.message);
    }
};

const writeToPermissionJson = async (permissions) => {
    try {
        fs.writeFileSync(permissionsFilePath, JSON.stringify({ permissions }, null, 2));
    } catch (err) {
        throw new Error('Error writing to permissions JSON file: ' + err.message);
    }
};

module.exports = { readPermissionJson, writeToPermissionJson };
