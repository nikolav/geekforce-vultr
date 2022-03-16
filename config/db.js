(require("dotenv"))
  .config({ override: true });

const mongoose = require("mongoose");

mongoose.connection.on("open", 
  () => console.log("connection.open@mongoose"));
mongoose.connect(process.env.MONGODB_URI);


mongoose.model(

    process.env.MONGODB_COLLECTION_USERS, 

    new mongoose.Schema({

        name: String, 

        email: {
            type     : String, 
            index    : true, 
            required : true,
        },

        passwordHash: String,
        
        "_@": {
            type      : Date, 
            default   : Date.now, 
            immutable : true, 
        },
        
    }));


//
module.exports = { mongoose };

