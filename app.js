const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homestartingcontent = "Hlo Everyone.....This is my blog website. You all can add your views about any particular topic here.";
const aboutcontent = "We are here to enable people across world to exchange their ideas, thoughts, news and information. People across world can feel connected with the help of this. ";
const contactcontent = "We are here to serve you all. You can access us 24X7.";
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const arr = [];
app.get("/", function(req, res){
    res.render("home", {
        start: homestartingcontent,
        arr: arr
    });
});
app.get("/about", function(req, res){
    res.render("about", {about: aboutcontent});
});
app.get("/contact", function(req, res){
    res.render("contact", {contact: contactcontent});
});
app.get("/compose", function(req, res){
    res.render("compose");
});
app.post("/compose", function(req, res){
    const add = {
        title: req.body.title,
        descr: req.body.desc
    };
    arr.push(add);
    res.redirect("/");
});
app.get("/arr/:arrname", function(req,res){
    const reqtitle = req.params.arrname;
    arr.forEach(function(item){
        const storedtitle = item.title;
        if (storedtitle === reqtitle){
            console.log("match found");
            console.log(item.title);
            console.log(item.descr);
            res.render("post",{
                head: item.title,
                para: item.descr
            });
        }
    });
});


app.listen(3000, function(){
    console.log("Server started on port 3000");
});