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
    let blockTable="vNode_ScriptBlocks"
    if(req.query.isarchive) {
        table = "arcnews";
        blockTable="vNode_ScriptArchBlocks"
    }
    let news= await knex(table).where( {id:newsid}).where({Deleted:0}).orderBy("NewsDate","desc")
    if(news.length==0)
        return res.sendStatus(404);
    let n=news[0];
    let blocks=await knex(blockTable).where({NewsId:newsid}).orderBy("Sort")

    let t=await knex("PrintTemplates").orderBy("name");
    let templates=[];
    t.forEach(tt=>{
        templates.push({name:tt.name,value:JSON.stringify({news:tt.news,block:tt.block})})
    })

    res.render("script", {news:n,blocks, templates})
})




