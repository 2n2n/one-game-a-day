// Code goes here

function Game() {
  this.options = ['paper', 'scissor', 'rock']
}

Game.prototype.isValid = function(option) {
  var valid = false
  this.options.map(function(val) {
    if (val === option) {
      valid = true
    }
  })
  return valid
}

Game.prototype.computerThink = function() {
  var select = Math.floor(Math.random() * 3);
  console.log(select, 'selected');
  return this.options[select]
}

Game.prototype.fight = function(player, computer) {
  if (player.option > computer.option) {
    if (player.option == 2 && computer.option == 0) {
      return computer
    }
    return player
  }

  if (computer.option > player.option) {
    if (computer.option == 2 && player.option == 0) {
      return player
    }
    return computer
  }

  if (computer.option == player.option) return {
    name: 'tie'
  }

}
Game.prototype.play = function(callback, pl, cp) {
  // check if option is in array 
  // if (!this.isValid(option)) {
  //   return false;
  // }
  // var playerOption = {
  //   name: 'player',
  //   option: this.options.indexOf(option)
  // }
  // var computerOption = {
  //   name: 'computer',
  //   option: this.options.indexOf(this.computerThink())
  // }

  // winner = this.fight(playerOption, computerOption)
  // message = ''
  // message += playerOption.name + ': ' + this.options[playerOption.option] + '<br/>'
  // message += computerOption.name + ': ' + this.options[computerOption.option] + '<br/>'
  // message += 'the winner is ' + winner.name

  // console.log('iner html is', document.getElementById('container'))
  // document.getElementById('container').innerHTML = message
  // if (winner.name == 'player') {
  //   document.getElementsByTagName('body')[0].style.backgroundColor = '#53B153'
  // }
  // if (winner.name == 'computer') {
  //   document.getElementsByTagName('body')[0].style.backgroundColor = '#BF4949'
  // }
  // if (winner.name == 'tie') {
  //   document.getElementsByTagName('body')[0].style.backgroundColor = '#E6B850'
  // }
  // return true;
  return typeof callback === "function" ? callback.call(this,pl, cp): console.log('callback not defined');

}