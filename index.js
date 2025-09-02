const express = require('express')
const app = express()
const cors = require("cors");
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
require('dotenv').config()

// middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173',"https://tree-frontend-lake.vercel.app"],
    credentials: true
}))

//route
const treeRoutes = require('./src/trees/tree.route');
const orderRoutes= require('./src/orders/order.route');
const userRoutes =  require("./src/users/user.route");
const adminRoutes=require("./src/stats/admin.stats");

app.use("/api/trees", treeRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)




app.get('/', (req, res) => {
    res.send('Xin chao')
    });

async function main() {
  await mongoose.connect(process.env.DB_URL);
  
}

main().then(() => console.log("Mongodb connect successfully!")).catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
