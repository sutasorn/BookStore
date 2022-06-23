const products = [];
const fs =  require('fs');
const path =require('path');
const Cart = require('./cart')

const p =path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'books.json')

const getProductFormFile = () => {
    console.log("xxxxxxxxxxxx")
    const jsonString = fs.readFileSync(p)
    console.log("xxxxxxxxxxxx2")
    const books = JSON.parse(jsonString)
    return books
}

module.exports = class Product {
    constructor (id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
    }

    save () {
        //products.push(this);
        getProductFormFile( products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updateProducts = [...products]
                updateProducts[existingProductIndex] = this
                fs.writeFile(p, JSON.stringify(updateProducts),(err) => {
                    console.log(err)
                })
            } else {
                this.id = Math.random().toString();
                products.push(this)
                fs.writeFile(p, JSON.stringify(products),(err) => {
                    console.log(err)
                })
            }
            
        })
    }

    static fetcgAll (cb) {
       return getProductFormFile()
     
    } 

    static findById (id) {
       const books = getProductFormFile()
       const bookById = books.find(p => p.id == id)
       return bookById
    }

    static deleteById (id) {
        getProductFormFile(products => {
            const product = products.find(prod => prod.id === id )
            const updateProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updateProducts), err => {
                if (!err) {
                    Cart.deleteProduct(id,product.price)
                }
            })
        })
    }

}
