const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title:{
         type:String,
         required:true
    },
    description:{
         type:String,
          required:true,
    },
    image: {
    filename: {
      type: String,
      default: "listingimage"
    },
    url: {
      type: String,
      default: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291bnRyeXxlbnwwfHwwfHx8MA%3D%3D",
      set: v=>
        v === ""
      ? "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y291bnRyeXxlbnwwfHwwfHx8MA%3D%3D"
      :v
    }
  },
    price:{
        type:Number,
        required:true,
    },
    location:{
         type:String,
          required:true,
    },
    country:{
        type:String,
         required:true,
    },
    reviews :[
      {
        type:Schema.Types.ObjectId,
        ref:"Review",
      }
    ],
    owner:{
      type:Schema.Types.ObjectId,
      ref:"User",
    }


});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
   await Review.deleteMany({_id:{$in:listing.reviews}})
  }
})

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;

