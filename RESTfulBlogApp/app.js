var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");


// APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

//MONGOOSE/MODEL/ CONFIG

// title
// image
// body
// created
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);


// Blog.create({
//     title: "Test Blog",
//     image: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80",
//     body: "HELLO THIS IS A BLOG POST!"
// });
//RESTful ROUTES
app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function (req,res) {
    Blog.find({}, function (err,blogs) {
    if(err){
        console.log(err);
    }
    else{
        res.render("index",{blogs : blogs});
    }
    });
});

//NEW ROUTE

app.get("/blogs/new",function(req,res){
   res.render("new");
});

//CREATE ROUTE

app.post("/blogs", function (req,res) {
    //create blog
    console.log(req.body);
    console.log("===========")
    console.log(req.body);
    Blog.create(req.body.blog, function (err,newBlog) {
        if(err){
            res.render("new");
        }
        else {
            //then, redirect to the index
            res.redirect("/blogs");
        }
    });

})

//SHOW ROUTE

app.get("/blogs/:id", function (req,res) {
    Blog.findById(req.params.id, function (err,foundBlog) {
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("show",{blog: foundBlog});
        }
    })
});

//Edit ROute

app.get("/blogs/:id/edit", function (req,res) {
    Blog.findById(req.params.id, function (err,foundBlog) {
    if(err){
        res.redirect("/blogs");
    }
    else{
        res.render("edit",{blog: foundBlog});
    }
    });
})



app.listen(3000,function(){
    console.log("Serving the demo app on port 3000");
});



