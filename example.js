
var Embryo = require('./embryo');

new Embryo({
	title: "My Program",
	type: "Project",
	description: "A Test of Embryonic Programming.",
	fn: function (program) {

		program.run(["add 2 numbers", [2, 3]], function(err, data){
			if (!err) console.log("Embryo: Added two numbers and got: ", data);
			else console.log("Embryo: Tried to [", this.title, "] but got an err: ", err);
		});

	}
})
