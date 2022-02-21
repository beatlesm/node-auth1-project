/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */
function find() {
  return 'get wired'
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
function findBy(filter) {
  return 'get wired'
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
function findById(user_id) {
  return 'get wired'
}

/**
  resolves to the newly inserted user { user_id, username }
 */
function add(user) {
  return 'get wired'
}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = {
  add,
  find,
  findBy,
  findById
}