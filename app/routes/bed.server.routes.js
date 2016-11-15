var Bed = require('../models/bed.model');

module.exports = function (app) {
    app.get('/api/beds', function (req, res) {
        getBeds(res);
    });

    // create bed and send back all beds after creation
    app.post('/api/beds', function (req, res) {
        Bed.create({
            text: req.body.text,
            width: req.body.width,
            height: req.body.height,
            plants: req.body.plants,
            done: false
        })
        .then(function(data) {
            getBeds(res);
        })
        .catch(function(err) {
            res.send(err);
        });
    });

    // delete a bed
    app.delete('/api/beds/:bed_id', function (req, res) {
        Bed.remove({
            _id: req.params.bed_id
        }, function (err, bed) {
            if (err)
                res.send(err);

            getBeds(res);
        });
    });
}

function getBeds(res) {
    Bed.find(function (err, beds) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(beds); // return all beds in JSON format
    }).populate('plants');
}
