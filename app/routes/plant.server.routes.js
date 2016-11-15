var Plant = require('../models/plant.model');

module.exports = function (app) {
	app.get('/api/plants', function (req, res) {
	    getPlants(res);
	});
}

function getPlants(res) {
    Plant.find(function (err, plants) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(plants);
    });
}
