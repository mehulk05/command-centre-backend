const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Leads = new Schema({
    channelName:String,
    campaignName:String,
    startDate:{
        type:Date
    },
    endDate:{
        type: Date
    },
    status :{
        type :String,
        enum : ["ACTIVE","INACTIVE","DELETE"],
        default : "ACTIVE"
    }
}, {
    timestamps:true
});

const LeadsModel = mongoose.model("Lead",Leads);
module.exports ={
    LeadsModel,
    create: async(body) => {
        try {
            let lead = await LeadsModel.create({
                channelName :  body.channelName ,
                campaignName:  body.campaignName,
                startDate: body.startDate ,
                endDate: body.endDate 
            });
            return lead;
        }catch(error) {
            console.log("============Create Error===============",error);
        }
    },
    fetchAll : async () => {
        try{
            let lead = await LeadsModel.find({
                status : "ACTIVE"
            });
            return lead;

        }catch(error) {
            console.log("=================Fetch all error=================",error);
        }
    }
}