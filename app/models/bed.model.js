var mongoose = require('mongoose');

module.exports = mongoose.model('Bed', {
	text: {
        type: String,
        required: true
    },
    width: {
    	type: Number,
    	default: 3
    },
    height: {
    	type: Number,
    	default: 10
    },
    plants: [{
        type: Number,
        ref: 'Plant'
    }],
	created: {
	    type: Date,
	    default: Date.now
	}
});