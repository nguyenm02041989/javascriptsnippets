
var getCurrentDate = function() {

	var d = new Date();
	return d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " "
			+ d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
};

/**
 * This function is handy to check for some state.
 * If the state didn't change, the timeout value doubles.
 * The goal is to limit the checking if the state didn't change for a long time.
 * 
 * @param timeout
 */
function checkStateChange(timeout) {
	
	console.log(getCurrentDate() + " checkStateChange: " + timeout + "ms");
	
	if(stateActive) {
		
		console.log("STATE CHANGED");
	}
	else {
		
		timeout = timeout * 2;
		setTimeout(function(){
			
			checkStateChange(timeout);
		}, timeout);
	}
};


var stateActive = false;

// if stateActive == true write "state changed"

checkStateChange(2000); // Check after 2 seconds

// End after 20 secs.
setTimeout(function(){
	stateActive = true;
}, 20000);