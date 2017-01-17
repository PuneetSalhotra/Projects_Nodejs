var mysql = require('mysql');
var http = require('http');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hello',
    database: 'test'
});

/*var http = require("http");       
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  //response.write("Hello World");
    connection.query('select * from p1',function(err,rows,fields){
        response.write('<br>',JSON.stringify(rows));
        response.end();
    });
  
}).listen(8888);*/
connection.connect();
var express = require('express');
var app = express();
app.get('/:id',function(request,response){
    //res.writeHead(200, {"Content-Type": "text/plain"});
   //response.writeHead(200, {"Content-Type": "text/plain"});
  //response.write("Hello World");
    connection.query('select * from p1 where rollno='+ request.params.id,function(err,rows,fields){
      response.send(JSON.stringify(rows));
      response.end();
      //connection.end();
    });
    console.log('working')
}).listen(8888);