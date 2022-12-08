const data = {
  categories: [
    { name: 'Bebidas', image: "/images/beverages.jpg"},
    { name: 'Snacks', image: '/images/breakfast.jpg'},
    { name: 'Sandwich', image: '/images/burgers.jpg'},
  ],
  products: [
    {
      category: 'Bebidas',
      name: 'Coca-Cola',
      calorie: 120,
      price: 1,
      image: '/images/t-mcdonalds-Coca-Cola-Classic-Small.png',
    },
    {
      category: 'Bebidas',
      name: 'Tampico naranja',
      price: 1.5,
      calorie: 360,
      image: '/images/t-mcdonalds-Vanilla-McCafe-Shake-Medium.jpg',
    },
    {
      category: 'Bebidas',
      name: 'Chocolate',
      price: 2,
      calorie: 170,
      image: '/images/t-mcdonalds-McCafe-Hot-Chocolate-Medium.jpg',
    },
    {
      category: 'Snacks',
      name: 'Sublime',
      price: 1.9,
      calorie: 90,
      image:'/images/sublime.png',
    },
    {
      category: 'Snacks',
      name: 'Kekito con pasas',
      price: 1.5,
      calorie: 120,
      image: '/images/t-blueberry-muffin.jpg',
    },
    {
      category: 'Snacks',
      name: 'Galleta vainilla',
      price: 3,
      calorie: 430,
      image: '/images/s-mcdonalds-Big-Breakfast-Regular-Size-Biscuit.jpg',
    },
    {
      category: 'Sandwich',
      name: 'Firulais doble',
      price: 1.9,
      calorie: 200,
      image: '/images/t-mcdonalds-Big-Mac.jpg',
    },
    {
      category: 'Sandwich',
      name: 'Cuy Burger',
      price: 1.5,
      calorie: 410,
      image: '/images/cuy_burger.png',
    },
    {
      category: 'Sandwich',
      name: 'Atun Cantabrico',
      price: 3,
      calorie: 320,
      image: '/images/cantabrico.png',
    },
  ],
};
/* export default data; */
module.exports = data;