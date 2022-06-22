const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyparser = require('body-parser');

//Load env vars
dotenv.config({ path: ".env" })
//Import Routes 
const LeadRouter = require('./routes/lead');
const LeadByMonthRouter = require('./routes/leadbyMonth');
const RevenueSpentByMonthRouter = require('./routes/revenueSpentByMonth');
const RevenueSpentOnCampaignRouter = require('./routes/revenueSpentOnCampaign');
const RevenueSpentOnChannelRouter = require('./routes/revenueSpentOnChannel');
const CampaignDetailRouter = require('./routes/campaignDetail');
const FilterRouter = require('./routes/dashboard-data');
// App Initialization


// Origins Allow
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
//Routes Setup
//======================
app.use("/api",LeadRouter);
app.use('/api',LeadByMonthRouter);
app.use('/api',RevenueSpentByMonthRouter);
app.use('/api',RevenueSpentOnCampaignRouter);
app.use('/api',RevenueSpentOnChannelRouter);
app.use('/api',CampaignDetailRouter);
app.use('/api',FilterRouter)
//========================
//End Routes Setup

// app.use(express.bodyParser());


const PORT = process.env.PORT || 5000;

mongoose
    .connect( process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true
    })
    .then((result) => {
        app.listen(PORT, () => {
            console.log(`app listening: ${PORT}`)
        })
    }).catch((err) => {
        console.log("[App.mongoose]".red, err)
    })