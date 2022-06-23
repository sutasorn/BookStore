const Books = require('../models/books')
const Cart = require('../models/cart')
exports.getIndex =  (req, res, next) => { 
    try {
       const books =  Books.fetcgAll()
       const amountCart = Cart.getAmountCart()
         res.render('index',{
            books: books,
             path:'/',
             amountCart:amountCart
         });
    } catch (err) {
          res.status(404).render("404",{title:'Page Not Found',path:'/404'});
    }
    
}

exports.postCart = (req, res, next) => {
    const bookId = req.body.bookId;
    const book = Books.findById(bookId)
    const upDateCart = Cart.addProduct(bookId, book.price);
    res.redirect('/');
}

