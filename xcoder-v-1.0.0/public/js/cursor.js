var cursor = {

	//function gets the current postion of he caret...
	getCurrentPosition: function () {
		return $('#editor').caret();
	},

	// function that updates the current position of the caret takes an int as a parameter...
	updatePosition: function ( number ) {

		var realnumber 	 =  parseInt( number ); //making sure omlu a number id [passed as a parameter]..

		var newposition  = (	realnumber 	+ 	this.getCurrentPosition());   //crearting new postion from the current postion of the cursor. ...
		//updating the cursor positon  to newposition...
		$('#editor').caret(newposition);
		return newposition;
	},

	// the function is called when twe want to update the cursor positon  when a user commands the cursor to move forward, by defautl it move one step , 
	// but is spaces are proviided 
	// then it moves foward the number of provided spaces
	mfoward : function ( spaces ) { 
		// checking if spaces was passed when user issues move back command better option to spaces = spaces || 1....
		var spacestomove;

		if ( typeof spaces === 'undefined' ) {

			spacestomove = 1;

		}else{

			spacestomove = spaces;
		}
		this.updatePosition( spacestomove );
	},

	// the function is called when twe want to update the cursor positon  when a user commands the cursor to move backward, by defautl it move one step , 
	//but is spaces are proviided 
	//then it moves foward the number of provided spaces.
	mback : function ( spaces ) {
		 // checking if spaces was passed when user issues move back command
		 var spacestomove; 

		if ( typeof spaces === 'undefined' ) {

			spacestomove = -1;

		}else{

			spacestomove = -spaces;

		}
		var newposition  = ( spacestomove ); 

		this.updatePosition( newposition );

	},

	//function moves the caret on the next line 
	nextLine : function(){
	  	
	}

}
