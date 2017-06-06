const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
	let token = req.body.token || req.param('token') || req.headers['authorization'];
	    if (token) {
			jwt.verify(token, 'secretkey', function(err, decoded) {          
	            if (err) {
	                return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });      
	            } else {
	                req.decoded = decoded;
	                next();
	            }
	        });
	    } else {
	        return res.status(403).send({ 
	            success: false, 
	            message: 'No token provided.'
	        });
	    }
};