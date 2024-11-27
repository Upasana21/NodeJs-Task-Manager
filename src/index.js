const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //automatically parse json into object

app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    });
})

//GET USER data
app.get('/users',(req,res)=>{
    User.find({}).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.status(500).send(err)
    })
})

//FETCH USER data by ID
app.get('/users/:id',(req,res)=>{    
    const _id=req.params.id; //to fetch id i.e params from request(url), will use req.params
    User.findById(_id)
    .then((user)=>{     
        res.send(user)
    }).catch((err)=>{
          //in case user not found for that particular Id , will send NOT FOUND err msg
        if(err.name=='CastError'){
            res.status(404).send('Invalid Id');
        }
        res.status(500).send(err);
    })
})

//creating endpoint for task
app.post('/tasks',(req,res)=>{
    const task = new Task(req.body);

    task.save().then(()=>{
        res.status(201).send(task);
    }).catch((error)=>{
        res.status(400).send(error);
    })
})

//GET task data
app.get('/tasks',(req,res)=>{
    Task.find({})
    .then((task)=>{
        res.send(task)
    }).catch((err)=>{
        res.status(500).send(err)
    })
})

//GET task data by id
app.get('/tasks/:id',(req,res)=>{
    const _id= req.params.id;
    Task.findById(_id).then((task)=>{
        res.send(task);
    }).catch((err)=>{
        if(err.name=='CastError'){
            res.status(404).send('Id not found');
        }
        res.status(500).send(err);
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port);
})