var mysql = require('mysql');
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hello',
    database: 'd1'
});

/*var http = require("http");       
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  //response.write("Hello World");
    connection.query('select * from p1',function(err,rows,fields){
        response.write('<br>',JSON.stringify(rows));
        response.end();
    });writeHead
  
}).listen(8888);*/
connection.connect();

//app.use(express.json());       // to support JSON-encoded bodies
//app.use(express.urlencoded())
var data;
var i = 0;
var mobile;
var data;

app.post('/',function(request,response){
    //res.writeHead(200, {"Content-Type": "text/plain"});
   //response.writeHead(200, {"Content-Type": "text/plain"});
  //response.write("Hello World");
  var rollno = request.body.rollno;
   	done();
   function done(){
   		if(i<10){
		   connection.query('select * from t1 where rollno=?',rollno,function(err,rows,fields){
		     	 data = rows[0].email;
		     	//console.log(data);
		      //response.end(data);
		      		connection.query('select * from t2 where email=?',data,function(err,rows2,fields2){
			      		mobile = JSON.stringify(rows2[0].mobile);
			      		//console.log(mobile);
			      		//response.end(mobile);
			      			getdetails(request,response,mobile);
		      		
		      		connection.query('select * from t3 where mobile=?',mobile,function(err,rows3,fields2){
		      			data = JSON.stringify(rows3);
			      		console.log(data);
			      		//response.end(data);
			      			
		      		});
		      	});
			      //response.end();
			      //connection.end();
			      //console.log('hui');
			      
			      done();
		   	 });
		   i++;
		   rollno++;
		}
	}

	//response.send(rollno);
	//response.end();
    //console.log('working')
}).listen(8888);
app.post('/insert',function(request,response){
	var rollno = request.body.rollno;
	var email = request.body.email;
	var post = {
		email:email,
		rollno:rollno
	}
	//console.log(rollno + email);
	connection.query('INSERT INTO t1 SET?',post,function(err,rows4){
		if(!err){
			response.end('Insertion is Successfull');
		}else console.log(err);
		done();
	});
});
app.use('/client',express.static(__dirname + '/client'));
function getmobile(request,response,data){
	connection.query('select * from t2 where email=?',data,function(err,rows2,fields2){
      		var mobile = JSON.stringify(rows2[0].mobile);
      		console.log(mobile);
      		//response.end(mobile);
      			getdetails(request,response,mobile);
      	});
}

function getdetails(request,response,mobile){
	connection.query('select * from t3 where mobile=?',mobile,function(err,rows3,fields2){
      		var data = JSON.stringify(rows3);
      		//console.log(mobile);
      		response.end(data);
      			i++;
      	});
}