const startGame = document.getElementById("startgame")
const gameControl = document.getElementById("gamecontrol")
const game = document.getElementById("game")
const score = document.getElementById("score")
const actionArea = document.getElementById("actions")

let gameData = {
  dice: ['assets/images/1.png', 'assets/images/2.png', 'assets/images/3.png', 'assets/images/4.png', 'assets/images/5.png', 'assets/images/6.png'],
  players: ['Player 1', 'Player 2'],
  score: [0, 0],
  roll1: 0,
  roll2: 0,
  rollSum: 0,
  index: 0,
  gameEnd: 29

}

startGame.addEventListener('click', () => {
  gameData.index = Math.round(Math.random())    /*0 o 1, se elige jugador al azar*/
  gameControl.innerHTML = '<h2>The game has started</h2>'
  gameControl.innerHTML += '<button id="quit">Wanna quit?</button>'

  document.getElementById("quit").addEventListener("click", () => {
    location.reload()
  })
  setUpTurn()
})

function setUpTurn() {
  game.innerHTML = `<p>Roll the dice for the <span>${gameData.players[gameData.index]}</span></p>`
  actionArea.innerHTML = '<button id="roll">Roll the dice</button>'
  document.getElementById("roll").addEventListener("click", () => {
    /* console.log("Roll the dice") */
    throwDice()
  })
}

function throwDice() {
  actionArea.innerHTML = ''
  gameData.roll1 = Math.floor(Math.random() * 6) + 1
  gameData.roll2 = Math.floor(Math.random() * 6) + 1
  game.innerHTML = `<p>Roll the dice for the <span>${gameData.players[gameData.index]}</span></p>`
  game.innerHTML += `<img src="${gameData.dice[gameData.roll1 - 1]}">
                          <img src="${gameData.dice[gameData.roll2 - 1]}">`

  gameData.rollSum = gameData.roll1 + gameData.roll2

  if (gameData.rollSum === 2) {
    game.innerHTML += '<p>Snake Eyes!!</p>'
    gameData.score[gameData.index] = 0
    gameData.index ? (gameData.index = 0) : (gameData.index = 1)
    checkWinning()
    setTimeout(setUpTurn, 2000)
  }
  else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
    /* console.log("your turn is over") */
    gameData.index ? (gameData.index = 0) : (gameData.index = 1)
    game.innerHTML += `<p>Sorry, one of your rolls was a one, switching to <span>${gameData.players[gameData.index]}</span></p>`
    setTimeout(setUpTurn, 2000)
  }
  else {
    /* console.log("The game continuos, roll again or pass") */
    gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum
    actionArea.innerHTML = '<button id="rollagain">Roll Again</button> or <button id="pass">Pass</button>'
    document.getElementById("rollagain").addEventListener("click", () => {
      setUpTurn()
    })
    document.getElementById("pass").addEventListener("click", () => {
      gameData.index ? (gameData.index = 0) : (gameData.index = 1)
      /* setUpTurn() al salir los ojos de serpiente no pasa el turno, vuelve a tirar*/
      throwDice()
    })
    checkWinning()
  }
  setTimeout(() => {
    score.scrollIntoView({
    behavior:'smooth', 
    block: 'end'})
  }, 100)
  
}

function checkWinning() {
  if (gameData.score[gameData.index] > gameData.gameEnd) {
    score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`
    actionArea.innerHTML = ''
    document.getElementById("quit").innerHTML = "Start a new game?"
  }
  else {
    /* current score*/
    score.innerHTML = `<p>The score is currently:</p> <p><strong>${gameData.players[0]}: <span>${gameData.score[0]}</span></strong></p>
        <p><strong>${gameData.players[1]}: <span>${gameData.score[1]}</span></strong></p>`
  }
}