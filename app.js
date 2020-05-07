
var bodyParser  = require("body-parser"),
methodOverride  = require("method-override"),
mongoose        = require("mongoose"),
express         = require("express"),
http            = require("http"),
app             = express();

//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//HOSTNAME 
const port = 3000;
const hostname = '127.0.0.1';

//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES 

app.get("/", function name(req, res) {
    res.redirect("/blogs");
});
// INDEX ROUTE 
app.get("/blogs", function (req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR!");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

// NEW ROUTE 
app.get("/blogs/new", function(req, res) {
    res.render("new");
});
// CREATE ROUTE 
app.post("/blogs", function(req, res){
    //create blog 
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            //then, redirect to the index
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE 
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

// UPDATE ROUTE 
app.put("/blogs/:id", function(req, res){
    Blog.findOneAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            console.log("error");
            res.redirect("/blogs/");
        } else {
            console.log("success");
            res.redirect("/blogs/5ea7a06a642c117b4c96dcb5"); 
        }
    });
});

app.listen(port, hostname, function() {
    console.log("SERVER IS RUNNING!");
})
