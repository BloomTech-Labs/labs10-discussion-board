require('dotenv').config();

const jwt = require('jsonwebtoken');

const { secureKey } = require('../globals.js');

// authenticate that the user making the request is the same one whos info is being requested
// (e.g. you cannot request a different user's profile info)
function authenticate(req, res, next) {
	const token = req.get('Authorization');
	if (!token) {
		return res.status(401).json({
			error: 'No token provided. It must be set on the Authorization Header.',
		});
	}
	return jwt.verify(token, secureKey, (err, decoded) => {
		if (err) return res.status(401).json({ error: 'Your login has expired. Please sign in again.' });
		req.decoded = decoded;
		const requestingUserID = req.params.user_id;
		const loggedInUserID = '' + req.decoded.id;
		if (requestingUserID !== loggedInUserID) {
			return res.status(401).json({ error: 'Not authorized.' });
		}
		next();
	});
};

module.exports = {
	authenticate,
};
