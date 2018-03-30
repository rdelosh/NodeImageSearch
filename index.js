var express = require('express')
var app = express()
var path = require('path')


app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'ejs')
app.use(require('./routes/mainroutes'))


app.listen(process.env.PORT || 5000)