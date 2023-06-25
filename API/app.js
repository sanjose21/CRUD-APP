const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const port = process.env.PORT || 3000;
const {
  createUser,
  createItem,
  getItems,
  getAllItems,
  updateItem,
  deleteItem,
  getUser,
} = require('./knex/knexControllers');

const app = express();
app.listen(port, () => console.log(`Server is listening on port 3000`));

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('server up and running');
});

app.get('/api/v1/item/:item_name', async (req, res) => {
  try {
    const item = await getItems(req.params);
    res.status(201).send(item);
  } catch (e) {
    console.log(e);
  }
});

app.patch('/api/v1/item/:id', async (req, res) => {
  try {
    await updateItem(req.params, req.body);
    console.log(req.params, req.body);
    res.status(201).send('item updated successfully');
  } catch (e) {
    console.log('This is the error from the patch', e);
  }
});

app.delete('/api/v1/item/:item_name', async (req, res) => {
  try {
    await deleteItem(req.params);
    const item = await getItems(req.params);
    res.status(201).send(JSON.stringify(`Record: ${req.params.item_name} has been deleted`));
  } catch (e) {
    console.log(e);
  }
});

app.get('/api/v1/item', async (req, res) => {
  try {
    const items = await getAllItems();
    res.status(201).send(items);
  } catch (e) {
    console.log(e);
  }
});

app.post('/api/v1/createuser', async (req, res) => {
  try {
    await createUser(req.body);
    res.status(201).send(req.body);
  } catch (e) {
    if (e.code === '23505') {
      res.status(400).send('User already exists');
    } else {
      console.log(e);
      res.status(500).send('Internal server error');
    }
  }
});

app.get('/api/v1/user/:username', async (req, res) => {
  try {
    const user = await getUser(req.params);
    res.status(200).send(user)[0];
  } catch (e) {
    if (e.message === 'User not found') {
      res.status(400).send(e.message);
    } else {
      console.log(e);
      res.status(500).send('Internal server error');
      console.log(e.message);
    }
  }
});

app.post('/api/v1/createitem', async (req, res) => {
  try {
    await createItem(req.body);
    res.status(201).send(req.body);
  } catch (e) {
    if (e.code === '23505') {
      res.status(400).send('Item already exists');
    } else {
      console.log(e);
      res.status(500).send('Internal server error');
    }
  }
});

module.exports = app;
