const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RevenueSpentByMonth = new Schema({
    jan:String,
    feb:String,
    mar:String,
    apr:String,
    may:String,
    jun:String,
    jul:String,
    Aug:String,
    Sep:String,
    Oct:String,
    nov:String,
    dec:String,
    status :{
        type :String,
        enum : ["ACTIVE","INACTIVE","DELETE"],
        default : "ACTIVE"
    }
}, {
    timestamps:true
});

const RevenueSpentByMonthModel = mongoose.model("RevenueSpentByMonth",RevenueSpentByMonth);
module.exports ={
    RevenueSpentByMonthModel,
    create: async(data) => {
        try {
            let lead = await RevenueSpentByMonthModel.create({
                jan:data.jan,
                feb:data.feb,
                mar:data.mar,
                apr:data.apr,
                may:data.may,
                jun:data.jun,
                jul:data.jul,
                aug:data.aug,
                sep:data.sep,
                oct:data.oct,
                nov:data.nov,
                dec:data.dec
            });
            return lead;
        }catch(error) {
            console.log("============Create Error===============",error);
        }
    },
    fetchAll : async () => {
        try{
            let revenue = await RevenueSpentByMonthModel.find({
                status : "ACTIVE"
            });
            return revenue;

        }catch(error) {
            console.log("=================Fetch all error=================",error);
        }
    }
}