const express = require('express')
const path = require("path")
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast =  require('./utils/forecast')


const app = express() 
//Define paths for express config
const publicdirectoryPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location 
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialpath)

//Setup static directory to serve
app.use(express.static(publicdirectoryPath))

// app.get("",(req,res)=> {
//     res.send("Hello Express!!")
// })



app.get("",(req,res) => {
    res.render('index',{
        title:"Weather App",
        name: "Nikhil Singh"
    })
})

app.get("/about",(req,res) => {
    res.render('about',{
        title: "About Us",
        name: "Nikhil Singh"

    })
})

app.get('/products',(req,res) => {
    if(!req.query.search) {
        return res.send({
            error: "you must provide a search term"
        })
    }

    res.send({
        products:[]
    })
})
app.get("/help",(req,res) => {
    res.render('help',{
        title: "Help",
        message: "We are Here to Help You!!",
        name: "Nikhil Singh"
    })
})

app.get("/weatherapp",(req,res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address."
        })
}
address = req.query.address
geocode(address,(error,{longitude,latitude,location} = {}) => {
    if(error){
        return res.send({error})
    }
    forecast(longitude,latitude,(error,forecastdata) => {
        if(error) {
            return res.send({error})
        }

        res.send({ 
            location:location,
            forecastdata:forecastdata,
            address: req.query.address
        })
    })
})
    
    
})

app.get('/help/*',(req,res) => {
   res.render('error',{
       title: '404',
       name: "Nikhil Singh",
       errormessage: "Help Article Not Found!",
   })
})

app.get('*',(req,res) => {
   res.render('error',{
       title: '404',
       name: "Nikhil Singh",
       errormessage:"Page Not Found!!"
   })
})


app.listen(3000,()=>{
    console.log("Server is up on port 3000")
})




