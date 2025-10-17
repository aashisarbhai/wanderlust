const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const{reviewSchema}=require("../schema.js");
const Review =require("../models/review.js");
const Listing =require("../models/listing.js");
const mongoose = require("mongoose");


const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,error.message);
    }
    else{
        next();
    }
};

// review-POST Route
router.post("/", validateReview, wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const newReview = new Review(req.body.review);

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created!");

    // Detect by Accept header
    const acceptHeader = req.get("Accept") || "";

    if (acceptHeader.includes("application/json")) {
        // API client
        return res.status(201).json({
            message: "Review added successfully",
            review: newReview
        });
    } else {
        // Browser form
        return res.redirect(`/listings/${listing._id}`);
    }
}));

//review-delete route
router.delete("/:reviewId", wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { 
        $pull: { reviews: new mongoose.Types.ObjectId(reviewId) } 
    });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
}));

module.exports=router;