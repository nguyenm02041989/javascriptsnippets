/**
 * The Chain of Responsibilty design pattern. Based on the linked list design
 * pattern. This function let you execute a chain of commands in a sequential
 * order.
 * 
 * 
 * 
 * @returns
 */
function ChainResponsibility() {

	var me = this;
	this.start;
	this.end;
	this.currentNode = null;

	// This state tells the chain if it can move to the next node.
	this.canGoToNext = false;

	this.add = function(id, callBack) {

		if (this.start == null) {
			this.start = this.createNode(id, callBack);
			this.end = this.start;
		} else {

			this.end.next = this.createNode(id, callBack);
			this.end = this.end.next;
		}
	};

	this.hasEndTask = function() {
		me.canGoToNext = true;
	};

	this.checkGoToNextState = function() {
			
		if (me.canGoToNext) {

			me.canGoToNext = false;
			me.doneCallback();
		} else {

			setTimeout(me.checkGoToNextState, 1000);
		}
	};

	this.createNode = function(id, callBack) {

		var nodeObj = new function() {

			this.id = id;
			this.cb = callBack;
			this.next = null;

			this.applyCallBack = function() {

				if (this.cb != null) {

					this.cb({
						hasEndTask : me.hasEndTask
					});

					if (this.next != null) {

						me.currentNode = this.next;
						me.checkGoToNextState();
					} else {

						// done
						me.currentNode = null;
					}
				}
			};
		};
		return nodeObj;
	};

	this.getNodeAtIndex = function(i) {

		var counter = 0;
		var curNode = this.start;
		while (curNode != null) {

			if (counter == i) {
				return curNode;
			}
			curNode = curNode.next;
			counter++;
		}
		return null;
	};

	this.remove = function(id) {

		var curNode = this.start;
		var prevNode = this.start;

		while (curNode != null) {

			if (id == curNode.id) {

				if (curNode == this.start) {
					this.start = curNode.next;
					return;
				}
				if (curNode == this.end) {
					this.end = prevNode;
					prevNode.next = currNode.next;
					return;
				}

				prevNode.next = curNode.next;
				curNode = curNode.next;
			} else {

				prevNode = curNode;
				curNode = curNode.next;
			}
		}
	};

	this.each = function(cb) {

		var currNode = this.start;
		while (currNode != null) {

			cb(currNode);
			currNode = currNode.next;
		}
	};

	this.doneCallback = function() {

		if (this.currentNode != null) {
			this.currentNode.applyCallBack();
		}
	};

	this.run = function() {

		if (this.currentNode == null) {
			this.currentNode = this.start;
		}
		this.currentNode.applyCallBack();
	};
}

var getCurrentDate = function() {

	var d = new Date();
	return d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " "
			+ d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
};


/**
 * Example
 * 
 * Use case. Suppose you have a chain of commands, which you want
 * to have executed. Sometimes the next command can only be executed,
 * when the current executing is finished. In this example we use
 * a timeout to show the purpose, but in real life you can use it
 * for several occasions.
 * 
 * 
 */

var chain = new ChainResponsibility();

chain.add(0, function(e) {
	console.log(getCurrentDate()+" execute task 0");

	e.hasEndTask();
});
chain.add(1, function(e) {

	console.log(getCurrentDate()+" execute task 1");

	e.hasEndTask();
});
chain.add(2, function(e) {
	console.log(getCurrentDate()+" execute task 2");

	e.hasEndTask();
});
chain.add(3, function(e) {
	
	console.log(getCurrentDate()+" WAIT 5 seconds, until execution");
	
	setTimeout(function(){

		console.log(getCurrentDate()+" execute task 3");
		e.hasEndTask();		
	}, 5000);

});
chain.add(4, function(e) {
	console.log(getCurrentDate()+" execute task 4");

	e.hasEndTask();
});
chain.add(5, function(e) {
	console.log(getCurrentDate()+" execute task 5");

	e.hasEndTask();
});

chain.run();