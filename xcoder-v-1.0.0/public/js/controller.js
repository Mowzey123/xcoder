//this function executes file commands
  function transcribeCode(command)
  {
    var issuedCommand = command.split(' ');
    var count = issuedCommand.length;
    if (issuedCommand[ count-1 ] ==='okay' || issuedCommand[ count-1 ] ==='ok') {
      for (var i = 0; i < tags.length; i++) {
        if (tags[i].value === issuedCommand[ count-2]) {
          myTag = tags[i].tag;
          var character = tags[i].character;

          var position = $('#editor').caret(); //gets the current caret position

          $('#editor').caret(myTag);
          var caretPos = parseInt(tags[i].carPos); //capture caret position from dictionary
          // cursor.updatePosition(caretPos);
          $('#editor').caret(caretPos + position); //update curret position with a number parameter
          console.log($('#editor').caret());
        }
      }
      $('#final_span').html('');
      savefile();
    }
  }



  //this function executes file commands
  function transcribeFiles(command)
  {
    var issuedCommand = command.split(' ');
    var count = issuedCommand.length;
    if (issuedCommand[ count-1 ] ==='okay' || issuedCommand[ count-1 ] ==='ok') {
      var specific_command = issuedCommand[1];
      var fileCommand = issuedCommand[2];
        if (specific_command =='create') {
          if (fileCommand =='file') {
            createfile(issuedCommand[3]+'.html');
            $('#final_span').html('');
            var $fileopen = $("#fileopen");
            $fileopen.html(issuedCommand[3]+'.html');
            readfile(issuedCommand[3]+'.html');
            localStorage.setItem('file',issuedCommand[3]+'.html');
            $('#editor').caret(60);
            changeDirectory(localStorage.getItem("cwd"));

          }else{
            createProject((issuedCommand[3]));
            $('#final_span').html('');
          }
        }else if(specific_command =='open')
        {
          if (fileCommand =='file') {
            var $fileopen = $("#fileopen");
            $fileopen.html(issuedCommand[3]+'.html');
            readfile(issuedCommand[3]+'.html');
            localStorage.setItem('file',issuedCommand[3]+'.html');
            $('#final_span').html('');
            savefile();
          }else{
            changeDirectory((issuedCommand[3]));
            $('#final_span').html('');
          }
        }
    }
  }

  //function to type normal text
  function transcribeWords(command)
  {
    var issuedCommand = command.split(' ');
    var count = issuedCommand.length;
    if (issuedCommand[ count-1 ] ==='okay' || issuedCommand[ count-1 ] ==='ok') {
      $('#final_span').html('');
      command = 'bleep'+command+'bleep';
      command = command.replace('bleeptext','');
      command = command.replace('okaybleep','');
      $('#editor').caret(command);
      savefile();
    }
  }

  //function to run settings
  function transcribeSettings(command)
  {

  }


  function clearVars()
  {
    final_transcript = '';
    final_span.innerHTML = '';
    interim_span.innerHTML = '';
  }

  //function to cater for the cursor movements
  function moveCursor(command)
  {
    var values = [ 
          {
            'value': 'one',
            'num':'1'
          },
          {
            'value': 'two',
            'num':'2'
          },
          {
            'value': 'three',
            'num':'3'
          },
          {
            'value': 'four',
            'num':'4'
          },
          {
            'value': 'five',
            'num':'5'
          },
          {
            'value': 'six',
            'num':'6'
          },{
            'value': 'seven',
            'num':'7'
          },
          {
            'value': 'eight',
            'num':'8'
          },
          {
            'value': 'nine',
            'num':'9'
          },
          {
            'value': 'ten',
            'num':'10'
          }
        ];

    var issuedCommand = command.split(' ');
    var count = issuedCommand.length;
    if (issuedCommand[ count-1] ==='okay' || issuedCommand[ count-1 ] ==='ok') {

        var position = $('#editor').caret(); // gets the current caret position
        var newPos;

        var myvalue = issuedCommand[1];
            if (myvalue !== undefined) {
              if (myvalue.length > 2) {
                for (var i = 0; i < values.length; i++) {
                  if (values[i].value === myvalue) {
                    myvalue = values[i].num;
                  }
                }          
              }
            }




        console.log("my move number is " + myvalue);


        if (issuedCommand[0] === 'back') {
          newPos = parseInt(position) -  parseInt(myvalue); //update curret position with a number parameter
        }else{
          newPos = parseInt(position) + parseInt(myvalue);
        }
        $('#editor').caret(newPos);
        $('#editor').focus();
        console.log(newPos);
        console.log(issuedCommand[1]);


    }
  }

