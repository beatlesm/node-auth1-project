const router = require('express').Router();
const bcrypt = require("bcryptjs");
const { BCRYPT_ROUNDS } = require('../../secret')
const Users = require('../users/users-model');
// Require `checkUsernameFree`, `checkUsernameExists` and `checkPasswordLength`
// middleware functions from `auth-middleware.js`. You will need them here!
const { checkUsernameFree, checkUsernameExists, checkPasswordLength } = require('../auth/auth-middleware')

router.post('/register', checkPasswordLength, checkUsernameFree, (req, res, next) => {
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS);

  Users.add({username, password:hash})
    .then(saved => {
      res.status(201).json(saved)
    })
    .catch(next)
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
})

router.post('/login', checkUsernameExists, async (req, res, next) => {
  const { password }  = req.body
  if (bcrypt.compareSync(password, req.user.password)) {
    req.session.user = req.user
    res.json({message: `Welcome ${req.user.username}!`})
  } else {
    next ({status: 401, message: "Invalid credentials"})
  }     
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
})

router.get('/logout', (req, res, next) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        res.json({ message: `sorry, could you retry` })        
      } else {
        // set a new cookie in THE PAST
        res.set('Set-Cookie', 'monkey=; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00')
        res.json({ message: "logged out" })        
      }
    })
  } else {
    res.json({ message: "no session" })
  }
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
  
})
 
// Don't forget to add the router to the `exports` object so it can be required in other modules
module.exports = router;
