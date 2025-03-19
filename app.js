const express = require('express');
const bodyParser = require('body-parser')
const request = require('request')
var https = require ("https")

const app = express()
const port = 3000

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));



app.get('/', (req, res) => {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/" , (req,res)=>{

    const firstName= req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {

        members: [
            {
                email_address:email,
                status: "subscribed",
                merge_fields :{
                    FNAME: firstName,
                    LNAME:lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us11.api.mailchimp.com/3.0/lists/3585bd3ddf";

    const options  = {
        method: "POST",
        auth : "harsh1:c05e935459ef7e60475c35b6faa897c8-us11"

    }

    const request = https.request(url , options,function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();


});


app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${port}`)
})

//Api key 
//c05e935459ef7e60475c35b6faa897c8-us11

//list id
// 3585bd3ddf