const router = require('express').Router();
const bcrypt = require("bcryptjs");
const Users = require('../users/users-model');
// Require `checkUsernameFree`, `checkUsernameExists` and `checkPasswordLength`
// middleware functions from `auth-middleware.js`. You will need them here!
const { checkUsernameFree, checkUsernameExists, checkPasswordLength } = require('../auth/auth-middleware')

router.post('/register', checkPasswordLength, checkUsernameFree, (req, res, next) => {
  /**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status 200 
  {
    "user_id": 2,
    "username": "sue"
  }

  response on username taken:
  status 422
  {
    "message": "Username taken"
  }

  response on password three chars or less:
  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
 */

  res.json('register')
})

router.post('/login', checkUsernameExists, async (req, res, next) => {
    
/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */  
  res.json('login')
})

router.get('/logout', (req, res, next) => {
/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */
  res.json('logout')
})
 
// Don't forget to add the router to the `exports` object so it can be required in other modules
module.exports = router;
