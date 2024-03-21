import mongoose from 'mongoose';

const locationCardSchema= new mongoose.Schema({

    readicharge_Core_id:{
        type:String,
        unique:true,
        required:true
    },
    locationCard_name:{
        type:String,
        required:[true,"Please provide a name"],
        unique:true
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
    active:{
        type:Boolean,
        default:false
    },
    lat:{
        type:Number,
        default:'0'
    },
    lng:{
        type:Number,
        default:'0'
    }

});

const LocationCard = mongoose.models.LocationCard || mongoose.model("LocationCard",locationCardSchema);

export default LocationCard;