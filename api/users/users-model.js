const db = require('../../data/db-config');


function find() {
  return db("users").select('user_id', 'username')
}

function findBy(filter) {
  return db("users")
    .select('user_id', 'username')
    .where(filter)
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

function findById(id) {
  return db("users")
  .select('user_id', 'username')
  .where({ id }).first();
}

module.exports = {
  add,
  find,
  findBy,
  findById,
};