const { findBy } = require('../users/users-model')

function restricted(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    next({
      status: 401,
      message: 'You shall not pass!'
    })
  }
}


function checkUsernameFree(req, res, next) {
  findBy(req.body.username)
    .then(res => {
      if (res) {
        next({message: 'Username taken',
              status: 422})
      }
      else {
        next()
      }
    })
    .catch(err => {
      next(err)
    })
}


function checkUsernameExists(req, res, next) {
  findBy(req.body.username) 
    .then(res => {
      if (res) {
        req.user = res[0]
        next()
      }
      else {
        next({message: 'Invalid credentials',
              status: 401})
      }
    })
    .catch(err => {
      next(err)
    })
}


function checkPasswordLength(req, res, next) {
  if (!req.body.password || req.body.password.length < 4) {
    next({message: 'Password must be longer than 3 chars',
          status: 422})
  }
  else {
    next()
  }
}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
}