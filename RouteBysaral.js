const express = require('express');
const app = express();
const fs = require('fs')
var bodyParser = require('body-parser');
app.use(bodyParser.json())

//post data 
app.post('/post',(req,res)=>{
    var id = req.params.id;
    var New={
        name:req.body.name,
        description:req.body.description
        }
    let data = fs.readFileSync('courses.json')
    data = data.toString();
    let Data = JSON.parse(data)
    New.id = Data.length + 1;
    Data.push(New)
    fs.writeFileSync("courses.json", JSON.stringify(Data,null,2))
    return res.json(Data)
})

//show data by name
app.get("/get/:name",(req,res)=>{
    var id = req.params.name
    let data = fs.readFileSync('courses.json')
    let Data = JSON.parse(data)
    for (var i in Data ){
        if (Data[i]["name"]==id){
            return res.end(JSON.stringify(Data[i]))
        }
    }
}) 
//put(update) data by id
app.put("/put/:id",(req,res)=>{
    var id = req.params.id;

    var jsondata = fs.readFileSync('courses.json')
    var data = JSON.parse(jsondata);
    
    data[id]["name"] = req.body.name;
    data[id]["description"] = req.body.description;
    fs.writeFileSync("courses.json", JSON.stringify(data,null,2));
    return res.json(data)
});

app.post('/getExersice',(req,res)=>{
    let exersiceId = req.params.exersiceId;
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

//get Exrsice
app.get("/getExersice",(req,res)=>{
    fs.readFile('exersices.json',"utf8",function(err,data){
        console.log(data)
        return res.end(data)
    })   
})

//get exercise by courseId
app.get("/getExersice/:courseId",(req,res)=>{
    let mainExcersice=[]
    var courseId = req.params.courseId;
    let data = fs.readFileSync('exersices.json')
    let Data = JSON.parse(data)
    for (var i in Data ){
        if (Data[i]["courseId"]==courseId){
            mainExcersice.push((Data[i]))
        }
    }res.json(mainExcersice)
})

//get the data by courseId of base get exersiceId
app.get("/getExersice/:courseId/:exersiceId",(req,res)=>{
    let courseId=req.params.courseId;
    let data = fs.readFileSync("exersices.json")
    let Data = JSON.parse(data)
    console.log(Data)
    for (var i in Data){
        if (Data[i]["courseId"]==courseId){
            let exersiceId=req.params.exersiceId;
            for(var j in Data){
                if (Data[j]["exersiceId"]==exersiceId && Data[j]["courseId"]==courseId){
                    res.end(JSON.stringify(Data[j]))
                }
            }
        }
    }
    res.end("Data is not found")
})

//update Exersice(put)
app.put("/put/courseId/:courseId/exerciseId/:exersiceId",(req,res)=>{
    let courseId=req.params.courseId;
    let data = fs.readFileSync("exersices.json")
    let Data = JSON.parse(data)
    console.log(Data)
    for (var i in Data){
        if (Data[i]["courseId"]==courseId){
            let exersiceId=req.params.exersiceId;
            for(var j in Data){
                if (Data[j]["exersiceId"]==exersiceId && Data[j]["courseId"]==courseId){
                    Data[exersiceId]["name"] = req.body.name;
                    Data[exersiceId]["description"] = req.body.description;
                    Data[exersiceId]["content"]=req.body.content;
                    Data[exersiceId]["hint"]=req.body.hint;
                    fs.writeFileSync("exercise.json", JSON.stringify(Data,null,2));

                    res.send(Data)
                }
            }
        }
    }
    res.end("Data is not found")
})

//post Submission
app.post('/submissionPost/courseId/:courseId/exerciseId/:exersiceId',(req,res)=>{
    let courseId = req.params.courseId;
    let exersiceId = req.params.exersiceId;
    var submissionExersice={
        codeUrl:req.body.codeUrl,
        userName:req.body.userName
        }
    let data = fs.readFileSync('submission.json')
    data = data.toString();
    let Data = JSON.parse(data)
    submissionExersice.submissionId = Data.length + 1;
    submissionExersice["courseId"]=parseInt(courseId)
    submissionExersice["exerciseId"]=parseInt(exersiceId)
    Data.push(submissionExersice)
    fs.writeFileSync("submission.json", JSON.stringify(Data,null,2))
    return res.json(Data)
})

//get Submission
app.get("/getSubmission",(req,res)=>{
    fs.readFile('submission.json',"utf8",function(err,data){
        return res.end(data)
    })   
})

app.listen(4500, () => console.log('server is listening 4500....'));

