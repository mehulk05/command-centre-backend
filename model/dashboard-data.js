const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Filter = new Schema({
    campaignName:String,
    channelName : String,
    totalLeads:Number,
    totalLeadsByMonth:Number,
    totalLeadsByToday : Number,
    totalLeadsByWeek : Number,
    totalLeadsLastMonth : Number,
    totalLeadsYesterday : Number,
    totalLeadsByLastWeek : Number,
    status : {
        type:String,
        enum:["ACTIVE","INACTIVE","DELETED"],
        default : "ACTIVE"
    }

},{
    timestamps: true
});
const FilterModel = mongoose.model("FilterModel",Filter);

module.exports ={
    FilterModel,
    fetchAll: async() => {
        try{
            let data = await FilterModel.find({
                status:"ACTIVE"
            });
            return data;
        }catch(error) {
            console.log("==============Filter fetching error================",error);
        }
    },
    create : async(body) => {
        try{
            let filter = await FilterModel.create({
                campaignName : body.campaignName,
                channelName : body.channelName,
                totalLeads : body.totalLeads,
                totalLeadsByMonth : body.totalLeadsByMonth,
                totalLeadsByToday : body.totalLeadsByToday,
                totalLeadsByWeek: body.totalLeadsByWeek,
                totalLeadsLastMonth: body.totalLeadsLastMonth,
                totalLeadsYesterday : body.totalLeadsYesterday,
                totalLeadsByLastWeek: body.totalLeadsByLastWeek
            })
            return filter;

        }catch(error) {
            console.log("===============Filter create error================",error);
        }

    }
}