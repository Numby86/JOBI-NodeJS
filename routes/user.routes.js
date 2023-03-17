const express = require("express");
const passport = require("passport");
const User = require("../models/Users");
const createError = require("../utils/errors/create-errors");
const bcrypt = require('bcrypt');
const getJWT = require("../utils/authentication/jsonWebToken");

const userRouter = express.Router();

userRouter.post("/register", (req, res, next) => {
  const done = (err, user) => {
    if (err) {
      //return next(err);
      return res.status(500).json(res);
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json(res);
      }
      return res.status(201).json(user);
    });
  };
  passport.authenticate("register", done)(req);
});

userRouter.post("/login", (req, res, next) => {
  const done = (err, user) => {
    if (err) {
      return next(err);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json(user);
    });
  };
  passport.authenticate("login", done)(req);
});

userRouter.post("/logout", (req, res, next) => {
  if (req.user) {
    req.logout(() => {
      req.session.destroy(() => {
        res.clearCookie("connect.sid");
        return res.status(200).json("Hasta pronto!");
      });
    });
  } else {
    return res.sendStatus(304).json("No hay ningun usuario logueado en este momento. ");
  }
});

userRouter.post('/login-jwt', async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return next(createError('El usuario no existe'), 404);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return next(createError('La contraseña no es válida, prueba de nuevo. ', 403));
    }

    user.password = null;
    const token = getJWT(user);
    return res.status(200).json({
        user,
        token
    });
});

module.exports = userRouter;