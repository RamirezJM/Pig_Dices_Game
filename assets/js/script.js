 const startGame = document.getElementById("startgame")
    const gameControl = document.getElementById("gamecontrol")
    const game = document.getElementById("game")
    const score = document.getElementById("score")
    const actionArea = document.getElementById("actions")

    let gameData = {
      dice: ['1die.jpg','2die.jpg', '3die.jpg', '4die.jpg', '5die.jpg', '6die.jpg'],
      players: ['player 1','player 2' ],
      score: [0,0],
      roll1: 0,
      roll2: 0,
      rollSum: 0,
      index: 0,
      gameEnd: 29

    }

    startGame.addEventListener('click', ()=>{
      /*-------*/
      gameData.index = Math.round(Math.random())/*0 o 1, se elige jugador al azar*/
      gameControl.innerHTML = '<h2>The game has started</h2>'
      gameControl.innerHTML += '<button id="quit">Wanna quit?</button>'

      document.getElementById("quit").addEventListener("click", () => {
        location.reload()
      })
     /*  console.log('set up the turn!')
      console.log(gameData.index) */
      setUpTurn()
    })

    function setUpTurn(){
      game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`
      actionArea.innerHTML = '<button id="roll">Roll the dice</button>'
      document.getElementById("roll").addEventListener("click", ()=> {
        /* console.log("Roll the dice") */
      throwDice()
      })      

    }

    function throwDice(){
      actionArea.innerHTML = ''
      gameData.roll1 = Math.floor(Math.random() * 6) +1
      gameData.roll2 = Math.floor(Math.random() * 6) +1
      game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`
      game.innerHTML += `<img src="${gameData.dice[gameData.roll1 - 1]}">
                          <img src="${gameData.dice[gameData.roll2 - 1]}">`
                          
      gameData.rollSum = gameData.roll1 + gameData.roll2

      if(gameData.rollSum ===2){
       /*  console.log("snake eyes!") */
       game.innerHTML += '<p>Snake Eyes!!</p>'
       gameData.score[gameData.index] = 0
       gameData.index ? (gameData.index = 0): (gameData.index = 1)
       checkWinning()
       setTimeout(setUpTurn, 2000)
       
      }
      else if(gameData.roll1 === 1 || gameData.roll2 === 1){
        /* console.log("your turn is over") */
        gameData.index ? (gameData.index = 0): (gameData.index = 1)
        game.innerHTML += `<p>Sorry, one of your rolls was a one, switching to ${gameData.players[gameData.index]}</p>`
        setTimeout(setUpTurn, 2000)
      }
      else{
        /* console.log("The game continuos, roll again or pass") */
        gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum
        actionArea.innerHTML = '<button id="rollagain">Roll Again</button> or <button id="pass">Pass</button>'
        document.getElementById("rollagain").addEventListener("click", () =>{
          setUpTurn()
        })
        document.getElementById("pass").addEventListener("click", ()=>{
          gameData.index ? (gameData.index = 0): (gameData.index = 1)
          /* setUpTurn() al salir los ojos de serpiente no pasa el turno, vuelvea tirar*/
          throwDice()
        })
        checkWinning()
      }

    } 

    function checkWinning(){
      if(gameData.score[gameData.index] > gameData.gameEnd){
        score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`
        actionArea.innerHTML = ''
        document.getElementById("quit").innerHTML = "Start a new game?" 
      }
      else{
        /* current score*/
        score.innerHTML = `<p>The score is currently <strong>${gameData.players[0]}: ${gameData.score[0]}</strong> and <strong>${gameData.players[1]}: ${gameData.score[1]}</strong> </p>`
      }
    }