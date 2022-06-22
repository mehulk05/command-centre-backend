const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RevenueSpentOnCampaign = new Schema({
    campaignName:String,
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

const RevenueSpentOnCampaignModel = mongoose.model("RevenueSpentOnCampaign",RevenueSpentOnCampaign);
module.exports ={
    RevenueSpentOnCampaignModel,
    create: async(data) => {
        try {
            let lead = await RevenueSpentOnCampaignModel.create({
                campaignName:data.campaignName,
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
            let revenue = await RevenueSpentOnCampaignModel.find({
                status : "ACTIVE"
            })
            return revenue;

        }catch(error) {
            console.log("=================Fetch all error=================",error);
        }
    }
}