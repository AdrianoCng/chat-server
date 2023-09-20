import User from '@models/User';
import passport from 'passport';
import { Strategy } from 'passport-local';

function initializePassportConfig() {
  passport.use(
    new Strategy(async function (username, password, done) {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          return done(null, false, { message: "User don't exists" });
        }

        const passwordMatchs = await user.comparePassword(password);

        if (!passwordMatchs) {
          return done(null, false, { message: 'Incorrect password' });
        }

        done(null, user);
      } catch (error) {
        done(error);
      }
    }),
  );

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

export default initializePassportConfig;
