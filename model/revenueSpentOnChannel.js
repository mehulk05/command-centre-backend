const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RevenueSpentOnChannel = new Schema({
    channelName:String,
    leadCount:Number,
    spend:Number,
    status :{
        type :String,
        enum : ["ACTIVE","INACTIVE","DELETE"],
        default : "ACTIVE"
    }
}, {
    timestamps:true
});

const RevenueSpentOnChannelModel = mongoose.model("RevenueSpentOnChannel",RevenueSpentOnChannel);
module.exports ={
    RevenueSpentOnChannelModel,
    create: async(data) => {
        try {
            let lead = await RevenueSpentOnChannelModel.create({
                channelName:data.channelName,
                leadCount:data.leadCount,
                spend:data.spend
            });
            return lead;
        }catch(error) {
            console.log("============Create Error===============",error);
        }
    },
    fetchAll : async () => {
        try{
            let revenue = await RevenueSpentOnChannelModel.find({
                status : "ACTIVE"
            });
            return revenue;

        }catch(error) {
            console.log("=================Fetch all error=================",error);
        }
    }
}