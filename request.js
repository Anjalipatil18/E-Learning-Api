const express = require('express');
const app = express();
const fs = require('fs')
var bodyParser = require('body-parser');
app.use(bodyParser.json())

app.post('/post',(req,res)=>{
    var id = req.params.id-1;
    var New={
        name:req.body.name,
        description:req.body.description
        }
    let data = fs.readFileSync('request.json')
    data = data.toString();
    let Data = JSON.parse(data)
    New.id = Data.length + 1;
    Data.push(New)
    fs.writeFileSync("request.json", JSON.stringify(Data,null,2))
    return res.json(Data)
})
//show data by name
app.get("/post/:name",(req,res)=>{
    var id = req.params.name
    let data = fs.readFileSync('request.json')
    let Data = JSON.parse(data)
    for (var i in Data ){
        if (Data[i]["name"]==id){
            return res.end(JSON.stringify(Data[i]))
        }
    }
//show data by id
    // let data = fs.readFileSync('request.json')
    // let Data = JSON.parse(data)
    // var id = Data[req.params.id-1];
    // return res.end(JSON.stringify(id))
})

app.listen(4500, () => console.log('server is listening'));

