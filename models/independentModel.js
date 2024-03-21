import mongoose from 'mongoose';

const independentSchema = new mongoose.Schema({
  per10KSaleReturn:{
    type:String
  },
  per25KSaleReturn:{
    type:String
  },
  per50KSaleReturn:{
    type:String
  }
})

const IndependentData = mongoose.models.IndependentData || mongoose.model('IndependentData',independentSchema);

export default IndependentData;