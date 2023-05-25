const express = require('express')
const path=require('path')
const app = express()
const port = 3000
var knex = require('knex')({
    client: 'mssql',
    connection: {
        server : 'localhost',
        user : 'NewsFactoryUser',
        password : 'ib',
        database : 'NewsFactory'
    }
});


app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug')

app.get('/', async (req, res) => {
   let r= knex("Programs").where( {deleted:false}).where("id",">","0")
    res.render('index', { title: 'Hey', message: 'Hello there!', prog:r })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


