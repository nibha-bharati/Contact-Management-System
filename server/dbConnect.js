const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config({path:"../.env"})


const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);  
        console.log("MongoDB Connected")

    }catch(error){
        console.error("MongoDB Connection error",error)
        process.exit(1)
    }
}

module.exports=connectDB
