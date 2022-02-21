const router = require('express').Router();
// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!
const { restricted } = require('../auth/auth-middleware')
const Users = require("./users-model.js")

router.get("/", restricted, (req, res, next) => {
/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */
  res.json('get /api/users')
})  

// Don't forget to add the router to the `exports` object so it can be required in other modules
module.exports = router;