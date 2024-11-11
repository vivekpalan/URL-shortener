const shortid = require('shortid');
const URL = require('../models/url');

async function handleURLInput(req,res){

    if(!req.body.url) return res.status(400).json({ error : 'Url is required' })
        
    const shortId = shortid(8);
    await URL.create({
        shortId : shortId,
        redirectURL : req.body.url,
        visitedHistory : []
    })

    res.render('index',{
        id: shortId
    })

    // res.json({ id: shortId })

}

async function handleAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId : shortId });

    const totalClicks = result.visitHistory.length;
    res.json({ totalClicks: totalClicks, analytics : result.visitHistory  })
}

module.exports = {
    handleURLInput,
    handleAnalytics
}