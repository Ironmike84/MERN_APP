const mongoose = require('mongoose')
const config = require('config')
const DB = config.get("mongoURI")


const connectDB = async ()=>{
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true
        });

        console.log('MongoDB Connected...')
    }catch(err){
        console.log(err.message);
        //Exit Process with failure
        process.exit(1)
    }
}

module.exports = connectDB

