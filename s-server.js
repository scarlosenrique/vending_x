const path = require('path');
const express = require('express');
const data = require('./data');

const app = express();

/* API GET CATEGORIAS */
app.get('/api/categories', (req, res) => res.send(data.categories));

/* API GET PRODUCTOS */
app.get('/api/products', (req, res) => {
  const { category } = req.query;
  res.send(
    category
      ? data.products.filter((x) => x.category === category)
      : data.products
  );
});

app.use(express.static(path.join(__dirname, '/build')));

/* CUALQUIERA */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(process.env.PORT || 5000, () => {
  console.log('El Servidor esta Funcionando :');
});
