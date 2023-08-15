const express = require('express')
const fs = require("fs");
const app = express();
 

app.use(express.json());

//create a new post 
app.post('/blogs', (req, res) => {
  const {title, content} = req.body;
  if(!title || !content) {
    res.status(400).json({Error: "Either title or content are missing"});
  }
  fs.writeFileSync(title, content);
  res.end('ok')
})

// update a post 
app.put('/blogs/:title', (req, res) => {
  const title = req.params.title;
  const content = req.body.content;
  if(!content) {
    res.status(400).json({Error: " there is no content"});
    return;
  }
  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.end('ok')
  }
  else {
  
    res.status(400).json({Error: "post was not found"});
  }
})


//delete a post 

app.delete('/blogs/:title', (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(title)) { 
    fs.unlinkSync(title);
    res.end('ok');
  } else {
    res.status(400).json({Error: "the post doesn't exist"});
  }
})


// read posts

app.get('/blogs/:title', (req, res) => {

 const title = req.params.title;
 const content = req.body.content;
  if(fs.existsSync(title)){
  const post = fs.readFileSync(title, 'utf-8');

  const response = {
    title: title,
    content: post
  }
  res.status(200).json(response);
  }
  else{
    res.status(400).end("The post was not found");
  }
})

app.get("/blogs", (req, res) => {
  const files = [];
  const fileNames = fs.readdirSync("/");
  fileNames.forEach((fileName) => {
    files.push({title: fileName});
  })
  res.status(200);
  res.send(files);
})

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)

module.exports = app;