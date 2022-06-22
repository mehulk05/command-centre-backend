const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CampaignDetail = new Schema({
    name:String,
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

const CampaignDetailModel = mongoose.model("CampaignDetail",CampaignDetail);
module.exports ={
    CampaignDetailModel,
    create: async(data) => {
        try {
            let lead = await CampaignDetailModel.create({
                name:data.name,
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
            let campaign = await CampaignDetailModel.find({
                status : "ACTIVE"
            });
            return campaign;

        }catch(error) {
            console.log("=================Fetch all error=================",error);
        }
    }
}