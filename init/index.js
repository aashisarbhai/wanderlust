const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing =require("../models/listing.js");
require('dotenv').config();

// const mongo_url="mongodb://127.0.0.1:27017/StayEase";
const dbUrl= process.env.ATLASDB_URL;

async function main(){
    await mongoose.connect(dbUrl);
    console.log("Connected to database");
}

main()
.then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log(err);
});

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"68f7843f22b180fb758873c1"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
};

initDB();