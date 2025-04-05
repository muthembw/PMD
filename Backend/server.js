const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config(); 
const PORT = process.env.PORT || 8000;

connectDB(); // ✅ Connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/orders", require('./routes/orderRoute'));
app.use("/api/user", require("./routes/authUserRoute"));
app.use("/api/payment", require("./routes/paymentRoute"));
app.use("/api/products", require("./routes/productRoute"));

app.get("/", (req, res) => {
    res.send("Welcome to the Product Management Dashboard!");
  });
  
// Start Server
app.listen(PORT, () =>
  console.log(`✅ Server running via http://localhost:${PORT}`)
);
