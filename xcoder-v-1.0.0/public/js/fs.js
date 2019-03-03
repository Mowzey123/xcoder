const fs = require('fs');
const chdir = require('chdir');
const spawn = require('child_process').spawn;
const ls =require('ls');
const prompt = require('prompt');

const newfile ='<!DOCTYPE html><html><head><title></title></head><body></body></html>';
const newcontent='testing';

function createProject(name)
{
	if(!fs.existsSync('./projects/'+name))
	{
		fs.mkdirSync('./projects/'+name);
		Createfile('index','./'+name);
	}
	else
	{
		console.log('Project already exist');
	}
}

function Createfile(filename,dir)
{
	if(filename=='index')
	{
		fs.open(dir+'/index.html','a+',(err,fd)=>{
			if(err)
			{
				console.log('error occured')
			}
			else
			{
				writeToFile(dir+'/index.html',newfile);
			}
		});
	}
	else
	{
			fs.open(dir+'/'+filename,'a+',(err,fd)=>{
			if(err)
			{
				console.log('error occured')
			}
		});

	}
}

function writeToFile(dir,data)
{
	fs.writeFile(dir,data,(err)=>{
		if(err)
		{
			console.log(err);
		}
	});
}
function readFile(dir)
{
	var dataa='';
	fs.readFile(dir,'utf8',(err,data)=>{
		if(err) throw err;
		// console.log(data);
		dataa= data;
	});
	return(dataa);
}

function updateFile(dir)
{
	content=readFile(dir);
	var data=content+newcontent;
	writeToFile(dir,data);
}
function changeDirectory(name)
{
	chdir('./'+name,function()
	{
		console.log('cwd[0]='+process.cwd());
	})
}
function listDirectorate()
{
	var allfile=ls('./mos/*');
	for(var file of allfile)
	{
		console.log(file.name,'is',file.stat.size);
	}
}

function deleteFile(dir)
{
	fs.unlink(dir,(err)=>{
		if(err)
		{
			console.info(err);
		}
		else
		{
			console.info('deleted');
		}
	});
}

function prompts(content)
{
	var res={};
	prompt.get(content,function(err,data){
		res=data;
		// console.info(data.content);
	});
	return res;
}
// createProject('dero');
// writeToFile('./mos/mo.html','hi there');
// readFile('./mos/mo.html');
// updateFile('./mos/mo.html');
// deleteFile('./mos/mo.html');
// prompts();
