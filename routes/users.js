const express = require("express"); //import express

const router = express.Router();

const userController = require("../controllers/users.controller");

//User
router.get("/users", userController.getUsers);
router.post("/users", userController.createUser);
router.get("/users/:id", userController.getUser);
router.delete("/users/:id", userController.deleteUser);
router.put("/users/:id", userController.updateUser);

//list_coin
router.get("/coin", userController.listCoin)
router.get("/coin/buyer/:id", userController.getCoinById_Buyer) // id_coin
router.get("/coin/seller/:id", userController.getCoinById_Seller) // id_coin

//Product
router.get("/products", userController.getProduct);
router.get("/products/:id", userController.getSellerUserById);// id_product

//OrderBuyer
router.get("/order", userController.getOrder);
router.post("/order/:id" ,userController.orderBuyerById) // id_coin

//Seller
router.post("/seller/:id", userController.postSellerUsers);// id_user_seller

//Buyer
router.post('/buyer/:id', userController.postBuyerById) // id_user_buyer

//transfer
router.get('/transfer_Buyer',userController.getListTransferBuyer)
router.get('/transfer_Seller',userController.getListTransferSeller)

module.exports = router; // export to use in server.js
