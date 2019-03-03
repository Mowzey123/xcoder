/*
 * Check for browser support
 */
// var supportMsg = document.getElementById('msg');

if ('speechSynthesis' in window) {
	// speak('Your browser supports speech synthesis');
} else {
	speak('Sorry your browser does not support speech synthesis.');
}

//Setting the default values for the bot settings in the local storage
	var voiceSelect, volumeInput, rateInput, pitchInput, language, theme;

	//variable to store the settings object
	var botSettings = JSON.parse(localStorage.getItem("settings"));
	var settings = {}
	if(!botSettings){
		voiceSelect = 'native';
		volumeInput = 1;
		rateInput = 1;
		pitchInput = 1;
  		language = 'en-GB';
  		theme = 'dark'
		console.log("settings not stored");

  		settings.voice = voiceSelect;
  		settings.volume = volumeInput;
  		settings.rate = rateInput;
  		settings.pitch = pitchInput;
  		settings.language = language;
  		settings.theme = theme;
        settings = localStorage.setItem('settings', JSON.stringify(settings));

// localStorage.setItem('testObject', JSON.stringify(testObject));

	}else{
		console.log('settings stored');
		language = botSettings.lang;
		voiceSelect = botSettings.voice;
		volumeInput = botSettings.volume;
		rateInput = botSettings.rate;
		pitchInput = botSettings.pitch;
		theme = botSettings.theme;
	}





// Create a new utterance for the specified text and add it to
// the queue.
function speak(text) {
  // Create a new instance of SpeechSynthesisUtterance.
	var msg = new SpeechSynthesisUtterance();
  
  // Set the text.
	msg.text = text;

	var newSettings = JSON.parse(localStorage.getItem("settings"));
  // Set the attributes.
  	msg.lang = newSettings.language;
	msg.volume = newSettings.volume;
	msg.rate = newSettings.rate;
	msg.pitch = newSettings.pitch;
  
  // If a voice has been selected, find the voice and set the
  // utterance instance's voice attribute.
	if (voiceSelect) {
		msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect; })[0];
	}
  
  // Queue this utterance.
	window.speechSynthesis.speak(msg);
}


// Set up an event listener for when the 'speak' button is clicked.
// button.addEventListener('click', function(e) {
// 	if (speechMsgInput.value.length > 0) {
// 		speak(speechMsgInput.value);
// 	}
// });
