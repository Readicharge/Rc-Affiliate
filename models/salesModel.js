import mongoose from 'mongoose';

const salesSchema = new mongoose.Schema({
    
    // 1. SalesPerson 
    perSaleReturn:{
        type:String
    },
    perSaleTargetReturn:{
        type:String
    },
    additional25Sale:{
        type:String
    },
    additional50Sale:{
        type:String
    },
    additional75Sale:{
        type:String
    },
    additional100Sale:{
        type:String
    },
    additional125Sale:{
        type:String
    },
    additional150Sale:{
        type:String
    },
    additional175Sale:{
        type:String
    },
    additional200Sale:{
        type:String
    },
    additional225Sale:{
        type:String
    },
    additional250Sale:{
        type:String
    }
})

const SalesData = mongoose.models.SalesData || mongoose.model('SalesData',salesSchema);

export default SalesData;