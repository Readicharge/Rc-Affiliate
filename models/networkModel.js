import mongoose from 'mongoose';

const networkSchema = new mongoose.Schema({
 perSaleReturn:{
    type:String,
    default:'0'
 }
})

const NetworkData = mongoose.models.NetworkData || mongoose.model('NetworkData',networkSchema);

export default NetworkData;