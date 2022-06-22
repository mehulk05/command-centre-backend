const FilterModel =require('../model/dashboard-data');

exports.postFilter = async(req,res,next) => {
    try{
        let data = req.body;
        const filter = await FilterModel.create(data);
        if(filter) {
            return res.status(200).json({
                message : "Post Successfully....!",
                hasError : false,
                result:filter
            })
        }else{
            return res.status(400).json({
                message:"Not post ......!",
                hasError:true,
                result:{}
            })
        }
    }catch(error) {
        console.log("=============Filter error===============",error);
    }
};
exports.getAllFilter = async(req,res,next) =>{
    try{
        let filters = await FilterModel.fetchAll();
        if(filters) {
            return res.status(200).json({
                message : "Get All Filter Successfully....!",
                hasError : false,
                result:filters
            })
        }else{
            return res.status(400).json({
                message:"Not post ......!",
                hasError:true,
                result:[]
            })
        }
    }catch(error) {
        console.log("=============Filter error===============",error);
    }
}