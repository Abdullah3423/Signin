const express=require("express")
const app=express();
const bodyparser=require("body-parser")
const request=require("request")
const https=require("https")

app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended:true}))
const mailchimp = require("@mailchimp/mailchimp_marketing")




mailchimp.setConfig({
//API KEY
 apiKey: "8b79df4527d1b5e9a1096d823aa5dc81-us21",
//API KEY PREFIX (THE SERVER)
  server: "us21"
})

app.get("/",function (req,res) {
  res.sendFile(__dirname+"/signup.html")

})

app.post("/",function (req,res) {
  const firstName=req.body.fName
    const lastName=req.body.lName
  const password=req.body.Password
  const email=req.body.email

  const data={
    members:[{
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstName,
        LNAME:lastName
      }
    }

    ]
  }
const jsonData=JSON.stringify(data)
const url="https://us21.api.mailchimp.com/3.0/lists/2dd62938ab"
const options={
   method:"POST",
  auth:"Abdullah:8b79df4527d1b5e9a1096d823aa5dc81-us21"
}

const request=https.request(url,options,function (response) {
if(response.statusCode===200){
  res.sendFile(__dirname+"/success.html")
}else{
  res.sendFile(__dirname+"/failure.html")
}
  response.on("data",function (data) {
    console.log(JSON.parse(data))

  })

})
request.write(jsonData)
request.end()
})
app.post("/failure", function (req,res) {
  res.redirect("/")

})



app.listen(3000,function () {
  console.log("done")

})
// 8b79df4527d1b5e9a1096d823aa5dc81-us21
// list // IDEA:
//  2dd62938ab.
