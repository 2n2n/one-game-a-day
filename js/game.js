var w = 480;
var h = 320;
var world = new Started;
var g = new Phaser.Game(w,h, Phaser.AUTO, null, world);

function Started() {
	this.preload = function() {
		console.log('preload');
	}
	this.create = function() {
		console.log('create');
	}
	this.update = function() {
	}
}