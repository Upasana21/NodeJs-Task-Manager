const express = require('express')
const User = require('../models/user');

const router = new express.Router()// create new route

// create/save user data
router.post('/users', async (req, res) => {
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

//login
router.post('/users/login', async(req,res)=>{
    //will find user by their mail id
    try{
        //will define/create our customize function 
        const user = await User.findByCredentials(req.body.email,req.body.password);
        if(!user){
            res.status(404).send('')
        }
        res.send(user)
    }catch(error){
        res.status(400).send(error);
    }
})


//GET USER data
router.get('/users', async (req, res) => {
    try {
        const user = await User.find({})
        res.send(user);
    } catch (e) {
        res.status(500).send(e)
    }
})

//FETCH USER data by ID
router.get('/users/:id', async (req, res) => {
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

//UPDATE USER
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Update' })
    }
    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        
        /* will update user in another way, 
        so that we can use schmea middleware, that will help in saving password in hash algorithm */

        const user = await User.findById(req.params.id);
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();

        if (!user) {
            res.status(404).send('Invalid user id!')
        }
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
})

//DELETE user
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).send({ error: 'Invalid User Id' })
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;