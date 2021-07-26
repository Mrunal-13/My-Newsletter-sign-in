const bodyparser=require("body-parser");
const express = require("express");

const https=require("https");
const request=require("request");

const app=express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res){
      res.sendFile(__dirname+"/signup.html")
});

app.post("/",function(req,res){

    const FirstName=req.body.fname;
    const LastName=req.body.lname;
    const email=req.body.email;
    console.log(FirstName ,LastName ,email);

    const data={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:
                {
                    FNAME: FirstName,
                    LNAME: LastName
                }

            }
            
        ]
    };
    
    var jsondata=JSON.stringify(data);
    const url="https://us6.api.mailchimp.com/3.0/lists/a577dbffa4"
    const options={
        method:"post",
        auth:"mrunal1:d415cdfc746f74d4d41d66cc4b70c7f5-us6"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

    });
    request.write(jsondata);
    request.end();



 });

 app.post("/failure",function(req,res){
     res.redirect("/");

 });





app.listen(process.env.PORT || 3000,function(){
    console.log("page started");
})
//api key
//d415cdfc746f74d4d41d66cc4b70c7f5-us6

//audeince id
//a577dbffa4