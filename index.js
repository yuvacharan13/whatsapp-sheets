const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const mytoken=process.env.MYTOKEN;

//to verify the callback url from dashboard side - cloud api side
app.get("/webhook",(req,res)=>{
  console.log("webhook")
  const mode=req.query["hub.mode"];
  const challange=req.query["hub.challenge"];
  const token=req.query["hub.verify_token"];

   if(mode && token){
       if(mode==="subscribe" && token===mytoken){
           res.status(200).send(challange);
       }else{
           res.status(403);
       }
   }

});

app.get("/yuva", (req, res) => {
  console.log("hey yuva")
  res.send("hey yuva path");
});

app.get("/", (req, res) => {
  res.send("hey yuva home page");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
