(require("dotenv")).config();

const mongoose   = require("mongoose");
const { Schema } = mongoose;


mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("open", 
  () => console.log("connection.open@mongoose"));


mongoose.model(
    process.env.MONGODB_COLLECTION_USERS, 

    new Schema({

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
        }
    }));


//
module.exports = { mongoose };

