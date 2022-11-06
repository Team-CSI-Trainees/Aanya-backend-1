const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");
const homestartingcontent = "Hlo everyone.....This is my blog website. You all can add your views about any particular topic here.";
const aboutcontent = "We are here to enable people across world to exchange their ideas, thoughts, news and information. People across world can feel connected with the help of this. ";
const contactcontent = "We are here to serve you all. You can access us 24X7.";
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://AanyaMittal:aanya5528@cluster0.jd0gxrs.mongodb.net/BlogDB",{useNewUrlParser: true});
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});
const Post = mongoose.model("Post", postSchema);
app.get("/", function(req, res){
    Post.find({}, function(err,posts){
        res.render("home",{
            start: homestartingcontent,
            posts: posts
        });
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
    const post = new Post({
        title: req.body.title,
        content: req.body.desc
    });
    post.save();
    res.redirect("/");
});
app.get("/posts/:postID", function(req,res){
    const reqpostID = req.params.postID;
    Post.findOne({_id: reqpostID}, function(err,post){
        res.render("post",{
            title:post.title,
            content:post.content
        });
    });
});

app.listen(port, function(){
    console.log("Server started on port 3000");
});