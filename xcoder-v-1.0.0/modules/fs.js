 //node modules requireed
const fs = require('fs');//file system
const chdir = require('chdir');//dirrectory manager
const ls =require('ls');//list files directory
const chokdiar = require('chokidar');//keeps trck of canes in files or folders
const prompt = require('prompt');//prompts user fr input
const path = require('path');//prompts user fr input
//node modules

//gloabla variables to be used
var workingdir="";
var projdir="";
//global variables

//watch the folder structure projects for an y changes
// var exports = exports.modules()={};
exports.watchprojects= function(callback)
{
	var projects=[];
		fs.readdirSync('./public/projects/').forEach(file => {
			  projects.push(file);
			})
	callback(projects);
}

//watch a given working space for any changes in the files
exports.workingfiles=function(callback)
{
	var files=[];
	fs.readdirSync('./public/projects/'+getfoldername()+'/').forEach(file => {
		  files.push(file);
		})
	callback(files);

}


//splits the working directory to return project name being currently used
function getfoldername(dir='')
{
	var splitdir= workingdir.split('\\');
	var last=splitdir[splitdir.length-1];
	return last;
}


//function retaes project but first checks 
exports.createProject =  function(name)
{
	if(!fs.existsSync('./public/projects/'+name))//check if the project does not already exist
	{
		fs.mkdirSync('./public/projects/'+name);
		Createfile('index','./public/projects/'+name+'/');
		changeDirectory(name);
		return "Project created, changing directory done";
	}
	else
	{
		console.log('Project already exist');
		return "Project already exists";
	}
}
//function to create a file for a particular current working directory
exports.Createfile=function(filename,dir,callback)
{
	if(!fs.existsSync(__dirname+'/../public/projects/'+dir+'/'+filename))
	{
		var html = '<! DOCTYPE html>\n<html>\n\t<head>\n\t<title></title>\n\t<link type="text/css" rel="stylesheet" href="../bootstrap/bootstrap.min.css"/>\t\n</head>\n\t\t<body></body>\n</html>';
		var wite=fs.writeFile(__dirname+'/../public/projects/'+dir+'/'+filename, html);
		callback({'status':true,'message':'File created'});
	}
	else
	{
		callback({'status':false,'message':'File creation failed'});
	}
	

}

//saves current fil in use
exports.save=function(dir,data, callback)
{
	fs.writeFile(__dirname+'/../public/projects/'+dir,data,(err)=>{
		if(err)
		{
			callback(err);
		}
		else
		{
			callback("file saved");
		}
	});
}

//reads file
exports.readFile=function(dir,file, callback)
{
	if(fs.existsSync(__dirname+'/../public/projects/'+dir+'/'+file))//checks if file requsted for is available
	{
			fs.readFile(workingdir+'\\'+file,'utf8',(err,data)=>{
				if(err) throw err;
				callback({'dir':__dirname+'/../public/projects/'+dir+'/'+file,'data':data});
			});
	}
	else
	{
		callback('File does not exist');
	}	
}

// //changes working directory
exports.changeDirectory=function(pro,callback)
{	
	if(fs.existsSync(__dirname+'/../public/projects/'+pro))
	{
		chdir(__dirname+'/../public/projects/'+pro,function(err)
		{
			if(err){ throw err;}
			workingdir=process.cwd();	
		})
		callback({'status':true,'message':'directory changed to project. '+pro,'project':pro});
	}
	else
	{
		// callback(pro);
		callback({'status':false,'message':'unknown project '+pro});
	}
	
}

//function to delete or unlink a file or directory
exports.deleteFile=function(dir,callback)
{
	fs.unlink(dir,(err)=>{
		if(err)
		{
			callback(err);
		}
		else
		{
			callback('deleted');
		}
	});
}


// file system to xcoder,a personal coding assitant for mainly the handicapped and otherside advantaged users
// 				developed and copy righted to xaecia

// function Createfile(filename,dir,callback)
// {
	
// 	var wite=fs.writeFile(__dirname+'/../projects/moze/'+filename);
// 	callback(wite);

// }
// Createfile('home.html','C:\\Users\\Mowzey\\Documents\\xcoder-v-1.0.0\\moze\\',function(data){console.log(data)});