// const fs = require('./fs.js');

var fs = require('./modules/fs.js');
var express = require('express');
var path = require('path');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3700);
app.use(express.static(path.join(__dirname,'public')));

io.on('connect',function(socket){
    console.log('connected');

	//chnage directory
	socket.on('changeDirectory',function(data,callback){
		fs.changeDirectory(data.dirname,function(info){
			console.log(info);
			callback(info);
		});
	});

	//create file event 
	socket.on('createfile',function(data,callback){
		fs.Createfile(data.filename,data.workingdir,function(info){
			console.log(info);
			callback(info);
		});
	});

	//create file prevent 
	socket.on('createProject', function(data, callback){
		fs.createProject(data.project, function(info){
			console.log(info);
			callback(info);
		});
	});


	//get projects
	socket.on('getprojects',function(callback){
		fs.watchprojects(function(info){
			console.log("projects "+info);
			callback(info);
		});
	});

	//GET WORKING DIRECTORY FILES
	socket.on('getspacefiles',function(callback){
		fs.workingfiles(function(info){
			callback(info);
		});
	});

	//readfile
	socket.on('reafile',function(data,callback){
		fs.readFile(data.workingdir,data.filename,function(info){
			callback(info);
		});
	});

	//save af file
	socket.on('savefile',function(data,callback){
		fs.save(data.filedir,data.data,function(info){
			console.log(info);
		});
	});
});


// fs.getprojects();