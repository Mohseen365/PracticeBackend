const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');


app.use(express.json());// ye json ko js object me convert krta he, isse use krna padta he put aur post req (f/d se server pr data aa rha he)ko chalane ke liye
app.use(cookieParser());

const userRouter = require('./Routers/userRouter');
const authRouter = require('./Routers/authRouter');

app.use('/auth',authRouter);
app.use('/user',userRouter);//no need to add localhost i.e. base url

const planModel = require('./models/planModel')

app.listen(5000);



