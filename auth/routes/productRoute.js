


module.exports = function (app) {

    var products = require('../controllers/product.controller.js')

    app.get('/api/products', products.findAll);

    app.get('/api/products/:id', products.findById);

    app.post('/api/products', products.addProduct);

    app.put('/api/products/:id', products.updateById);

    app.delete('/api/products/:id', products.removeById);

}