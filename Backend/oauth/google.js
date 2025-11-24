import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import dotenv from 'dotenv';
import User from '../models/User.model.js';

dotenv.config();
 
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://system-design-simulator-smoky.vercel.app/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    let user = await User.findOne({email: profile.emails[0].value});
    if(!user){
        user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
            createdAt: new Date()
        });
        console.log("Creating new user:",user);
        await user.save();
        console.log("User created");
    }
    return cb(null, user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function(id, done) {
  const user = await User.findById(id);
  done(null, user);
});
