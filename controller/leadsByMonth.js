const LeadsByMonthModel = require('../model/leadsbyMonth');

exports.postLeadByMonth = async(req,res,next) =>{
    try{
        let data = req.body;
        const lead = await LeadsByMonthModel.create(data);

        if(lead) {
            return res.status(200).json({
                message:"Post Successfully......",
                hasError:false,
                result:lead
            })
        }else{
            return res.status(400).json({
                message:"Lead by month not post ......!",
                hasError:true,
                result:{}
            })
        }
    }catch(error) {
        console.log("==============Leads by month error=============",error);
        next();
    }
}
exports.getAllLeadsByMonth = async(req,res,next) => {
    try{
        let data = await LeadsByMonthModel.fetchAll();
        if (data) {
            return res.status(200).json({
                message : "Fatch all successfully......",
                hasError:false,
                result :data
            })
        }else{
            return res.status(400).json({
                message:"Data not fetch.....!",
                hasError:true,
                result : []
            })
        }
    }catch(error) {
        console.log("===============Fetch all error ==============",error);
    }
}