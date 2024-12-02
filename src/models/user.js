const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//mongoose supports  middleware. Middleware is a way to customize our mongoose model
//schema act as middleware ---moongose.model('modelName',model/schema)
// new mongoose.Shcmea(modelstructure)

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique:true,//to avoid duplicate of email,it will create index in db
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
    },
    tokens:[{//array used here to achieve a functionality that allows us to be logged in with multiple devices at once
        token:{
            type:String,
            required:true
        }
    }]
})

// will define authentication token method //methods implemented on instances
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id.toString()},'thisMySecretKeyString');
    user.tokens = user.tokens.concat({token:token});
    user.save();
    return token;
}


//will create own defined schema fn //statics implemented on models
userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email});
    if(!user){
        throw new Error('Unable to login');
    }
    const isPasswordMatch = await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
        throw new Error('Unable to login')
    }
    return user;
} 

/* middleware fn 'save' help us, to do some action before or after save 
   userSchema.pre('fnName',normalfnForAction) //not arrow fn because it can't bind 'this'
   this ==> user, this gives access to each user.
*/

userSchema.pre('save', async function(next){
    const user = this;
    //check hash not to be performed on already hash password
    if(user.isModified('password')){
       user.password = await bcrypt.hash(user.password,8);
    }

    next(); //it called to when we are done, 
    //next need to be declared otherwise fn run hang ,hoping that above code is running/still performing before save
})
const User = mongoose.model('User', userSchema);

module.exports=User