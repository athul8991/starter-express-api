const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https =require("https");
const { response } = require("express");
const app = express();
const url ="https://us18.api.mailchimp.com/3.0/lists/f6426ac337";


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");

});
app.post("/",(req,res)=>{
    const firstName=req.body.fname;
    const lastName=req.body.lname;
    const email = req.body.email;

    const data ={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);
    const options ={
        method:"POST",
        auth:"unni:add1bd35b3dac8ed32ec822360e4837a453-us18"
    
    };
    
    const reqst =https.request(url,options,(response)=>{
        response.on("data",(data)=>{
            // console.log(JSON.parse(data));
            // console.log(response.statusCode);
            const stCode=response.statusCode;
            if(stCode===200){
                res.sendFile(__dirname+"/success.html");
            }else{
                res.sendFile(__dirname+"/failure.html")
            }
        });
        
    });
    reqst.write(jsonData);
        reqst.end();
    
});

app.post("/failure",(req,res)=>{
    res.redirect("/");

});


app.listen(process.env.PORT || 3000,()=>{
    console.log("Server started at port : 3000.");
});
// API KEY : 1bd35b3dac8ed32ec822360e4837a453-us18
//  unique id = f6426ac337