const Listing = require("../Models/listing.js");

module.exports.index =async(req,res)=>{
   let allListing =await Listing.find({});
   res.render("listings/index.ejs",{allListing});
}

module.exports.renderNewForm =(req,res)=>{
   res.render("listings/create.ejs");
}

module.exports.showListing =async(req,res)=>{
    let {id}= req.params;
    let listing = await Listing.findById(id)
    .populate({path:"reviews", 
        populate:{
            path:"author"
        }
    })
    .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exists!!");
        return res.redirect('/listing')
    }
   res.render("listings/show.ejs",{listing});
}

module.exports.createListing =async(req,res)=>{
    let url = req.file.path;
    let filename = req.file.filename;
   
     let listing = req.body.listing;         
    const newlistig= new Listing(listing);      
    //let newlisting = new Listing(req,body.listing)
    newlistig.owner = req.user._id;        
    newlistig.image ={url,filename};
    await newlistig.save(); 
    req.flash("success","New Listing Created!!");
    res.redirect('/listing');
}

module.exports.renderEditForm = async(req,res)=>{
    let {id}= req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exists!!");
        return res.redirect('/listing')
    }
   let originalImageUrl= listing.image.url;
   originalImageUrl.replace("/upload","/upload/h_300,w_250")
    res.render("listings/edit.ejs",{listing , originalImageUrl});
}

module.exports.updateListing =async(req,res)=>{
    let {id} = req.params;
   let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing},{runValidators:true});

   if(typeof req.file !== "undefined" ){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image ={url,filename};
        await listing.save();
   }
    req.flash("success","Listing Updated!!");
    res.redirect(`/listing/${id}`);
}

module.exports.destroyListing =async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
     req.flash("success","Listing Deleted!!");
    res.redirect('/listing');
}