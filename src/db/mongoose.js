const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error(`Can't contain Password`)
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be positive integer')
            }
        }
    }
})

const me = new User({ name: ' Andrew ', email: ' AnfrewJack@gmail.com', password: 'Jack0*45' });

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })

const Task = mongoose.model('Task', {
    description: { 
        type: String,
        trim:true,
        required:true        
    },
    completed: { 
        type: Boolean,
        default:false,        
    }
})

const task = new Task({
    description: ' Mopping             ',
})

task.save().then(() => {
    console.log(task);
}).catch((err) => {
    console.log(err);
})