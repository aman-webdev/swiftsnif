const shortuniqueId = require("short-unique-id")

function generateId(length) {
    const uuid = new shortuniqueId({length})
    return uuid.rnd()
}

module.exports = generateId