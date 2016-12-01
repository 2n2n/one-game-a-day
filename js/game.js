var w = 480;
var h = 320;

var game = new Phaser.Game(w,h, Phaser.AUTO, 'game');
game.state.add('game', new Started);
game.state.add('finish', new Fin);
game.state.add('color', new Inherit);
game.state.add('rps', new RockPaperScissor);
game.state.start('rps');

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
			// if(this.player.key !== 'food')
			// {
			// 	this.player.loadTexture('food');
			// }
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
		restart = function() {
			this.game.state.start('rps');
		}
		this.button = this.game.add.button(0, 50, 'restart', restart, this);
	}
	this.render = function() {}
}

function Inherit() {
	this.create = function() {
		this.game.backgroundColor = "#fff";

		var skel = this.game.make.graphics(0,0);
		skel.beginFill(0xa9a904);
		skel.lineStyle(1, 0xa9a904, 1);
		skel.moveTo(0, 0);
	    skel.lineTo(0, 10);
	    skel.lineTo(10, 10);
	    skel.endFill();
	    // skel.lineTo(1700, 2000);

		this.hero = this.game.make.sprite(0,0, skel.generateTexture());
	}
	this.update = function() {}
	this.render = function() {}
}

function RockPaperScissor() {
	this.preload = function() {
		this.game.load.image('rock', 'asset/rock.png');
		this.game.load.image('paper', 'asset/paper.png');
		this.game.load.image('scissor', 'asset/scissor.png');
		this.game.load.image('fightbtn', 'asset/fight.png');
	}

	this.fightDone = false;
	this.create = function() {
		this.player = this.game.add.sprite(25,0,'rock');
		this.player.scale.setTo(0.05,0.05);

		this.computer = this.game.add.sprite(w-100, 0,'rock');
		this.computer.scale.setTo(0.05,0.05);

		var fight = function() {
			var g = new Game;
			var state = this;
			g.play(function(player, computer) {
				var computerPick = this.computerThink();
				computer.key = computerPick;
				computer.loadTexture(computerPick);

				var pick = this.computerThink();
				player.key == pick;
				player.loadTexture(pick);
				
				var pl = {
					name: 'player',
					option:  g.options.indexOf(player.key)
				};
				var pc = {
					name: 'computer',
					option: g.options.indexOf(computer.key)
				}

				if(g.fight(pl, pc).name == "player") {
					console.log('player win');
					state.fightDone = true;
				}
				


			}, this.player, this.computer);
		}
		this.playbutton = this.game.add.button(130, h-200, 'fightbtn', fight, this);
	}
	this.update = function() {
		if(this.fightDone) {
			this.state.start('game');
			this.fightDone = false;
		}
	}
	this.render = function() {}
} 