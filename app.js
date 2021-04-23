const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
	res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	// console.log(firstName + " " +lastName+" "+email);
	const data = {
		members: [{
			email_address: email,
			status: "subscribed",
			merge_fields: {
				FNAME: firstName,
				LNAME: lastName
			}
		}
	  ]
	};
	const jsonData = JSON.stringify(data);

	const url = "https://us1.api.mailchimp.com/3.0/lists/a7bd30ac30";

	const options = {
		method: "POST",
		auth: "bonaventure:a169e460737d07b26be58f9ac2ef06213-us1"
	}

	const request = https.request(url, options, function(response){
		///code here
		if(response.statusCode === 200){
				res.sendFile(__dirname + "/success.html");
			}else{
				res.sendFile(__dirname + "/failure.html");			}
		response.on("data", function(data){
			// const userData = JSON.parse(data);
			// if(userData.new_members[0].status == "subscribed"){
			// 	res.send("subscribed");
			// }else{
			// 	res.send("fuck off");
			// }

		})
	})
	request.write(jsonData);
	request.end();
});

app.post("/failure", function(req, res){
	res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
	console.log("app running on port 3000");
})

//API KEY
//169e460737d07b26be58f9ac2ef06213-us1
//169e460737d07b26be58f9ac2ef06213-us1

//AUDIENCE KEY
//a7bd30ac30