/*======================================FILE FUNCTIONS TO BE CALLED FOR THE DIFFERENT FILE OPERATIONS==============================================*/
//function to get projects in the projects dir
  function appendtoprojects()
  {
    socket.emit('getprojects',function(data){
        
        for (var i = 0, len = data.length; i < len; i++) 
        {
          $('#projects').append("<a class='mdl-navigation__link' href=''  style='background: #ccc; display:block;' id='"+data[i]+"'>"+data[i]+"</a><nav class='mdl-navigation my-side-menu' style='padding:5px;' id='spacefiles'></nav>");
        }
    });
  }

  //functions to get files in the working space
  function appendprojectfiles(project)
  {
    var workingdir = localStorage.getItem("cwd");
    if(workingdir){
        var html = "<details id='files' open> <summary style='padding:7px; color:#aaa; cursor:pointer; font-weight:bold; background:#555;'>"+workingdir+"</summary>";
        socket.emit('getspacefiles',function(data){
        for (var i = 0, len = data.length; i < len; i++) 
        {
        $("#files").append("<p id='file' data-role='"+data[i]+"' style='margin:0;'><a class='openFile' href='' id='"+data[i]+"'>"+data[i]+"</a></p>");
        }
        });

        html += "</details>";  
    }else{
        var html = "<h3>no projects</h3>";
    }
    
    console.log(html);
    $("#projects").html(html);
  }

  
  changeDirectory('moze');

  function changeDirectory(name='')
  {
    var workingdir='';
    if(name=='')
    {
      workingdir = localStorage.getItem("cwd");
    }
    else
    {
      workingdir = name;
    }
    console.log(workingdir);
    socket.emit('changeDirectory',{'dirname':workingdir},function(data){
        if(data.status){
          localStorage.setItem('cwd',data.project);
          // appendtoprojects();
          appendprojectfiles(data.project);
          readfile(localStorage.getItem('file'));
          console.log(data.message);
          // callback(data.message);
        }
        else
        {
          console.log(data.message);
          // callback(data.message);
        }
    });

  }


  function createfile(filename)
  {
    speak("creating file "+ filename);
    var working=localStorage.getItem('cwd');
    socket.emit('createfile',{'filename':filename,'workingdir':working},function(data){
      console.log(data);
     // callback(data.message);
    });
  }


  function createProject(name)
  {
    speak("creating project "+ name);
    socket.emit('createProject',{'project':name}, function(data){
      console.log(data);
     // callback(data.message);
    });
  }


  function readfile(filename)
  {
    var workingdir=localStorage.getItem('cwd');
    socket.emit('reafile',{"workingdir":workingdir,'filename':filename},function(data){
        console.log(data);
      $('#editor').text(data.data);
      $('#documentinuse').text(data.dir);

            var $fileopen = $("#fileopen");
            $fileopen.html(localStorage.getItem('file'));
    });

  }

  function savefile()
  {
    var workingdir=localStorage.getItem('cwd');

    var filedir = $('#fileopen').text();
    var data=$('#editor').val();

    console.log(data);
    var filepath  = workingdir+"/"+filedir;
    console.log(" filepath  "+filepath);

    socket.emit('savefile',{"filedir":filepath,"data":data},function(data){
        console.log(data);
    });
  }

  function file_run()
  {
    var workingdir=localStorage.getItem('cwd');
    var filedir = $('#fileopen').text();
    window.open('http://localhost:3700/projects/'+workingdir+"/"+filedir,'_blank','toolbar=yes, location=yes, status=yes menubar=yes, scrollbars=yes');
  }