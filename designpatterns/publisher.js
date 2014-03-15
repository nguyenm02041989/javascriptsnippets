
/**
 * This is based on the Observer pattern. Just a simple class to subscribe to
 * and listen to events.
 * 
 * In the function of Publisher we also use at 
 * function Notify the Command design pattern.
 * 
 */
function Publisher() {

	var me = this;
	
	/**
	 * The subscribers of a publisher.
	 */
	this.subscribers = [];

	/**
	 * Add a new subscriber to list of subscribers.
	 */
	this.subscribe = function(subscriber) {
		
		if(!this.exists(subscriber)) {
			this.subscribers.push(subscriber);
		}
	};

	/**
	 * Unsubscribe the subscriber from the list.
	 */
	this.unsubscribe = function(subscriber) {

		var max = this.subscribers.length;
		var indexToRm = -1;

		for ( var i = 0; i < max; i++) {

			if (this.subscribers[i] === subscriber) {
				indexToRm = i;
				break;
			}
		}

		if (indexToRm != -1) {

			this.subscribers.splice(indexToRm, 1);
		}
	};
	
	/**
	 * Check if the subscriber exists.
	 */
	this.exists = function(subscriber) {
		
		var max = this.subscribers.length;
		for ( var i = 0; i < max; i++) {
			
			if (this.subscribers[i] === subscriber) {
				return true;
			}
		}
		return false;
	};
	
	/**
	 * Notify the subscribers. 
	 * 
	 * Usage:
	 * 
	 * Publishher.notify('notify', 'click',);
	 * 
	 * OR 
	 * 
	 * Publishher.notify('notify', 'click', 'some more arguments');
	 * 
	 * It's very powerful.
	 * 
	 */
	this.notify = function(methodName) {
		
		var max = this.subscribers.length;

		for ( var i = 0; i < max; i++) {

			console.log(i+". Publisher notifies:");
			
			this.subscribers[i][methodName].apply(me, [].slice.call(arguments, 1));
		}
	};

	/**
	 * Loop through the subscribers.
	 * 
	 */
	this.each = function(cb) {

		var max = this.subscribers.length;
		for ( var i = 0; i < max; i++) {

			cb(subscribers[i]);
		}
	};

};


function Subscriber(subscriptionId) {

	var me = this;
	
	this.subscriberId = subscriptionId;

	this.notify = function(evType) {
		
		console.log("received notification " + evType);
		
		for(var i = 0; i < arguments.length; i++) {
			console.log("Subscriber: notify subscriberId:" + me.subscriberId + " argument: " + arguments[i]);
		}
		console.log("");
	};
};

var publisher = new Publisher();

var subscriber1 = new Subscriber(1);
var subscriber2 = new Subscriber(2);
var subscriber3 = new Subscriber(3);

publisher.subscribe(subscriber1);
publisher.subscribe(subscriber2);
publisher.subscribe(subscriber3);

// Tell the subscribers the paper has been delivered.
publisher.notify('notify', 'paper delivery');

// Here you can pass more arguments if you want.
publisher.notify('notify', 'paper delivery', 10, 20);

// Remove subscriber no 2
publisher.unsubscribe(subscriber2);

publisher.notify('notify', 'paper delivery');
