const express = require('express')
const path=require('path')
const app = express()
const moment=require("moment")
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
    a.forEach(aa=>{aa.isArchive=true})

    r.push(...a)
    r.forEach(rr=>{rr.dt=moment(rr.NewsDate).format("DD.MM.YYYY"); rr.unix=moment(rr.NewsDate).unix()})
    r.sort((a,b)=>{return b.unix-a.unix});
    res.render("news", {news:r})
})
app.get('/blocks/:id', async (req, res) => {
    let r= await knex("vNode_blocks").where( {NewsId:req.params.id}).orderBy("sort")
    res.render("blocks", {blocks:r})
})

app.get('/archblocks/:id', async (req, res) => {
    let r= await knex("vNode_archblocks").where( {NewsId:req.params.id}).orderBy("sort")
    res.render("blocks", {blocks:r})
})
app.get('/BlockScript', async (req, res) => {
    let newsid=req.query.newsid;
    let table="news";
    let blockTable="blocks"
    if(req.query.isarchive) {
        table = "arcnews";
        blockTable="archblocks"
    }
    let news= await knex(table).where( {NewsId:newsid}).where({Deleted:0}).orderBy("newsdate","desc")
    res.json(news)
    //res.render("blocks", {blocks:r})
})




