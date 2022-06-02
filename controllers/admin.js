const Product = require('../models/product')

getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  })
}

postAddProduct = (req, res, next) => {
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const price = req.body.price
  const description = req.body.description
  Product.create({
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

getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId
  console.log(prodId)
  Product.findByPk(prodId)
  .then((product) => {
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
    .catch((err) => console.log(err))
}

postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedPrice = req.body.price
  const updatedImageUrl = req.body.imageUrl
  const updatedDesc = req.body.description
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  )
  updatedProduct.save()
  res.redirect('/admin/products')
}

getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      })
    })
    .catch((err) => console.log(err))
}

postDeleteProduct = (req, res, next) => {
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