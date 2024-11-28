const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //automatically parse json into object

//create/save user data
app.post('/users', async (req, res) => {
    //async returns promise but express doesn't matter of return , consider about req,res
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e)
    }
    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((error) => {
    //     res.status(400).send(error);
    // });
})

//GET USER data
app.get('/users', async (req, res) => {
    try {
        const user = await User.find({})
        res.send(user);
    } catch (e) {
        res.status(500).send(e)
    }
})

//FETCH USER data by ID
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id; //to fetch id i.e params from request(url), will use req.params
    try {
        const user = await User.findById(_id);
        if (!user) {
            res.status(404).send('Invalid Id');
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

//creating endpoint for task
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task); //then
    } catch (e) {
        res.status(400).send(error);
    }
})

//GET task data
app.get('/tasks', async (req, res) => {
    const task = await Task.find({})
    try {
        res.send(task);
    } catch (err) {
        res.status(500).send(err);
    }
})

//GET task data by id
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if (!task) {
            res.status(404).send('Invalid Id')
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
})

app.listen(port, () => {
    console.log('Server is up on port' + port);
})