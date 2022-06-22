const CampaignDetailModel = require('../model/campaignDetail');
const axios = require('axios').default;
var _ = require("underscore");
exports.postCampaignDetail = async(req,res,next) =>{
    try{
        let data = req.body;
        const lead = await CampaignDetailModel.create(data);

        if(lead) {
            return res.status(200).json({
                message:"Post Successfully......",
                hasError:false,
                result:lead
            })
        }else{
            return res.status(400).json({
                message:"not post ......!",
                hasError:true,
                result:{}
            })
        }
    }catch(error) {
        console.log("==============error=============",error);
        next();
    }
};
exports.getAllCampaign = async(req,res,next) => {
    try{
        
        var config = {
            method: 'get',
            url: 'https://api.close.com/api/v1/lead/',
            headers: { 
            'Accept': 'application/json', 
            'Authorization': 'Basic YXBpXzF1SEtLdEo3aFlLQWRUMEQ2SVNzSmIuMXdvWnZteTNVOEU3VzQ1ejlvTDFRTzo='
            }
        };
        
        axios(config)
        .then(function (response) {
            // console.log(response,JSON.parse(response.data));
            var campaigns = response.data.data.map(item => item.name)
            .filter((value, index, self) => self.indexOf(value) === index)

            return res.status(200).json({
                message : "Fatch all successfully......",
                hasError:false,
                result : campaigns
            })
            
        })
        .catch(function (error) {
            console.log(error);
            return res.status(400).json({
                message:"Data not fetch.....!",
                hasError:true,
                result : []
            })
        });

       
    }catch(error) {
        console.log("===============Fetch all error ==============",error);
    }
}