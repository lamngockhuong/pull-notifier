import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import UserService from '@/services/user.service';

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const userService = new UserService();

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    const user = await userService.findByEmail(email);
    if (!user) {
      return done(undefined, false, { message: `user with ${email} not found` });
    }

    if (user.password === password) {
      return done(undefined, user);
    }

    return done(undefined, false, { message: `Invalid email or password` });
  }),
);

passport.use(
  new JwtStrategy({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: process.env.JWT_SECRET }, async (jwtToken, done) => {
    const user = await userService.findByEmail(jwtToken.email);
    if (!user) {
      return done(undefined, false);
    } else {
      return done(undefined, user, jwtToken);
    }
  }),
);
