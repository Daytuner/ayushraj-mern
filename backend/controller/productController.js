import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";


const getProduct = asyncHandler(async(req,res)=>{
    const products =await Product.find({})
    res.json(products);
})

const getProductById = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
       return  res.json(product);
    }else{
        res.status(404);
        throw new Error('Resourse not Found');
    }
})


// @desc Create a products
// @route POST /api/products
// @access Public 
const createProduct = asyncHandler(async(req,res)=>{
    const products = new Product({
        name:'Sample name',
        price:0,
        user:req.user._id,
        image:'/image/sample.jpg',
        brand:'Sample brand',
        category:'Sample category',
        countInstock:0,
        numReviews:0,
        description:'Sample description'
    })
    const createdProduct = await products.save()
    res.status(200).json(createdProduct)
})

export {getProduct,getProductById,createProduct}