const mongoose=require("mongoose")
const {Schema}=mongoose

const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:()=>{
            const localDate=new Date();
            return localDate
        }
    }
})

const User=mongoose.model('users',UserSchema)
module.exports=User