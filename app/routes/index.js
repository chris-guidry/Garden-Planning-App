var fs = require('fs');

module.exports = function(app) {
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file === "index.js" || file.substr(file.lastIndexOf('.') + 1) !== 'js')
            return;
        var name = file.substr(0, file.indexOf('.js'));
        require('./' + name)(app);
    });

	app.get('/', function (req, res) {
	    res.sendFile(path.join(__dirname, '../../public/index.html'));
	});
}
