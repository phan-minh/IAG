const { v4: uuidv4 } = require('uuid');
const fakeData = {
    "product": [
        { "id": uuidv4(), "name": "Cookies", "price": 2.99 },
        { "id": uuidv4(), "name": "Bread", "price": 2.00 },
        { "id": uuidv4(), "name": "Orange Juice", "price": 5.00 }
      ]
}

module.exports = fakeData;