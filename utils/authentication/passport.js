const passport = require("passport");
const User = require("../../models/Users");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const createError = require("../errors/create-errors");

passport.use(
  "register",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const previousUser = await User.findOne({ email });
        if (previousUser) {
          return done(createError("Este usuario ya existe, inicia sesion. "));
        }
        const encPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          email,
          password: encPassword,
        });
        const savedUser = await newUser.save();
        return done(null, savedUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const currentUser = await User.findOne({ email });
        if (!currentUser) {
          return done(
            createError("No existe ningun usuario con este email, registrate. ")
          );
        }
        const isValidPassword = await bcrypt.compare(
          password,
          currentUser.password
        );
        if (!isValidPassword) {
          return done(
            createError("La contraseña es incorecta, prueba de nuevo. ")
          );
        }
        currentUser.password = null;
        return done(null, currentUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const existingUser = await User.findById(userId);
    return done(null, existingUser);
  } catch (err) {
    return done(err);
  }
});
