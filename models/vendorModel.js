import mongoose from 'mongoose';

const vendorSchema= new mongoose.Schema({

    readicharge_Core_id:{
        type:String,
        unique:true,
        required:true
    },
    vendor_name:{
        type:String,
        required:[true,"Please provide a name"]
    },
    addressLine1:{
        type:String,
        unique:true,
        required:[true,"Please privide a valid address"]
    },
    city:{
        type:String,
        required:[true,"Please provide a valid password"]
    },
    state:{
        type:String,
        required:[true,"Please specify the State"],
    },
    zip:{
        type:String,
        required:true
    },
    locationCardId:{
        type:mongoose.Schema.ObjectId,
        required:false
    }

});

const Vendor = mongoose.models.Vendor || mongoose.model("Vendor",vendorSchema);

export default Vendor;