


// Embryonic Programming
// ====================
// An Existential, and Biological approach to coding.
// Turning projects into Creations.


var Embryo = function(meta){

	this.godfather = typeof meta.godfather !== 'undefined' ? meta.godfather : null;
	this.id = meta.id || "0";
	this.type = meta.type || "bug";
	this.title = meta.title || "Creation";
	this.description = meta.description || "An Embryo.";
	
	this.offspring = 0;
	this.err = meta.err || {code: 500, msg: "This is a Bug. A Patch/Feature has not being created yet."};
	this.fn = meta.fn || function(){
		return [this.err, null];
	}

	if (!this.godfather) this.embryos = {};

	this.fn(this);
	return null;
}

Embryo.prototype.split = function(title){

	console.log("Splitting and creating new embryo to fulfill feature: ", title);
	var newEmbryo = new Embryo({godfather: this.godfather || this});

	newEmbryo.id = this.id + "-" + (this.offspring++);
	newEmbryo.title = title || ("Creation " + newEmbryo.id);
	
	newEmbryo.fn = function(){
		return [this.err, null];
	}
	newEmbryo.godfather.embryos[title] = newEmbryo;
	return newEmbryo;
}

Embryo.prototype.do = function(cmds, cb){

	var ret;
	if (!this.godfather && typeof this.embryos[cmds[0]] !== 'undefined') {
		console.log("feature: " + cmds[0] + " exists on self, asking it to fulfill request.");
		ret = this.embryos[cmds[0]].fn(cmds[1]);
	} else if (this.godfather && typeof this.godfather.embryos[cmds[0]] !== 'undefined') {
		console.log("feature: " + cmds[0] + " exists on godfather, asking it to fulfill request.");
		ret = this.godfather.embryos[cmds[0]].fn(cmds[1]);
	} else {
		console.log("feature: " + cmds[0] + " doesnt exists, creating bug.");
		ret = this.split(cmds[0]).fn(cmds[1]);
	}

	cb(ret[0], ret[1]);
}


// Example - First try.

new Embryo({
	title: "My Program",
	type: "Project",
	description: "A Test of Embryonic Programming.",
	fn: function (program) {

		program.do(["add 2 numbers", [2, 3]], function(err, data){
			if (!err) console.log("added two numbers and got: ", data);
			else console.log("tried to add two numbers, but got an err: ", err);
		});

	}
})
