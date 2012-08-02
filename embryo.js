


// Embryonic Programming
// ====================
// An Existential, and Biological approach to coding.
// Turning projects into Creations.


var Embryo = function(meta){
	this.known = [];
	this.type = meta.type || "bug";
	this.title = meta.title || "Creation";
	this.id = meta.id || "0";
	this.offspring = 0;
	this.description = meta.description || "An Embryo.";
	this.err = meta.err || {code: 500, msg: "This is a Bug. A Patch/Feature has not being created yet."};
	this.fn = meta.fn || function(){
		return [this.err, null];
	}

	this.fn(this);
}

Embryo.prototype.split = function(title){
	var newEmbryo = this;
	newEmbryo.title = title || "Creation";
	newEmbryo.id = this.id + "-" + (this.offspring++);
	newEmbryo.fn = function(){
		return [this.err, null];
	}
	this.known.push(newEmbryo);
	return newEmbryo;
}

Embryo.prototype.do = function(cmds, cb){
	if (this.known.indexOf(cmds[0]) !== -1) {
		var ret = this.known[cmds[0]].fn(cmds[1]);
	} else {
		var ret = this.split(cmds[0]).fn(cmds[1]);
	}

	cb(ret[0], ret[1]);
}


// Example - First try.

new Embryo({
	title: "my Program",
	type: "Project",
	description: "A Test of Embryonic Programming.",
	fn: function (program) {

		program.do(["add 2 numbers", [2, 3]], function(err, data){
			if (!err) console.log("added two numbers and got: ", data);
			else console.log("tried to add two numbers, but got an err: ", err);
		});

	}
})