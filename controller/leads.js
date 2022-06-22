const LeadModel = require('../model/leads');
const axios = require('axios').default;
var _ = require("underscore");
const res = require('express/lib/response');

exports.postLead = async(req,res,next) => {
    try{
        let data =req.body;
        console.log("Check Body :: ",data);
        const lead = await LeadModel.create(data);
        console.log("Check Lead" , lead)
        if(lead) {
            return res.status(200).json({
                message:"Successfully created..............",
                hasError:false,
                result:lead
            })
        }else{
            return res.status(400).json({
                message:"Lead not create........!",
                hasError:true,
                result:{}
            })
        }
    }catch(error) {
        console.log("================Lead post error-================",error);
        next();
    }
}

exports.postLeadsAll = async(req,res,next) => {
  try{
      let data =req.body;
      console.log(data.campaignname);
        
      let campdata = await getbycampaignName(req.body.campaignname,req.body.startDate,req.body.endDate);
        
        return res.status(200).json({
                  message:"Campaigns Data ..............",
                  hasError:false,
                  result:campdata
              })
  }catch(error) {
      console.log("================Lead post error-================",error);
      next();
  }
}


exports.getdashboardData = async(req,res,next) => {
    try{
                  
        let bymonth = await getleadsBytimeCount("this-month");
        let byweek = await getleadsBytimeCount("this-week");
        let today = await getleadsBytimeCount("today");
        
        let yesterday = await getleadsBytimeCount("yesterday");
        let lastweek = await getleadsBytimeCount("last-week");
        let lastmonth = await getleadsBytimeCount("last-month");

        let totaldata = {
            "ToalleadsByMonth": bymonth,
            "TotalLeadsToday" : today,
            "TotalLeadsInWeek" : byweek,
            "TotalLeadsLastMotnh": lastmonth,
            "TOtalLeadsYesterday" :yesterday,
            "TotalLeadsLastWeek ": lastweek
            };

        console.log(bymonth);

          return res.status(200).json({
                    message:"Dashboard Data ..............",
                    hasError:false,
                    result:totaldata
                })
    }catch(error) {
        console.log("================Lead post error-================",error);
        next();
    }
  }



async function getleadsBytimeCount(timeframe){
    var axios = require('axios');
    var data = JSON.stringify({
    "limit": null,
    "query": {
        "negate": false,
        "queries": [
        {
            "negate": false,
            "object_type": "lead",
            "type": "object_type"
        },
        {
            "negate": false,
            "queries": [
            {
                "negate": false,
                "queries": [
                {
                    "condition": {
                    "before": {
                        "range": ""+timeframe,
                        "type": "start_end_of_predefined_relative_period",
                        "which": "end"
                    },
                    "on_or_after": {
                        "range": ""+timeframe,
                        "type": "start_end_of_predefined_relative_period",
                        "which": "start"
                    },
                    "type": "moment_range"
                    },
                    "field": {
                    "field_name": "last_lead_status_change_date",
                    "object_type": "lead",
                    "type": "regular_field"
                    },
                    "negate": false,
                    "type": "field_condition"
                }
                ],
                "type": "and"
            }
            ],
            "type": "and"
        }
        ],
        "type": "and"
    },
    "include_counts": true,
    "_limit": 10,
    "cursor": null,
    "sort": []
    });

    var config = {
    headers: { 
        'Authorization': 'Basic YXBpXzF1SEtLdEo3aFlLQWRUMEQ2SVNzSmIuMXdvWnZteTNVOEU3VzQ1ejlvTDFRTzo=', 
        'Content-Type': 'application/json', 
        'Cookie': '_csrf_token=afa33b596d9eab787271b7ea4ec6fc6732cdd003'
    }
    };

    const response = await axios.post('https://api.close.com/api/v1/data/search',data,config);
    return response.data.count.total;
}

