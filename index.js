const express=require('express');
const app=express();
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const authRouter=require('./routes/auth');
const taskRouter=require('./routes/task');
const session = require('express-session');
const cors=require('cors');

app.use(express.json());
app.use(cors());
dotenv.config();

app.use(session({
    secret: '234567876543',
    resave: false,
    saveUninitialized: true,
  }));

mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log(err);
})

app.use('/api/v1/auth/',authRouter);
app.use('/api/v1/task/',taskRouter);

app.listen(5000,(req,res)=>{
    console.log('Server is running on port 5000');
})