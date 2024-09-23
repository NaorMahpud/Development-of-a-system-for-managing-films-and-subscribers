const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

const readUserJson = async () => {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(data).users;
    } catch (err) {
        throw new Error('Error reading users JSON file: ' + err.message);
    }
};

const writeToUserJson = async (users) => {
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify({ users }, null, 2));
    } catch (err) {
        throw new Error('Error writing to users JSON file: ' + err.message);
    }
};

module.exports = { readUserJson, writeToUserJson };
