const mongoose = require("mongoose")

const connect = async()=>{
     try{
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log("Mongodb connected")
}
catch(e){
    console.log("error occured while connecting db", e);
    process.exit(1);
}
}

module.exports = connect;