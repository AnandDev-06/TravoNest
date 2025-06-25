const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controllers/listing.js");
const multer=require('multer');
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

router
.route("/")
.get(wrapAsync(listingController.index))   //INDEX ROUTE
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing));  //Create route

//NEW ROUTE (form for Creating New Listing)
router.get("/new",isLoggedIn,listingController.renderNewForm);

router
.route("/:id")
.get(wrapAsync(listingController.showListing))   //SHOW ROUTE
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing)) //UPDATE ROUTE
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing)); //DELETE ROUTE

//EDIT ROUTE
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));

module.exports=router;