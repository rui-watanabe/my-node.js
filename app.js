const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var messages = [];
var id = 1;
app.use(bodyParser.json());
 
app.get('/', function (req, res) {
  res.send('Hello World');
})

//Get localhost/30000/messages/
app.get("/messages", function(req, res){
    res.json(messages);
});

//Get localhost/30000/messages/2
app.get('/messages/:id', function(req, res) {
    var id = parseInt(req.params.id);
    var flag = false;
  
    for(var i = 0; i < messages.length; i++) {
      if(messages[i].id === id) {
        res.json(messages[i]);
        flag = true;
        break;
      };
    };
  
    if(!flag) {
      res.send('Can not find any messages with this ID');
    };
});

//Post localhost/30000/messages/2
app.post("/messages", function(req, res){
    var body = req.body;

    var new_message = {
        id: id++,
        name: body.name,
        content: body.content,
        read: body.read
    }
    messages.push(new_message);
    res.send("New Message");
});

//Post localhost/30000/messages/2
app.delete("/messages/:id", function(req, res){
    var id = parseInt(req.params.id);
    var flag = false;
  
    for(var i = 0; i < messages.length; i++) {
      if(messages[i].id === id) {
        messages.splice(i, 1);
        flag = true;
        break;
      };
    };
  
    if(!flag) {
        res.send('Can not find any messages with this ID');
    }else{
        res.send("Message with ID " + id + " has been deleted");
    }
});

app.listen(30000,function(){
    console.log("runninng");
});