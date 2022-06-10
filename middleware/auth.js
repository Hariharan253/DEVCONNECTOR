const jwt = require('jsonwebtoken');
const config = require('config');
const { decode } = require('jsonwebtoken');

module.exports = function(req, res, next){
    //Get token from Header
    const token = req.header('x-auth-token');

    //check if no token
    if(!token){
        return res.status(401).json({msg: 'No Token, authorization Denied'});
    }

    //verify Token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // res.end(config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch(err) {
        res.status(401).json({msg: 'Token is not valid'});
    }
}