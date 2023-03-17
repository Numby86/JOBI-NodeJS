const jwt = require('jsonwebtoken');
const createError = require('../errors/create-errors');

const isAuthJWT = (req, res, next) => {
    const authorization = req.headers.authorization;
    if(!authorization) {
        return next(createError('No estas autorizado', 401));
    }
    const splitAuth = authorization.split(" ");
    if(splitAuth.length !== 2 || splitAuth[0] !== "Bearer"){
        return next(createError("Cabecera authentication incorrecta", 400))
    }
    const token = splitAuth[1];
    let payload;
    try {
        payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
    } catch (err) {
        return next(err);
    }
    req.authority = {
        id: payload.id,
        email: payload.email
    };
    next();
};

const isAuthAdmin = (req, res, next) => {
    const authorization = req.headers.authorization;
    if(!authorization) {
        return next(createError('No estas autorizado', 401));
    }
    const splitAuth = authorization.split(" ");
    if(splitAuth.length !== 2 || splitAuth[0] !== "Bearer"){
        return next(createError("Cabecera authentication incorrecta", 400))
    }
    const token = splitAuth[1];
    let payload;
    try {
        payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
    } catch (err) {
        return next(err);
    }
    req.authority = {
        id: payload.id,
        email: payload.email
    };
    if(payload.role !== "administrador"){
        return next(createError('No eres un administrador autorizado. '), 401);
    }
    next();
};

module.exports = isAuthJWT;