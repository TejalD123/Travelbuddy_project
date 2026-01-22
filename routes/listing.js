const express = require("express");
const router = express.Router();
const wrapAsnyc = require('../utlis/wrapAsnyc.js');
const {isLoggedIn ,isOwner,validateListing} = require("../middleware");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })


const listingRoute = require("../controllers/listings.js");

//common part = /listings

//index and create List route

    router
    .route('/')
    .get(wrapAsnyc(listingRoute.index))
    .post(isLoggedIn,
    upload.single('listing[image]'),
      validateListing, 
    wrapAsnyc(listingRoute.createListing))
   
//new route

router.get('/new',isLoggedIn,listingRoute.renderNewForm);


//edit , update and delete route

    router
    .route('/:id')
    .get(wrapAsnyc(listingRoute.showListing))
    .put(isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
        validateListing,
        wrapAsnyc(listingRoute.updateListing))
    .delete(isLoggedIn,
        isOwner,
        wrapAsnyc(listingRoute.destroyListing));



//edit route
router.get('/:id/edit',
    isLoggedIn,
    isOwner,
    wrapAsnyc(listingRoute.renderEditForm));


module.exports = router;