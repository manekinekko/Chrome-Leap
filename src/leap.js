(function (){

	console.log('Chrome Leap ON');

	var ws;

	// Support both the WebSocket and MozWebSocket objects
	if ((typeof(WebSocket) == 'undefined') && (typeof(MozWebSocket) != 'undefined')) {
		WebSocket = MozWebSocket;
	}

	// Create the socket with event handlers
	//Create and open the socket
	ws = new WebSocket("ws://localhost:6437/");

	// On successful connection
	ws.onopen = function(event) {
		console.log('Leap found', event);
	};

	// On message received
	ws.onmessage = function(event) {
		// var obj = JSON.parse(event.data);
		// var str = JSON.stringify(obj, undefined, 2);
		// console.log('Leap motion', event);
		scrollTo(event);
	};

	// On socket close
	ws.onclose = function(event) {
		ws = null;
		console.log('Leap closed', event);
	}

	//On socket error
	ws.onerror = function(event) {
		console.log('Leap error', event);
	};

}());

function scrollTo(event) {
	try {
		var data = JSON.parse(event.data);
		var pointables = data.pointables;
		if (pointables.length === 0){
			console.log('pointables.length', pointables.length);
			return;
		}
		if (pointables[0].direction) {
			var x = pointables[0].direction[0] * -10;
			var y = pointables[0].direction[1] * 10;
			window.scrollBy(x, y);
			console.log(x, y, z);
		}
	}
	catch(e){
		return;
		console.log('catch return');
	}


};
