import mongoose from 'mongoose';



// The Product Details will be 
// 1. product id
// 2. product name 
// 3. product category 
// 4. product description 
// 5. product rating 
// 6. product stock 
// 7. product image Array 
// 8. product company name 
// 9. product price 
// 10. product listing status 



const productSchema = new mongoose.Schema({

    readicharge_Core_id:{
        type:String,
        required:true,
        unique:true
    },
    product_name : {
        type:String,
        required:true
    },
    product_category:{
        type:String,
        enums:["residential","commercial"],
        default:"residential",
        required:true
    },
    product_description:{
        type:String
    },
    product_rating:{
        type:String,
        default:0
    },
    product_stock:{
        type:String,
        default:0
    },
    product_image:[
        {type:Object}
    ],
    product_company_name:{
        type:String,
        required:true    
    },
    product_price:{
        type:String,
        default:0
    },
    product_listing_status:{
        type:Boolean,
        default:false
    }
})


const Product = mongoose.models.productReadicommerce || mongoose.model("productReadicommerce",productSchema);

export default Product;