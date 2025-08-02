import express from 'express';
import { addlisting, deleteListing, findListing, getListing, ratingListing, search, updateListing } from '../controller/listing.controller.js';
import isAuth from '../middleware/isAuth.js';
import upload from '../middleware/multer.js'
const listingRouter = express.Router()
     
listingRouter.post('/add',isAuth,upload.fields([
    {name:'image1', maxCount:1}, 
    {name:'image2', maxCount:2},
    {name:'image3', maxCount:3}
]),addlisting);

listingRouter.post('/updatelisting/:id',isAuth,upload.fields([
    {name:'image1', maxCount:1},
    {name:'image2', maxCount:2},  
    {name:'image3', maxCount:3}
]),updateListing);

listingRouter.get('/getlisting',getListing);
listingRouter.get('/deletelisting/:id',deleteListing);
listingRouter.get('/findlisting/:id',findListing);
listingRouter.post('/rating/:id',ratingListing);
listingRouter.get('/search',search);

export default listingRouter;