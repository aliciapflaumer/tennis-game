let canvas
let canvasContext
let ballX = 50
let ballY = 50
let ballSpeedX = 10
let ballSpeedY = 4

let player1Score = 0
let player2Score = 0
const winning_score = 3

let showingWinScreen = false

let paddle1Y = 250
let paddle2Y = 250
const paddle_height = 100
const paddle_width = 20

function calculateMousePos(evt) {
  let rect = canvas.getBoundingClientRect()
  let root = document.documentElement
  let mouseX = evt.clientX - rect.left - root.scrollLeft
  let mouseY = evt.clientY - rect.top - root.scrollTop
  return {
    x:mouseX,
    y:mouseY
  }
}

function handleMouseClick(evt) {
  if (showingWinScreen) {
        player1Score = 0
        player2Score = 0
        showingWinScreen = false
      }
}

canvas = document.getElementById('gameCanvas')
canvasContext = canvas.getContext('2d')

let framesPerSecond = 30
setInterval(function() {
  draw()
  move()
}, 1000/framesPerSecond)

canvas.addEventListener('mousedown', handleMouseClick)

canvas.addEventListener('mousemove',
  function(evt) {
    let mousePos = calculateMousePos(evt)
    paddle1Y = mousePos.y-(paddle_height/-2)
  })

function ballReset() {
if (player1Score >= winning_score ||
    player2Score >= winning_score) {
      showingWinScreen = true
    }

  ballSpeedX = -ballSpeedX
  ballX = canvas.width/2
  ballY = canvas.height/2
}

function computerMovement(){
  let paddle2YCenter = paddle2Y + (paddle_height/2)
  if(paddle2YCenter < ballY-35) {
    paddle2Y += 6
  } else if(paddle2YCenter > ballY+35){
    paddle2Y -= 6
  }
}

function move() {
if (showingWinScreen) {
  return
}
  computerMovement()

  ballX = ballX + ballSpeedX
  ballY = ballY + ballSpeedY

  if(ballX < 0) {
    if(ballY > paddle1Y &&
      ballY < paddle1Y+paddle_height) {
        ballSpeedX = -ballSpeedX

        let deltaY = ballY
            -(paddle1Y+paddle_height/2)
        ballSpeedY = deltaY * 0.35
      } else {
        player2Score += 1 // must be before ballReset()
        ballReset()
      }
  }
  if(ballX > canvas.width) {
    if(ballY > paddle2Y &&
      ballY < paddle2Y+paddle_height) {
        ballSpeedX = -ballSpeedX

        let deltaY = ballY
            -(paddle2Y+paddle_height/2)
        ballSpeedY = deltaY * 0.35

      } else {
        player1Score += 1
        ballReset()
      }
  }
  if(ballY < 0) {
    ballSpeedY = -ballSpeedY
  }
  if(ballY > canvas.height) {
    ballSpeedY = -ballSpeedY
  }
}

function drawNet() {
  for(var i=0; i < canvas.height; i += 40) {
    colorRect(canvas.width/2-1,i,2,20,'#fff')
  }
}

function draw() {
  // background
  colorRect(0,0,canvas.width,canvas.height, '#000')
  if (showingWinScreen) {
    canvasContext.fillStyle = "white"

    if (player1Score >= winning_score) {
        canvasContext.fillText("You won!", 350, 200)
    } else if(player2Score >= winning_score) {
        canvasContext.fillText("Computer wins", 350, 200)
    }

    canvasContext.fillText("click to continue", 350, 500)
    return
  }

  drawNet()
  // left paddle for player
  canvasContext.fillStyle = '#fff'
  canvasContext.fillRect(0,paddle1Y,paddle_width,paddle_height)
  // right paddle for computer
  canvasContext.fillStyle = '#fff'
  canvasContext.fillRect(canvas.width-20,paddle2Y,paddle_width,paddle_height)
  // ball
  canvasContext.fillStyle = '#993299'
  canvasContext.beginPath()
  canvasContext.arc(ballX, ballY, 10, 0, Math.PI*2, true)
  canvasContext.fill()

  canvasContext.fillText(player1Score, 100, 100)
  canvasContext.fillText(player2Score, 700, 100)
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor
  canvasContext.fillRect(leftX, topY, width, height)
}
