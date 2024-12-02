const express = require('express');
require('./db/mongoose');

const userRoute = require('./routers/userRoute');
const taskRoute = require('./routers/taskRoute');

const app = express();
const port = process.env.PORT || 3000;

//middleware fn ,req ->do something->route handler
app.use((req,res,next)=>{
    res.status(503).send('Site is under maintenance');
    next();
})

app.use(express.json()); //automatically parse json into object
app.use(userRoute); // this will register user route to express server
app.use(taskRoute);

// const bcrypt = require('bcrypt');

//  const myfunction= async()=>{
//     const password='Typero45';
//     //bcrypt function returns promises
//     const hashPassword = await bcrypt.hash(password,8);
//     console.log(password,hashPassword);
//     //hashing alogrithm is one way process, can't decrypt to get back original password

//     const isMatch = await bcrypt.compare('Typero45',hashPassword);
//     console.log(isMatch);    
//  }
//   myfunction()

// const jwt = require('jsonwebtoken');
// const jsonWebTokenfn = ()=>{
//     //create token
//     const token = jwt.sign({_id:'12RY'},'thisIsSecretKeyCharacter',{expiresIn:'1 day'})
//     console.log(token);
//     const data = jwt.verify(token,'thisIsSecretKeyCharacter');
//     console.log(data)
// }

// jsonWebTokenfn();

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})