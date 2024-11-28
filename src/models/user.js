const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt = require('bcrypt');

//mongoose supports  middleware. Middleware is a way to customize our mongoose model
//schema act as middleware ---moongose.model('modelName',model/schema)
// mongoose.Shcmea(modelstructure)

const userSchema = mongoose.Schema({
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

//middleware fn save help us to some action before or after save 
//userSchema.pre('fnName',normalfnForAction) //not arrow fn because it can't bind 'this'
// this ==> user, this gives access to each user.

userSchema.pre('save', async function(next){
    const user = this;
    //check hash not to be performed already hash password
    console.log('m ',user.isModified('password'))
    if(user.isModified('password')){
       user.password = await bcrypt.hash(user.password,8);
    }

    next(); //need to be declared otherwise fn run on loop and never stop
})
const User = mongoose.model('User', userSchema);

module.exports=User