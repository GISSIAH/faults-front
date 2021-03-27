const Express = require('express')
const bodyParser = require('body-parser')
const ejs=require('ejs')
const app = Express()
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',require('./routes/index'))


app.set('view engine','ejs')

app.listen(3000,()=>{
    console.log('server listening on port 3000');
})