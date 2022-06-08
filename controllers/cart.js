const Books = require('../models/books')
const Cart = require('../models/cart')
exports.getIndex = async (req, res, next) => { 
    try {

        let booksInCartsDetail = []
        const carts = await Cart.getCart()
        const amountCart = await Cart.getAmountCart()
        const cntBook = carts.products.length
        const totlaPrice = carts.totalPrice
        const discount = await Cart.calculatePromotion(cntBook)
        for (let i = 0; i < cntBook; i++) {
            let book = Books.findById(carts.products[i].id)
            book.qty = carts.products[i].qty
            booksInCartsDetail.push(book)
        }
        res.render('cart/cart',{
            carts: booksInCartsDetail,
            path:'/cart',
            totlaPrice:totlaPrice,
            discount:discount,
            amountCart:amountCart
        });    
     
    } catch (err) {
          res.status(404).render("404",{title:'Page Not Found',path:'/404'});
    }
    
}


exports.postDeleteProductInCart = async (req, res, next) => {
    const bookId = req.body.bookId
    const bookPrice = req.body.bookPrice
    const del = await Cart.deleteProduct(bookId, bookPrice)
    res.redirect('/cart')
    
}