exports.getAllLeads = async(req,res,next) => {
    try{

        var config = {
            method: 'get',
            url: 'https://api.close.com/api/v1/lead?_fields=id,name,contacts,date_created,date_updated',
            headers: { 
            'Accept': 'application/json', 
            'Authorization': 'Basic YXBpXzF1SEtLdEo3aFlLQWRUMEQ2SVNzSmIuMXdvWnZteTNVOEU3VzQ1ejlvTDFRTzo='
            }
        };
        
        axios(config)
        .then(function (response) {
            

            return res.status(200).json({
                message : "Fatch all successfully......",
                hasError:false,
                result : response.data
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

async function getbycampaignName(campaignName,startDate,endDate){

  try{
    var campdata = [];
    var data = "";
    if(campaignName != "" && startDate == "" && endDate == ""){
      data = JSON.stringify({
        "limit": null,
        "query": {
          "negate": false,
          "queries": [
            {
              "negate": false,
              "object_type": "lead",
              "type": "object_type"
            },
            {
              "negate": false,
              "queries": [
                {
                  "negate": false,
                  "queries": [
                    {
                      "condition": {
                        "mode": "full_words",
                        "type": "text",
                        "value": ""+campaignName
                      },
                      "field": {
                        "field_name": "name",
                        "object_type": "lead",
                        "type": "regular_field"
                      },
                      "negate": false,
                      "type": "field_condition"
                    }
                  ],
                  "type": "and"
                }
              ],
              "type": "and"
            }
          ],
          "type": "and"
        },
        "results_limit": null,
        "sort": []
      });
    }
    else if(campaignName != "" && startDate != "" && endDate == ""){
      data = JSON.stringify({
        "limit": null,
        "query": {
            "negate": false,
            "queries": [
                {
                    "negate": false,
                    "object_type": "lead",
                    "type": "object_type"
                },
                {
                    "negate": false,
                    "queries": [
                        {
                            "negate": false,
                            "queries": [
                                {
                                    "condition": {
                                        "mode": "full_words",
                                        "type": "text",
                                        "value": ""+campaignName
                                    },
                                    "field": {
                                        "field_name": "name",
                                        "object_type": "lead",
                                        "type": "regular_field"
                                    },
                                    "negate": false,
                                    "type": "field_condition"
                                }
                            ],
                            "type": "and"
                        },
                        {
                            "negate": false,
                            "queries": [
                                {
                                    "condition": {
                                        
                                        "on_or_after": {
                                            "type": "fixed_local_date",
                                            "value": ""+startDate,
                                            "which": "start"
                                        },
                                        "type": "moment_range"
                                    },
                                    "field": {
                                        "field_name": "last_lead_status_change_date",
                                        "object_type": "lead",
                                        "type": "regular_field"
                                    },
                                    "negate": false,
                                    "type": "field_condition"
                                }
                            ],
                            "type": "and"
                        }
                    ],
                    "type": "and"
                }
            ],
            "type": "and"
        },
        "results_limit": null,
        "sort": []
    });
    }
    else if(campaignName != "" && startDate == "" && endDate != ""){
      data = JSON.stringify({
        "limit": null,
        "query": {
            "negate": false,
            "queries": [
                {
                    "negate": false,
                    "object_type": "lead",
                    "type": "object_type"
                },
                {
                    "negate": false,
                    "queries": [
                        {
                            "negate": false,
                            "queries": [
                                {
                                    "condition": {
                                        "mode": "full_words",
                                        "type": "text",
                                        "value": ""+campaignName
                                    },
                                    "field": {
                                        "field_name": "name",
                                        "object_type": "lead",
                                        "type": "regular_field"
                                    },
                                    "negate": false,
                                    "type": "field_condition"
                                }
                            ],
                            "type": "and"
                        },
                        {
                            "negate": false,
                            "queries": [
                                {
                                    "condition": {
                                        "before": {
                                            "type": "fixed_local_date",
                                            "value": ""+endDate,
                                            "which": "end"
                                        },
                                        "type": "moment_range"
                                    },
                                    "field": {
                                        "field_name": "last_lead_status_change_date",
                                        "object_type": "lead",
                                        "type": "regular_field"
                                    },
                                    "negate": false,
                                    "type": "field_condition"
                                }
                            ],
                            "type": "and"
                        }
                    ],
                    "type": "and"
                }
            ],
            "type": "and"
        },
        "results_limit": null,
        "sort": []
    });
  }
  else if(campaignName == "" && startDate != "" && endDate != ""){
    data = JSON.stringify({
      "limit": null,
      "query": {
          "negate": false,
          "queries": [
              {
                  "negate": false,
                  "object_type": "lead",
                  "type": "object_type"
              },
              {
                  "negate": false,
                  "queries": [
                      {
                          "negate": false,
                          "queries": [
                              {
                                  "condition": {
                                      "before": {
                                          "type": "fixed_local_date",
                                          "value": ""+endDate,
                                          "which": "end"
                                      },
                                      "on_or_after": {
                                          "type": "fixed_local_date",
                                          "value": ""+startDate,
                                          "which": "start"
                                      },
                                      "type": "moment_range"
                                  },
                                  "field": {
                                      "field_name": "last_lead_status_change_date",
                                      "object_type": "lead",
                                      "type": "regular_field"
                                  },
                                  "negate": false,
                                  "type": "field_condition"
                              }
                          ],
                          "type": "and"
                      }
                  ],
                  "type": "and"
              }
          ],
          "type": "and"
      },
      "results_limit": null,
      "sort": []
  });
  }
  else if(campaignName == "" && startDate == "" && endDate != ""){
    data = JSON.stringify({
      "limit": null,
      "query": {
          "negate": false,
          "queries": [
              {
                  "negate": false,
                  "object_type": "lead",
                  "type": "object_type"
              },
              {
                  "negate": false,
                  "queries": [
                      {
                          "negate": false,
                          "queries": [
                              {
                                  "condition": {
                                      "before": {
                                          "type": "fixed_local_date",
                                          "value": ""+endDate,
                                          "which": "end"
                                      },
                                      "type": "moment_range"
                                  },
                                  "field": {
                                      "field_name": "last_lead_status_change_date",
                                      "object_type": "lead",
                                      "type": "regular_field"
                                  },
                                  "negate": false,
                                  "type": "field_condition"
                              }
                          ],
                          "type": "and"
                      }
                  ],
                  "type": "and"
              }
          ],
          "type": "and"
      },
      "results_limit": null,
      "sort": []
  });
  }
  else if(campaignName == "" && startDate != "" && endDate == ""){
    data = JSON.stringify({
      "limit": null,
      "query": {
          "negate": false,
          "queries": [
              {
                  "negate": false,
                  "object_type": "lead",
                  "type": "object_type"
              },
              {
                  "negate": false,
                  "queries": [
                      {
                          "negate": false,
                          "queries": [
                              {
                                  "condition": {
                                     
                                      "on_or_after": {
                                          "type": "fixed_local_date",
                                          "value": ""+startDate,
                                          "which": "start"
                                      },
                                      "type": "moment_range"
                                  },
                                  "field": {
                                      "field_name": "last_lead_status_change_date",
                                      "object_type": "lead",
                                      "type": "regular_field"
                                  },
                                  "negate": false,
                                  "type": "field_condition"
                              }
                          ],
                          "type": "and"
                      }
                  ],
                  "type": "and"
              }
          ],
          "type": "and"
      },
      "results_limit": null,
      "sort": []
  });
  }
    else if(campaignName != "" && startDate != "" && endDate != ""){
      data = JSON.stringify({
        "limit": null,
        "query": {
            "negate": false,
            "queries": [
                {
                    "negate": false,
                    "object_type": "lead",
                    "type": "object_type"
                },
                {
                    "negate": false,
                    "queries": [
                        {
                            "negate": false,
                            "queries": [
                                {
                                    "condition": {
                                        "mode": "full_words",
                                        "type": "text",
                                        "value": ""+campaignName
                                    },
                                    "field": {
                                        "field_name": "name",
                                        "object_type": "lead",
                                        "type": "regular_field"
                                    },
                                    "negate": false,
                                    "type": "field_condition"
                                }
                            ],
                            "type": "and"
                        },
                        {
                            "negate": false,
                            "queries": [
                                {
                                    "condition": {
                                        "before": {
                                            "type": "fixed_local_date",
                                            "value": ""+endDate,
                                            "which": "end"
                                        },
                                        "on_or_after": {
                                            "type": "fixed_local_date",
                                            "value": ""+startDate,
                                            "which": "start"
                                        },
                                        "type": "moment_range"
                                    },
                                    "field": {
                                        "field_name": "last_lead_status_change_date",
                                        "object_type": "lead",
                                        "type": "regular_field"
                                    },
                                    "negate": false,
                                    "type": "field_condition"
                                }
                            ],
                            "type": "and"
                        }
                    ],
                    "type": "and"
                }
            ],
            "type": "and"
        },
        "results_limit": null,
        "sort": []
    });
    }
      console.log("yeee",data)
      var config = {
        headers: { 
          'Authorization': 'Basic YXBpXzF1SEtLdEo3aFlLQWRUMEQ2SVNzSmIuMXdvWnZteTNVOEU3VzQ1ejlvTDFRTzo=', 
          'Content-Type': 'application/json', 
          'Cookie': '_csrf_token=afa33b596d9eab787271b7ea4ec6fc6732cdd003'
        }
      };
      
      const response = await axios.post('https://api.close.com/api/v1/data/search',data,config);
      var leadsData = [];
      
      const reduceAllsource = response.data.data.slice(0,5);
      console.log(reduceAllsource);

      const allSourcesWithDetails = reduceAllsource.map(async (_1sourceEachtime)=>{
        const itemOption = await getleaddetById(_1sourceEachtime.id);
        // this the place you can mix the 2 result.
        //console.log("item",itemOption.data);
        // const mixRes1AndRes2 ={
        //   sources:itemOption.data
        // }
        
        return itemOption;
      })

      finalRes= await Promise.all(allSourcesWithDetails);
      console.log(":final",finalRes)
      return finalRes;
    }catch(error) {
      console.log("==============error=============",error);
  }

}

async function getleaddetById(leadId){


    var config = {
    headers: { 
        'Accept': 'application/json', 
        'Authorization': 'Basic YXBpXzF1SEtLdEo3aFlLQWRUMEQ2SVNzSmIuMXdvWnZteTNVOEU3VzQ1ejlvTDFRTzo=', 
        'Cookie': '_csrf_token=afa33b596d9eab787271b7ea4ec6fc6732cdd003'
    }
    };
    
    const response = await axios.get('https://api.close.com/api/v1/lead/'+leadId+'?_fields=id,name,contacts,date_created,date_updated',config);
    
    return response.data;
}