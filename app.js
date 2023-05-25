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
   let r= await knex("Programs").where( {deleted:false}).where("id",">","0")
    res.render('index', { title: 'Hey', message: 'Hello there!', prog:r })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
app.get('/news/:id', async (req, res) => {
    let r= await knex("vNode_News").where( {programId:req.params.id})
    let a= await knex("vNode_ArchNews").where( {programId:req.params.id})
    a.forEach(aa=>{a.isArchive=treu;})
    r.push(...a)
    res.render("news", {news:r})
})


