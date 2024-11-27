const express= require('express');

const app=express();
const port= process.env.PORT || 3000;

app.use(express.json()); //automatically parse json into object
app.post('/users',(req,res)=>{
console.log(req.body)
 res.send('testing!!')
})

app.listen(port,()=>{
    console.log('Server is up on port' + port);
})