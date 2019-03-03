    var tags = [ 
          {
            'value': 'html',
            'tag':'<!DOCTYPE html>\n <html>\n <head>\n\t <title></title>\n<link type="text/css" rel="stylesheet" href="../bootstrap/bootstrap.min.css"/></head>\n <body>\n\n</body>\n </html>',
            'character':'<title>',
            'carPos':'67'
          },
          {
            'value': 'div',
            'tag':'<div></div>',
            'carPos':'12'
          },
          {
            'value': 'paragraph',
            'tag':'\t<p></p>',
            'carPos':'4'
          },
          {
            'value': 'link',
            'tag':'<a href="" title=""></a>',
            'carPos':'12'
          },
          {
            'value': 'heading',
            'tag':'<h1></h1>',
            'carPos':'12'
          },
          {
            'value': 'heading 2',
            'tag':'<h2></h2>',
            'carPos':'12'
          },{
            'value': 'heading 3',
            'tag':'<h3></h3>',
            'carPos':'12'
          },
          {
            'value': 'heading 4',
            'tag':'<h4></h4>',
            'carPos':'12'
          },
          {
            'value': 'heading 5',
            'tag':'<h5></h5>',
            'attr':''
          },
          {
            'value': 'heading 6',
            'tag':'<h6></h6>',
            'carPos':'12'
          },
          {
            'value': 'image',
            'tag':'<img src="" alt=""/>',
            'carPos':'12'
          },
          {
            'value': 'body',
            'tag':'<body></body>',
            'carPos':'12'
          },          
          {
            'value': 'header',
            'tag':'<header></header>',
            'carPos':'8'
          },
          {
            'value': 'footer',
            'tag':'<footer></footer>',
            'carPos':'8'
          },          
          {
            'value': 'hr',
            'tag':'<hr/>',
            'carPos':'6'
          },
          {
            'value': 'break',
            'tag':'<br/>',
            'carPos':'6'
          },
          {
            'value':'navigation',
            'tag':'<nav class="navbar navbar-default" role="navigation" style="margin-bottom:0 !important;">\n<div class="navbar-header">\n<a class="navbar-brand" href="#">TutorialsPoint</a>\n</div>\n<div>\n\ <ul class="nav navbar-nav">\n\ <li class="active"><a href="#">iOS</a></li>\n\ <li><a href="#">SVN</a></li>\n\ <li class="dropdown">\n\ <a href="#" class="dropdown-toggle" data-toggle="dropdown">\n\ Java\n\ <b class="caret"></b>\n\ </a>\n\ <ul class="dropdown-menu">\n\ <li><a href="#">jmeter</a></li>\n\ <li><a href="#">EJB</a></li>\n\ <li><a href="#">Jasper Report</a></li>\n\ <li class="divider"></li>\n\ <li><a href="#">Separated link</a></li>\n\ <li class="divider"></li>\n\ <li><a href="#">One more separated link</a></li>\n\ </ul>\n\ </li>\n\ </ul>\n\ </div>\n\ </nav>'
          },
          {
            'value':'media',
            'tag':'<div class="media">\n<a class="pull-left" href="#">\n<img class="media-object" src="/bootstrap/images/64.jpg" alt="Media Object">\n</a>\n<div class="media-body">\n<h4 class="media-heading">Media heading</h4>\nThis is some sample text. This is some sample text. This is some sample text. This is some sample text. This is some sample text. This is some sample text. This is some sample text. This is some sample text. </div>\n</div>'
          },
          {
            'value':'jumbotron',
            'tag':'<div class="jumbotron" style="padding:50px;">\n</div>'
          },          
          {
            'value':'thumbnail',
            'tag':'<div class="thumbnail">\n</div>'
          },
          {
            'value':'well',
            'tag':'<div class="well">\n</div>'
          },
          {
            'value':'columns',
            'tag':'<div class="rows">\n<div class="col-md-3">Lorem ipsum</div>\n<div class="col-md-9">lorem ipsum</div>\n</div>'
          },
          {
            'value':'container',
            'tag':'<div class="container">\n</div>'
          }

        ];


      var codeCommands = ['cd','see d','see','Cindy','sydney','see the'];
      var cursorCommands = ['go', 'move', 'front','back'];
      var fileCommands = ['cmd'];
      var textCommands = ['write','text','right']

      command = '';
      var myTag = '';
      //this function captures the issued command and checks for the first statement ie the user command then runs specific functions corresponding to the given command.
      //the function calls the corresponding functions and passes the user voice input string to the function to do further processing.
      //if the user command seems strange to the trans() function, it lets the bot return a message to the user asking for new input.


      function trans(command){
          
          // console.log(" [ log from  transcriber  ] = " + command);

          if (command !== "") {
            command = command.toLowerCase();
            var issuedCommand = command.split(' ');
            var count = issuedCommand.length;
            // var tag = issuedCommand[count - 1];
            var specificCommand = issuedCommand[0];
            if ($.inArray(specificCommand, codeCommands) > -1) {
              transcribeCode(command);
            }else if(specificCommand == 'settings'){
              // transcribeSettings(command);
              speak("Opening settings page");
              window.location = "settings.html";
            }else if($.inArray(specificCommand, fileCommands) > -1){
              transcribeFiles(command);
            }else if($.inArray(specificCommand, textCommands) > -1) {
              transcribeWords(command);
            }else if($.inArray(specificCommand, cursorCommands) > -1) 
            {
              moveCursor(command);
            }else if(specificCommand == 'run')
            {
              file_run();
            }else{
              speak("we did not get your command please try again");
              // speak("haha ha haha ha");
            }    
            doOnClick();
            final_transcript = '';    
          }else{
              // speak("I could not get your command, please try again");
              // speak("hahahahahaha");
          }


      }



      //this indents in the text area and prevents default action of the TAB key.
      $(document).delegate('#editor', 'keydown', function(e) {
        var keyCode = e.keyCode || e.which;

        if (keyCode == 9) {
          e.preventDefault();
          var start = $(this).get(0).selectionStart;
          var end = $(this).get(0).selectionEnd;

          // set textarea value to: text before caret + tab + text after caret
          $(this).val($(this).val().substring(0, start)
                      + "\t"
                      + $(this).val().substring(end));

          // put caret at right position again
          $(this).get(0).selectionStart =
          $(this).get(0).selectionEnd = start + 1;
        }
      });

      $(document).on('click','#editor', function(){
        var postion = $('#editor').caret();
        console.log(postion);
      });

    function doOnClick() {
        $('#start_button').click();
        // console.log(5454);
    }

    $(document).ready(function(){
        $('#start_button').click();
    });