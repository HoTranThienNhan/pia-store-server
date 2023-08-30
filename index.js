const express = require("express")
const dotenv = require("dotenv")
const { default: mongoose } = require("mongoose")
dotenv.config()

const app = express()
const port = process.env.PORT || 3001 // different from port 3000 of frontend

app.get('/', (req, res) => {
    res.send('Hello World')
})

mongoose.connect(`mongodb+srv://nhanhotranthien:${process.env.MONGO_DB}@cluster0.7bu2zz1.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    console.log('Connect MongoDB successful!')
})
.catch((err) => {
    console.log(err)
})

app.listen(port, () => {
    console.log('Server is running on port ', port)
})