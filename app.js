
var bodyParser  = require("body-parser"),
mongoose        = require("mongoose"),
express         = require("express"),
http            = require("http"),
app             = express();

//LOCAL HOST TESTING
// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });

//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

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

app.get("/blogs", function (req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR!");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

app.listen(port, hostname, function() {
    console.log("SERVER IS RUNNING!");
})
