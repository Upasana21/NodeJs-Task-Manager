const express = require('express');
const Task = require('../models/task');

const router = express.Router();

//creating endpoint for task
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task); //then
    } catch (e) {
        res.status(400).send(error);
    }
})

//GET task data
router.get('/tasks', async (req, res) => {
    const task = await Task.find({})
    try {
        res.send(task);
    } catch (err) {
        res.status(500).send(err);
    }
})

//GET task data by id
router.get('/tasks/:id', async (req, res) => {
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

//UPDATE TASK
router.patch('/tasks/:id', async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description','completed'];
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid Updates!'})
    }
    try{
        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true});
        if(!task){
            res.status(404).send({error:'Invalid Task Id!'});
        }
        res.send(task);
    }catch(e){
        res.status(400).send(e);
    }
})

// Delete task
router.delete('/tasks/:id', async (req,res) =>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            res.status(404).send({error:'Invalid Task Id'})
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e);
    }
})

module.exports=router;