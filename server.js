const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
const path = require('path');
const data = require('./data');

dotenv.config(); /* LLAMANDO A DOTENV */

const app = express();


/* MIDDLEWARE */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ///////////////////////////////////////////////////////////////////////////////////////// */
/* BASE DE DATOS CONEXION*/

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/sokiosk', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

/* ESQUEMA PRODUCTOS */
const Product = mongoose.model(
  'products',
  new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    calorie: Number,
    category: String,
  })
);
/* ///////////////////////////////////////////////////////////////////////////////////////// */

/* API CATEGORIAS */
app.get('/api/categories', (req, res) => res.send(data.categories));


/* API OBTENER PRODUCTOS */
app.get('/api/products', async (req, res) => {
  const { category } = req.query;
  const products = await Product.find(category ? { category } : {});
  res.send(products);
});

/* SEED */
app.get('/api/products/seed', async (req, res) => {
  // await Product.remove({});
  const products = await Product.insertMany(data.products);
  res.send({ products });
});

/* INSERTAR PRODUCTOS */
app.post('/api/products', async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

/* BORRAR UN PRODUCTO */
app.delete('/api/products/:id', async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

/* ///////////////////////////////////////////////////////////////////////////////////////// */
/* ESQUEMA PEDIDOS */
const Order = mongoose.model(
  'order',
  new mongoose.Schema(
    {
      number: { type: Number, default: 0 },
      orderType: String,
      paymentType: String,
      isPaid: { type: Boolean, default: false },
      isReady: { type: Boolean, default: false },
      inProgress: { type: Boolean, default: true },
      isCanceled: { type: Boolean, default: false },
      isDelivered: { type: Boolean, default: false },
      totalPrice: Number,
      taxPrice: Number,
      orderItems: [
        {
          name: String,
          price: Number,
          quantity: Number,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);
/* ///////////////////////////////////////////////////////////////////////////////////////// */

/* API INSERTAR PEDIDO */
app.post('/api/orders', async (req, res) => {
  const lastOrder = await Order.find().sort({ number: -1 }).limit(1);
  const lastNumber = lastOrder.length === 0 ? 0 : lastOrder[0].number;
  if (
    !req.body.orderType ||
    !req.body.paymentType ||
    !req.body.orderItems ||
    req.body.orderItems.length === 0
  ) {
    return res.send({ message: 'Data is required.' });
  }
  const order = await Order({ ...req.body, number: lastNumber + 1 }).save();
  res.send(order);
});


/* API OBTENER PEDIDOS */
app.get('/api/orders', async (req, res) => {
  const orders = await Order.find({ isDelivered: false, isCanceled: false });
  res.send(orders);
});

/* API EDITAR UN PEDIDO */
app.put('/api/orders/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    if (req.body.action === 'ready') {
      order.isReady = true;
      order.inProgress = false;
    } else if (req.body.action === 'deliver') {
      order.isDelivered = true;
    } else if (req.body.action === 'cancel') {
      order.isCanceled = true;
    }
    await order.save();
    res.send({ message: 'Done' });
  } else {
    req.status(404).message('Order not found');
  }
});


/* API OBTENER LOS PEDIDOS */
app.get('/api/orders/queue', async (req, res) => {
  const inProgressOrders = await Order.find(
    { inProgress: true, isCanceled: false },
    'number'
  );
  const servingOrders = await Order.find(
    { isReady: true, isDelivered: false },
    'number'
  );
  res.send({ inProgressOrders, servingOrders });
});

/* API ELIMINAR UN PEDIDO */
app.delete('/api/orders/:id', async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  res.send(order);
});
app.use(express.static(path.join(__dirname, '/build')));


/* RESPUESTA GENERAL  */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`serve at http://localhost:${port}`));
