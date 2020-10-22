const express = require('express')
const request = require('request')
const path = require('path')
const { query } = require('express')
const app = express()

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.static('public'))

app.get('/search',(req,res)=>{
    res.render('search')
})
//https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher

app.get('/results',(req,res)=>{
    let query = req.query.search
    request('https://api.themoviedb.org/3/search/movie?api_key=a5ef4e6909e12793c21f642fc10195ba&query='+query,(error,response,body)=>{
        if(error){
            return console.log(error);
        }
        let data = JSON.parse(body)
        res.render('movies',{data , query})
    })
})


app.listen('3000',()=>{
    console.log("Server is starting at port 3000");
})