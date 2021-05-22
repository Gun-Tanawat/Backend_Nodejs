#RUN Project

1. install - npm i
2. install - npm i --save-dev nodemon
3. install - npx express-generator
4. npm start

#Project tutorial

1. Post user at http://localhost:3000/users/ can copy folder seed\user.json and seed\user1.json
2. Get user at http://localhost:3000/users/ for select user ID
3. Post sell at http://localhost:3000/seller/:id , id-> user for sell and body { "name": "BTC" , "count" : 8 , "pricePerCoin": 2 }
4. get product at http://localhost:3000/products/ watch all product
5. Post buy at http://localhost:3000/buyer/:id, id-> user for buy and body { "id": product_id , "price" : 8 , "pricePerCoin": 2 }
6. get coin at http://localhost:3000/coin watch id and coin
7. Order buy at http://localhost:3000/order/:id , id-> user for buy and { "id" : coin_id , "price" : 20 }
8. get transfer buyer at http://localhost:3000/transfer_Buyer
9. get transfer seller at http://localhost:3000/transfer_Seller
