const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsnyc = require('../utlis/wrapAsnyc.js');
const {isLoggedIn,validateReview, isReviewOwner } = require("../middleware");

const reviewController = require("../controllers/review.js");

//review post

router.post('/',
   isLoggedIn,
   validateReview ,
    wrapAsnyc(reviewController.createReview));

//delete review route

router.delete('/:reviewId',
  isLoggedIn,
  isReviewOwner,
  wrapAsnyc(reviewController.destroyReview));

module.exports = router;