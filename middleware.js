const Listing = require('./Models/listing');
const  Review = require('./Models/review.js');
const {listingSchema,reviewSchema}= require('./schema.js');
const ExpressError = require("./utlis/ExpressError.js");

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl ;     
        req.flash("error","you must be logged in to create listing!");
       return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);       
    if(!listing.owner.equals(res.locals.currentUser._id)){
        req.flash("error","you are not the owner of this listing");
       return  res.redirect(`/listing/${id}`)
    }
    next();
}

//middleware mongoose Joi for listing

module.exports.validateListing = (req, res, next) => {
    if (req.body === undefined) {
        throw new ExpressError(400, "Listing data is required");
    }

    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

//middleware mongoose Joi for review

module.exports.validateReview = (req, res, next) => {
     
    if (req.body === undefined) {
        throw new ExpressError(400, "Review  is required");
    }
   console.log(req.body);
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

module.exports.isReviewOwner = async(req,res,next)=>{
    let {id ,reviewId} = req.params;
    let review= await Review.findById(reviewId);       
    if(!review.author.equals(res.locals.currentUser._id)){
        req.flash("error","you are not the author of this review");
       return  res.redirect(`/listing/${id}`)
    }
    next();
}
