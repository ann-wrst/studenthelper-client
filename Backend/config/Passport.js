/*
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const userCookie = {
    id: 1,
    email: 'test@test.tes',
    password: '123',
};

passport.serializeUser((user,done)=>{
done(null,user.id);
})
passport.deserializeUser((id,done)=>{
    //need found user from db
    done(null,user);
})

passport.use(new LocalStrategy({usernameField:'email'},
    function(email, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));
*/
