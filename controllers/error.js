exports.error404 = (req, res, next) => {
    console.log("=================")
    console.log("=================")
    console.log("=================")
    console.log("=================")
    console.log("=================")
    console.log("=================")
    res.status(404).render("404",{title:'Page Not Found',path:'/404',amountCart:0});
}