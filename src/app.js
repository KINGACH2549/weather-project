const express=require('express')
const path=require('path')
const hbs=require('hbs')
const app=express()

const forecast = require('./utils/forecast')
const geocode=require('./utils/geocode')

const port = process.env.PORT || 3000
const publicDirectory=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')  // Instead of views we can also use any other name of the folder
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewPath)

app.use(express.static(publicDirectory)) //Serving static contents


hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather-app',
        name:'Achintya'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Achintya Mishra'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        link:'https://www.linkedin.com/in/achintya-mishra-760604155/'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('help_error',{
        title:'Help Section Not found please check the URL!'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please Provide the address!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude}={})=>{  //es6 way of defining empty object when the response will be undefined during an error.
        if(error){
            res.send({
                error:error
            })
        }
        else{
            // console.log('Co-ordinates are: ',data)
            forecast(latitude,longitude,(error,data)=>{
                if(error){
                    res.send({
                        error:error
                    })
            
                }
                else{
                    res.send({
                        forecast:data
                    })
                }
            })
        }
    })
     
})

app.get('*',(req,res)=>{
    res.render('404_page',{
        title:'404 ERROR :('
    })
})
app.listen(port,()=>{
    console.log('Server started at port'+port)
})