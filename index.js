const express = require('express')
const { connection } = require('./config/db')
const app = express()
const cors = require('cors')
require('dotenv').config()
const {bugRouter}= require('./routes/bugs.route')
const {userRouter}= require('./routes/user.route')
const { authenticate } = require('./middlewares/authenticate')





app.use(express.json())
app.use(cors({
    origin : '*'
}))
app.get('/', (req,res)=>{
    res.send('Hi! Connections, Welcome to Home')
})


app.use('/user', userRouter)
app.use(authenticate)
app.use('/bug', bugRouter)


app.listen(process.env.PORT,async()=>
{
    try{
        await connection
        console.log('Connected to DB Successfully')
    }
    catch(err){
        console.log('Error connecting to DB Successfully')
        console.log(err)

    }
    console.log('Listening on port ', process.env.PORT)
})