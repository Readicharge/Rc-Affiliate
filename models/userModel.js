import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({

    readicharge_Core_id:{
        type:String,
        unique:true,
        required:true
    },
    userName:{
        type:String,
        required:[true,"Please provide a valid email"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Please privide a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please provide a valid password"]
    },
    userType:{
        type:String,
        required:[true,"Please specify the User Type"],
        enums:[
            "masterAdmin",
            "admin",
            "managerCX",
            "customerSupport",
            "managerInventory",
            "vendorInventory",
            "companyInstaller",
            "managerAffiliate",
            "readichargeSalesPerson",
            "affiliateViaNetwork",
            "independentAffiliate"
        ]
    },
    userBasedData:{
        type:Object
    },
    accountData:{
        type:Object
    },
    socialData:{
        type:Object
    },
    locationData:{
        type:Object
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    // For the Affiliate Section 
    payouts:{
        wallet_amount:{
            type:String,
            default:'0'
        },
        this_payout_date:{
            type:Date
        },
        next_payout_date:{
            type:Date
        },
        this_payout_status:{
            type:Boolean,
            default:false
        },
        next_payout_status :{
            type:Boolean,
            default:false
        }
    },

    forgotPasswordToken:String,
    forgotPasswordTokenExpiery:Date,
    verifyToken:String,
    verifyTokenExpiery:Date

});

const User = mongoose.models.User || mongoose.model("User",userSchema);

export default User;