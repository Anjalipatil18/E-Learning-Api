const express = require('express');
const app = express();
const fs = require('fs')
var bodyParser = require('body-parser');
app.use(bodyParser.json())

//post data 
app.post('/getExersice/:id',(req,res)=>{
    var exersiceId = req.params.exersiceId-1;
    var New={
        courseId:req.body.courseId,
        name:req.body.name,
        description:req.body.description,
        hint:req.body.hint,
        content:req.body.content
        }
    let data = fs.readFileSync('exersices.json')
    data = data.toString();
    let Data = JSON.parse(data)
    New.exersiceId = Data.length + 1;
    Data.push(New)
    fs.writeFileSync("exersices.json", JSON.stringify(Data,null,2))
    return res.json(Data)
})
app.listen(5000, () => console.log('server is listening 5000....'));
