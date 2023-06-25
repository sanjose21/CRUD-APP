const knex = require('./knexConnection');


const getItems = (item) => {
  return knex('item').where({ item_name: item.item_name }).select();
};


const getUser = async (user) => {
  try {
    const userData = await knex('users').where(user).first();
    if (!userData) {
      throw new Error('User not found');
    }
    return userData;
  } catch (error) {
    throw error;
  }
};


const getAllItems = () => {
  return knex.select().from('item');
};


const createUser = async (user) => {
  try {
    const [newUser] = await knex('users').insert(user).returning('*');
    return newUser;
  } catch (err) {
    throw err;
  }
};

const createItem = async (item) => {
  try {
    const [newItem] = await knex('item').insert(item).returning('*');
    return newItem;
  } catch (err) {
    throw err;
  }
};


const updateItem = async (id, item) => {
  // const id = await knex('item').where({ item_name }).select();
  return knex('item').where(id).update(item);
};


const deleteItem = async ({ item_name }, item) => {
  const id = await knex('item').where({ item_name }).select();
  return knex('item').where({ id: id[0].id }).del();
};

module.exports = {
  createUser,
  createItem,
  getItems,
  getAllItems,
  updateItem,
  deleteItem,
  getUser,
};
