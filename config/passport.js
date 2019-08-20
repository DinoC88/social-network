const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("./keys");
const conn = require("../db/index");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      const userId = jwt_payload.id;
      conn.query('SELECT * FROM users WHERE id=?', userId, (err, user)=> {
        if (user.length > 0) {
          return done(null, user[0]);
        }
        return done(null, false);
      })
    })
  );
};
