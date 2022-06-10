const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    const jsonString = fs.readFileSync(p)
    let cart = JSON.parse(jsonString)
    const existingProductIndex = cart.products.findIndex(
      prod => prod.id == id
    );
    const existingProduct = cart.products[existingProductIndex];
    console.log(existingProduct,"existingProduct")
    let updatedProduct;
    // Add new product/ increase quantity
    if (existingProduct) {
      updatedProduct = { ...existingProduct };
      updatedProduct.qty = updatedProduct.qty + 1;
      cart.products = [...cart.products];
      cart.products[existingProductIndex] = updatedProduct;
    } else {
      updatedProduct = { id: id, qty: 1 };
      cart.products = [...cart.products, updatedProduct];
    }
    cart.totalPrice = cart.totalPrice + +productPrice;
    fs.writeFile(p, JSON.stringify(cart), err => {
      console.log(err);
    });
    
  }


  static deleteProduct(id, productPrice) {
    const productId = id[0]
    const productPriceT = id[1]
    const jsonString = fs.readFileSync(p)
    let cart = JSON.parse(jsonString)
    let updatedCart = {...cart}
    const product = updatedCart.products.find(prod => prod.id == productId)
    const productQty = product.qty
    updatedCart.products = updatedCart.products.filter(prod => prod.id != productId)
    updatedCart.totalPrice = updatedCart.totalPrice - productPriceT * productQty;
     fs.writeFile(p, JSON.stringify(updatedCart), err => {
       console.log(err);
     });
  }

  static getCart() {
    const jsonString = fs.readFileSync(p)
    const carts = JSON.parse(jsonString)
    return carts
  }
  
  static getAmountCart() {
    let amountCart = 0
    const jsonString = fs.readFileSync(p)
    const carts = JSON.parse(jsonString)
    for (let i = 0; i < carts.products.length; i++) {
      amountCart += carts.products[i].qty
    }
    return amountCart
  }

  static calculatePromotion (Cntbook) {
    let declease = 0
    if (Cntbook == 1 || Cntbook == 0) {
      return declease
    } else if (Cntbook == 2) {
      declease = 0.1
      return  declease
    } else if (Cntbook == 3) {
      declease = 0.2
      return declease
    } else if (Cntbook == 4) {
      declease = 0.3
      return declease
    } else if (Cntbook == 5) {
      declease = 0.4
      return declease
    } else if (Cntbook == 6) {
      declease = 0.5
      return declease
    } else if (Cntbook == 7) {
      declease = 0.6
      return declease
    }
  }
};
