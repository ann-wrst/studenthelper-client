function authenticationMiddleware () {
    return function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      return next();
    }
  }
  
  module.exports = authenticationMiddleware