const path = require('path')
const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const handlebarsHelpers = require('./helpers/handlebars-helper')
const routes = require('./routes')
require('./config/mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const PORT = process.env.PORT

app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))

app.use(routes)

app.listen(PORT, () => {
  console.log(`app is listening on https://localhost:${PORT}/`)
})
