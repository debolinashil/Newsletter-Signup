const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req,res)=>{
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.mailId;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };

    const JSONData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0//lists/76b1159b6d";
    const options = {
        method: "POST",
        auth: "debolina:b9ceb6d63a38bf0363efa85f081c58ef-us21"
    };

    const request = https.request(url, options, (response)=>{
        response.on("data", (data)=>{
            console.log(JSON.parse(data));
        });
        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
    });

    request.write(JSONData);
    request.end();
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log("server is running on port 3000.");
})

//API KEY
// b9ceb6d63a38bf0363efa85f081c58ef-us21

//list ID - 76b1159b6d