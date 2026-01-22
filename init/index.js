const mongoose = require("mongoose");

const initdata = require("./data.js");

const Listing = require('../Models/listing.js');

const MONGO_URL = "mongodb://127.0.0.1:27017/travelbuddy";

main().then(()=>{
    console.log('db connected');
}).catch((err)=>{
    console.log(err);
})

async function main(){
  await mongoose.connect(MONGO_URL);
}

const initDb = async()=>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({
        ...obj,
        owner:"697087f85f17a48bc12de8ff",
    }));
      
    await Listing.insertMany(initdata.data);
    console.log("Data was initialized");
}

initDb();