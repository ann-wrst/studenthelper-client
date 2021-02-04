const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

const authenticationMiddleware = require('./')

// Generate Password
const saltRounds = 10
const myPlaintextPassword = 'my-password'
const salt = bcrypt.genSaltSync(saltRounds)
const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt)

const user = {
  email: 'test@test.tes',
  passwordHash,
  id: 1
}

function findUser (email, callback) {
  if (email === user.email) {
    return callback(null, user)
  }
  return callback(null)
}
passport.authenticationMiddleware=authenticationMiddleware;
passport.serializeUser(function (user, cb) {
  cb(null, user.email)
})

passport.deserializeUser(function (email, cb) {
  findUser(email, cb)
})

function initPassport () {
  passport.use(new LocalStrategy(
    (email, password, done) => {
      findUser(email, (err, user) => {
        if (err) {
          return done(err)
        }

        // User not found
        if (!user) {
          console.log('User not found')
          return done(null, false)
        }

        // Always use hashed passwords and fixed time comparison
        bcrypt.compare(password, user.passwordHash, (err, isValid) => {
          if (err) {
            return done(err)
          }
          if (!isValid) {
            return done(null, false)
          }
          return done(null, user)
        })
      })
    }
  ))
  passport.authenticationMiddleware=authenticationMiddleware;
}

module.exports = initPassport