const express = require('express');
const Model = require('../models/model');
const router = express.Router()

module.exports = router;

//Post Method
router.get('/search', async (req, res) => {
    var name = req.query.search;
    var day = req.query.day;

    let query = {};
    query['lot_name'] = { $regex: new RegExp(name, 'i') }; 

    let dayField = `availability_${day.toLowerCase()}`;
    query[dayField] = { $exists: true };

    console.log(query);

    const lots = await Model.find(query);
    console.log(lots);
    res.render("index", {"lots" : lots, "day" : dayField});
});

router.get('/admin', async (req, res) => {
    let search = req.query.search;
    let query = {};
    query['lot_name'] = { $regex: new RegExp(search, 'i') }; 
    const lots = await Model.find(query);
    res.render("admin", {"lots" : lots});
});

router.post('/admin/remove', async (req, res) => {
    let lot_num = req.query.lot_number;
    let query = {};
    query['lot_number'] = lot_num;
    const data = await Model.findOneAndDelete(query);
    console.log("Removed: " + data);

    res.redirect("/admin");
});

router.post('/admin/new', async (req, res) => {
    console.log(req.body);

    const new_entry = new Model({
        "lot_type" : req.body.lot_type,
        "lot_name" : req.body.lot_name,
        "lot_number" : req.body.lot_number,
        "total_spaces" : req.body.total_spaces,
        "availability_monday" : {
            "0700" : req.body.availability_monday.split(',')[0],
            "1100" : req.body.availability_monday.split(',')[1],
            "1400" : req.body.availability_monday.split(',')[2],
            "1600" : req.body.availability_monday.split(',')[3],
        },
        "availability_tuesday" : {
            "0700" : req.body.availability_tuesday.split(',')[0],
            "1100" : req.body.availability_tuesday.split(',')[1],
            "1400" : req.body.availability_tuesday.split(',')[2],
            "1600" : req.body.availability_tuesday.split(',')[3],
        },
        "availability_wednesday" : {
            "0700" : req.body.availability_wednesday.split(',')[0],
            "1100" : req.body.availability_wednesday.split(',')[1],
            "1400" : req.body.availability_wednesday.split(',')[2],
            "1600" : req.body.availability_wednesday.split(',')[3],
        },
        "availability_thursday" : {
            "0700" : req.body.availability_thursday.split(',')[0],
            "1100" : req.body.availability_thursday.split(',')[1],
            "1400" : req.body.availability_thursday.split(',')[2],
            "1600" : req.body.availability_thursday.split(',')[3],
        },
        "availability_friday" : {
            "0700" : req.body.availability_friday.split(',')[0],
            "1100" : req.body.availability_friday.split(',')[1],
            "1400" : req.body.availability_friday.split(',')[2],
            "1600" : req.body.availability_friday.split(',')[3],
        }
    });

    const saved = await new_entry.save();
    console.log(saved);
    res.redirect("/admin");
});