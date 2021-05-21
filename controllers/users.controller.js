const { v4: uuidv4 } = require("uuid");
const all_coin = require("../seed/coin.json")
let coins = [all_coin];
let users = [];
let products = [];
let orders = [];
let transfer_Money = [];
let transfer_Buyer = [];
let transfer_Seller = [];
let transfer_Trede = [];
// User

const getUsers = (req, res, next) => {
  res.send(users);
};

const createUser = (req, res) => {
  const user = req.body;
  if (!req.body.price) {
    req.body.price = 0;
  }
  if (!req.body.coin) {
    req.body.coin = 1000;
  }
  const createUser = { id: uuidv4(), ...user };
  users.push(createUser);
  res.send(createUser);
};

const getUser = (req, res) => {
  res.send(req.params.id);
};

const deleteUser = (req, res) => {
  users = users.filter((user) => user.id !== req.params.id);
};

const updateUser = (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.age = req.body.age;
};

//getlistCoin
const listCoin = (req, res) => {
  res.send(coins);
};
const getCoinById_Buyer = (req, res) => {
  const order = orders.find((order) => order.id === req.params.id);
  res.send(order);
};
const getCoinById_Seller = (req, res) => {
  const seller = products.find((seller) => seller.id === req.params.id);
  res.send(seller);
};

// Product
const getProduct = (req, res) => {
  res.send(products);
};

const getSellerUserById = (req, res) => {
  res.send(req.params.id);
};

//OrderBuyer
const getOrder = (req, res) => {
  res.send(orders);
};

const orderBuyerById = (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  const coin = coins.find((coin) => coin.id === req.body.id);
  const price = req.body.price;
  const pricePerCoin = req.body.pricepercoin;

  const order = {
    id: uuidv4(),
    coin: {
      id: coin.id,
      name: coin.name,
      price: price,
      pricePerCoin: pricePerCoin,
    },
    user: { id: user.id, name: user.firstName },
  };

  orders.push(order);

  res.send(order);
};

//Seller
const postSellerUsers = (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  const coin_name = req.body.name;
  const coin_counts = req.body.count;
  const pricePerCoin = req.body.pricePerCoin;
  const remove_coin = Number(user.coin.count) - Number(req.body.count);

  const createProduct = {
    id: uuidv4(),
    coin: {
      id: user.coin.id,
      name: coin_name,
      count: coin_counts,
      pricePerCoin: pricePerCoin,
    },
    user: { id: user.id, name: user.firstName },
  };

  products.push(createProduct);

  user.coin.count = remove_coin;

  transfer_Seller.push({
    id: uuidv4(),
    text: "income",
    count: coin_counts,
    pricePerCoin: pricePerCoin,
  });

  res.send(createProduct);
};

//buyer
const postBuyerById = (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  const product = products.find((product) => product.id === req.body.id);
  const coin = req.body.coin;
  const price = req.body.price;
  const pricePerCoin = req.body.pricePerCoin;
  let count = price / pricePerCoin;
  if (price && !pricePerCoin) {
    res.send("input price && pricePerCoin || coin");
  } else if (!price) {
    res.send("No price");
  }

  if (price > user.price) {
    res.send("No Money");
  }
  if (count > product.coin.count) {
    res.send("sold out");
  } else if (price && pricePerCoin) {
    let coin = price / pricePerCoin;

    user.coin.count = user.coin.count + coin;

    product.coin.count = product.coin.count - coin;
    transfer_Buyer.push({
      id: uuidv4(),
      text: "payment",
      price: price,
    });
    res.send({ success: true });
  } else if (coin && pricePerCoin) {
    let price = coin * pricePerCoin;

    if (user.price < price) {
      res.send("No Money");
    }

    user.coin.count = user.coin.count + coin;
    user.price = user.price - price;
    product.coin.count = product.coin.count - coin;

    transfer_Buyer.push({
      id: uuidv4(),
      text: "payment",
      price: price,
    });

    res.send({ success: true });
  }
  res.send(users.find((user) => user.id === req.params.id));
};

//transfer
const getListTransferMoney = (req, res) => {
  res.send(transfer_Money);
};
const getListTransferBuyer = (req, res) => {
  res.send(transfer_Buyer);
};
const getListTransferSeller = (req, res) => {
  res.send(transfer_Seller);
};
const getListTransferTrade = (req, res) => {
  res.send(transfer_Trede);
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  getProduct,
  getSellerUserById,
  getOrder,
  orderBuyerById,
  postSellerUsers,
  postBuyerById,
  listCoin,
  getCoinById_Buyer,
  getCoinById_Seller,
  getListTransferMoney,
  getListTransferBuyer,
  getListTransferSeller,
  getListTransferTrade,
};
