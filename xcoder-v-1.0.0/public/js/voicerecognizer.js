// showInfo('info_start');

var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;

if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  start_button.style.display = 'inline-block';
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() {
    recognizing = true;
    // showInfo('info_speak_now');
    start_img.src = 'mic-animate.gif';
  };

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      start_img.src = 'mic.gif';
      // showInfo('info_no_speech');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      start_img.src = 'mic.gif';
      // showInfo('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        // showInfo('info_blocked');
      } else {
        // showInfo('info_denied');
      }
      ignore_onend = true;
    }
  };

  recognition.onend = function() {
    recognizing = false;
    recognition.start();
    
    if (ignore_onend) {
      return;
    }
    start_img.src = 'mic.gif';
    if (!final_transcript) {
      // showInfo('info_start');
      return;
    }
    // showInfo('');
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNode(document.getElementById('final_span'));
      window.getSelection().addRange(range);
    }

  };

  recognition.onresult = function(event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }

    final_transcript = final_transcript;
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);
    // console.log(" [ log from  onresult ] = " + final_transcript);
    // if(final_transcript !== ''){
        trans(final_transcript);             
    // }

      /* appending a new div element to an html element */
     /*var ele = document.createElement("div");
            ele.setAttribute("id","timedrpact"+i);
            ele.setAttribute("class","inner");
            ele.innerHTML="hi "+i;
            output.appendChild(ele);*/

    // console.log(interim_transcript);
    // final_transcript = '';
  };
}

function upgrade() {
  start_button.style.visibility = 'hidden';
  // showInfo('info_upgrade');
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}


function startButton() {
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.lang = "en-GB";
  recognition.start();
  ignore_onend = false;
  final_span.innerHTML = '';
  interim_span.innerHTML = '';
  start_img.src = 'mic-slash.gif';
  // showInfo('info_allow');
  // start_timestamp = event.timeStamp;
}

// function showInfo(s) {
//   if (s) {
//     for (var child = info.firstChild; child; child = child.nextSibling) {
//       if (child.style) {
//         child.style.display = child.id == s ? 'inline' : 'none';
//       }
//     }
//     info.style.visibility = 'visible';
//   } else {
//     info.style.visibility = 'hidden';
//   }
// }