const Product = require('../models/product')

const getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  })
}

const postAddProduct = (req, res, next) => {
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const price = req.body.price
  const description = req.body.description
  // // One Way
  // Product.create({
  //   title: title,
  //   price: price,
  //   imageUrl: imageUrl,
  //   description: description,
  //   userId : req.user.id
  // })
  //   .then((result) => {
  //     // console.log(result);
  //     console.log('Created Product')
  //     res.redirect('/admin/products')
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // // Another Way (Magic Association Method)
  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
  .then((result) => {
      // console.log(result);
      console.log('Created Product')
      res.redirect('/admin/products')
    })
    .catch((err) => {
      console.log(err)
    })
}

const getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId
// One Way of finding specific Product (thg Magic-Association-Method)
  req.user
    .getProducts({ where: { id: prodId } })
    .then((products) => {
      const product = products[0];
      if (!product) {
        return res.redirect('/')
      }
      console.log(product)
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
      })
    })

//  // Another Way of finding specific Product
  // Product.findByPk(prodId)
  // .then((product) => {
  //     if (!product) {
  //       return res.redirect('/')
  //     }
  //     console.log(product)
  //     res.render('admin/edit-product', {
  //       pageTitle: 'Edit Product',
  //       path: '/admin/edit-product',
  //       editing: editMode,
  //       product: product,
  //     })
  //   })
    .catch((err) => console.log(err))
}

const postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedPrice = req.body.price
  const updatedImageUrl = req.body.imageUrl
  const updatedDesc = req.body.description
  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

const getProducts = (req, res, next) => {
  // // One Way
  // Product.findAll()
  //   .then((products) => {
  //     res.render('admin/products', {
  //       prods: products,
  //       pageTitle: 'Admin Products',
  //       path: '/admin/products',
  //     })
  //   })
  // Another Way
  req.user
    .getProducts()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch((err) => console.log(err))
}

const postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.findByPk(prodId).then(product=>{
    return product.destroy()
  })
  .then(result =>{
    console.log('DESTROYED PRODUCT SUCCESSFUL')
    res.redirect('/admin/products')
  })
  .catch(err => console.log(err))
}

module.exports= {getAddProduct,
postAddProduct,
getEditProduct,
postEditProduct,
getProducts,
postDeleteProduct}