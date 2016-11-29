var w = 480;
var h = 320;

var game = new Phaser.Game(w,h, Phaser.AUTO, 'game');
game.state.add('game', new Started);
game.state.add('finish', new Fin);
game.state.start('game');

function Started() {
	this.preload = function() {
		this.game.load.image('player', 'asset/blue-square.png');
		this.game.load.image('food', 'asset/red-square.png');
		this.speed = 200;
		this.score = 0;
	}
	this.create = function() {
		this.game.stage.backgroundColor = "#FFF";
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.cursor = this.game.input.keyboard.createCursorKeys();

		this.player = this.game.add.sprite(w*0.5, h*0.5, 'player');
		this.player.anchor.set(0.5);

		this.game.physics.arcade.enable(this.player)

		this.food = this.game.add.group();
		this.food.enableBody = true;
		this.food.physicsBodyType = Phaser.Physics.ARCADE;
		this.food.create(0, 0, 'food');
		this.food.create(0, h-30, 'food');
		this.food.create(w-30, h-30, 'food');
		this.food.create(w-30, 0, 'food');
		
		this.scoreText = this.game.add.text(5,3, this.score);
	}
	this.update = function() {
		this.game.physics.arcade.overlap(this.player, this.food, function(player, food) {
			food.kill();
			this.score++;
			this.scoreText.text = this.score;
		}, null, this);

		if(this.score == 4) {
			this.game.state.start('finish');
		}
		if( this.cursor.up.isDown ) {
			this.player.body.velocity.y =- this.speed;
		}
		else if( this.cursor.down.isDown ) {
			this.player.body.velocity.y = this.speed;
		}
		else if( this.cursor.left.isDown ) {
			this.player.body.velocity.x =- this.speed;
		}
		else if( this.cursor.right.isDown ) {
			this.player.body.velocity.x = this.speed;
		}
		else {
			this.player.body.velocity.y = 0;
			this.player.body.velocity.x = 0;
		}
	}
}

function Fin() {
	this.preload = function() {
		this.game.load.spritesheet('restart', 'asset/start_restart_button.png', w, 88, 2, 168);
	}
	this.create = function() {
		this.button = this.game.add.button(0, 50, 'restart');
	}
	this.render = function() {}
}