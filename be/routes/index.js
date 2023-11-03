var express = require("express");
var router = express.Router();
const fakeData = require("../fakeAPI/");
const { v4: uuidv4 } = require("uuid");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({
    message: "List of product",
    data: fakeData,
  });
});

router.post("/create", (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res
      .status(400)
      .json({ error: "Name and price are required for the new product." });
  }
  const newProduct = {
    id: uuidv4(),
    name,
    price,
  };
  fakeData.product.push(newProduct);
  res.status(201).json(newProduct);
});

router.post("/orders", (req, res, next) => {
  const orderRequest = req.body;

  if (
    !Array.isArray(orderRequest.lineItems) ||
    orderRequest.lineItems.length === 0
  ) {
    return res.status(400).json({ error: "An order must contain line items." });
  }

  const totalCost = orderRequest.lineItems.reduce((total, item) => {
    const product = fakeData.product.find((p) => p.id === item.product.id);
    if (!product) {
      return res.status(400).json({ error: "Product not found." });
    }
    return total + product.price * item.quantity;
  }, 0);

  const orderResponse = {
    ...orderRequest,
    totalCost,
  };

  res.status(201).json(orderResponse);
});

module.exports = router;
