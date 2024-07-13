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

app.post("/webhook",(req,res)=>{
  let body_param=req.body;
  console.log(JSON.stringify(body_param,null,2));

  if(body_param.object){
      console.log("inside body param");
      if(body_param.entry && 
          body_param.entry[0].changes && 
          body_param.entry[0].changes[0].value.messages && 
          body_param.entry[0].changes[0].value.messages[0]  
          ){
             let phon_no_id=body_param.entry[0].changes[0].value.metadata.phone_number_id;
             let from = body_param.entry[0].changes[0].value.messages[0].from; 
             let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;

             console.log("phone number "+phon_no_id);
             console.log("from "+from);
             console.log("boady param "+msg_body);

             res.sendStatus(200);
          }else{
              res.sendStatus(404);
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
