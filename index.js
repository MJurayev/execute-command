const express = require('express')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const createFolder = require('./fsutils/create-folder')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// execution codes path
const dirPath = path.join(process.cwd(), "assets/code")

createFolder(dirPath)
// executor user


app.post("/js", (req, res) => {
    const { code, ext, name } = req.body
    const codeFilePath = path.join(dirPath, `${name}_${Date.now()}${ext}`);
    const file = fs.createWriteStream(codeFilePath)
    file.write(code, (err) => {
        if (err) throw err
    })
    exec(`node ${codeFilePath}`, (error, stdout, stderr) => {
        fs.rm(codeFilePath, (error) => {
            if (error) console.log("Fayl Tozalashda xatolik")
            else console.log("Fayl tozalandi", codeFilePath)
        })
        if (error) throw error
        if (stdout) return res.status(200).json({ out: stdout })
        return res.status(400).json({ out: stderr })

    })
})

app.post("/js", (req, res) => {
    const { code, ext, name } = req.body
    const codeFilePath = path.join(dirPath, `${name}_${Date.now()}${ext}`);
    const file = fs.createWriteStream(codeFilePath)
    file.write(code, (err) => {
        if (err) throw err
    })
    exec(`node ${codeFilePath}`, (error, stdout, stderr) => {
        fs.rm(codeFilePath, (error) => {
            if (error) console.log("Fayl Tozalashda xatolik")
            else console.log("Fayl tozalandi", codeFilePath)
        })
        if (error) throw error
        if (stdout) return res.status(200).json({ out: stdout })
        return res.status(400).json({ out: stderr })

    })
})

app.listen(7000, () => {
    console.log("7000 - port ishlamoqda")
})