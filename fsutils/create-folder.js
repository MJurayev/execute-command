const fs = require("fs")

function createFolder(path) {
    if (!fs.existsSync(path))
        fs.mkdir(path, (err) => {
            if (err) throw err
            console.log(`${path} - created successfully`)
        })
}

module.exports = createFolder