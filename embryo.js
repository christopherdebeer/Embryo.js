
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
}

Embryo.prototype.split = function(title){

	console.log("Embryo: Splitting and creating new embryo to fulfill feature: ", title);

	var newEmbryo = new Embryo({godfather: this.godfather || this});
	newEmbryo.id = this.id + "-" + (this.offspring++);
	newEmbryo.title = title || ("Creation " + newEmbryo.id);
	newEmbryo.godfather.embryos[title] = newEmbryo;

	return newEmbryo;
}

Embryo.prototype.run = function(cmds, cb){

	var ret, emb;
	cmds[0] = cmds[0].toLowerCase();

	if (!this.godfather && typeof this.embryos[cmds[0]] !== 'undefined') {
		console.log("Embryo: Feature: [" + cmds[0] + "] exists on self, fulfilling request.");
		emb = this.embryos[cmds[0]];
		ret = emb.fn(cmds[1]);
	} else if (this.godfather && typeof this.godfather.embryos[cmds[0]] !== 'undefined') {
		console.log("Embryo: Feature: [" + cmds[0] + "] exists on godfather, asking it to fulfill request.");
		emb = this.godfather.embryos[cmds[0]];
		ret = emb.fn(cmds[1]);
	} else {
		console.log("Embryo: Feature: [" + cmds[0] + "] doesnt exists, creating bug.");
		emb = this.split(cmds[0]);
		ret = emb.fn(cmds[1]);
	}

	cb.call(emb, ret[0], ret[1]);
}



// node methods for compilation and AST manipulation

if (module && !module.parent && process && process.argv.length) {

	var falafel = require('falafel');
	var fs = require('fs');

	console.log('Embryo: Growing ' + process.argv[2]);

	fs.readFile(process.argv[2], function(err, src){
		if (err) console.log("Embryo: Error laoding file: ", process.argv[2]);
		else{
			falafel(src, function(node){
				console.log("================================================");
				console.log(node);
			})
		}
	})

}


if (module && module.exports) module.exports = Embryo;




