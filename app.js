const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const errorController = require('./controllers/error')

// for testing purpose (database)
const db = require('./util/database')

const app = express()

// set view engine to ejs
app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

// // for testing purpose (database)
// db.execute('SELECT * FROM products')
//   .then((result) => {
//     console.log(result[0])
//   })
//   .catch((err) => {
//     console.log(err)
//   })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

app.listen(3000, () => {
  console.log(`listening at port 3000`)
})
