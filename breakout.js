/////////////////////////////////////////////////////////////////////////////////
// Original Paddle Ball source comes from
// http://www.devx.com/webdev/10MinuteSolution/27134/1954
// Forked by FlorianMettetal
// Creation Date: 2012 August, 18
//
// Game can be found at: ./index.html
//
// Now we are going to make a Break Out game!
// Log of my edits start here:
// 1. Remove the difficulty attribute
// 2. Add mouse control, remove keyboard, make sure the paddle stops at the wall
// 3. Create start/restart button, changes score area as well
// -> Turn the paddle into a slapper
// -> Makes the paddle jump when you click
// -> increases speed/power of the ball
//////////////////////////////////////////////////////////////////////////////////

//get info, process data, update screen objects
//instance vars
var ball;
var paddle;
var score;
//initial speeds
var ballDx = 6;
var ballDy = 6;
var currentScore = 0;
var timer;

// Ball Position and Dimensions
var ballY = 4;
var ballX = 200;
//var ballRad = 15px;

//Paddle Position and Dimensions
var paddleY = 470;
var paddleX = 228;
var paddleW = 64;
var paddleH = 16;

//Slapper Config
var slapY = 10;

// Board Dimensions
var boardW = 500;
//var boardH = 500;

var playingArea;
window.addEventListener("load", init, false);

function mouseListener(event){
    var x = event.clientX;
    console.log(playingArea.style);
    paddleX = x - 100;
    if (paddleX <= 0){
        paddleX = 0;
    }
    if (paddleX >= boardW -paddleW){
        paddleX = boardW - paddleW;
    }
    paddle.style.left = paddleX + 'px';
}

function reset(){
    ballX = 200;
    ballY = 4;
    ballDx = 6;
    ballDy = 6;
    paddleX = 228;
    paddleW = 64;
    currentScore = 0;
    if( $('#tko').is('*') ){
        $('#tko').remove();
    }
    $('#score').css("background-color","rgb(32,128,64)");
    createPaddle();
}

function init(){
    reset();
    playingArea = document.getElementById('playingArea');
    //instantiate HTML object instance vars

    ball = document.getElementById('ball');

    paddle = document.getElementById('paddle');

    score = document.getElementById('score');
    document.onmousemove = mouseListener;
    document.onclick = slap;
    //start the game loop
    start();
}

function start(){
    //game loop
    detectCollisions();
    render();
    //difficulty(); disabling this function for now
    $('#goButton').removeClass('goActive');
    $('#goButton').addClass('goInactive');
    //end conditions
    if(ballY <= (paddleY) ){
        //still in play - keep the loop going
        timer = setTimeout('start()',50);
    }
    else{
        gameOver();
    }
}

function detectCollisions(){
    //just reflect the ball on a collision
    //a more robust engine could change trajectory of ball based
    //on where the ball hits the paddle
    if(collisionX())
        ballDx *= -1;
    if(collisionY())
        ballDy *= -1;
}

function collisionX(){
    return ballX < 4 || ballX > 480;
}

function collisionY(){
    //check if bill is at top of playing area
    if(ballY < 4){
        return true;
    }

    //check to see if ball collided with paddle
    if(ballY > (paddleY-paddleH)){
        if(ballX > paddleX && ballX < paddleX + 64){
            updateScore();
            return true;
        }
    }
    return false;
}

function render(){
    moveBall();
}

function createPaddle(){
    $('#paddle').css("width",paddleW);
    $('#paddle').css("height",paddleH);
    $('#paddle').css("top",paddleY);

    $('#paddle').css("background-color","darkblue");
}

function slap(){
    paddleY += slapY;
    $('#paddle').css("top",paddleY);
    $('#paddle').css("background-color","lightblue");

    paddleY -= slapY;
    createPaddle();
}

function moveBall(){
    ballX += ballDx;
    ballY += ballDy;
    ball.style.left = ballX;
    ball.style.top = ballY;
}

function updateScore(){
    currentScore += 5;
    score.innerHTML = 'Score: ' + currentScore;
}

function gameOver(){
    //end the game by clearing the timer, modifying the score label
    clearTimeout(timer);
    $('#score').append('<span id="tko">   Game Over</span>');
    //score.style.backgroundColor = 'rgb(128,0,0)';
    $('#score').css("background-color","rgb(128,0,0)");

    $('#goButton').removeClass('goInactive');
    $('#goButton').addClass('goActive');
}

/* disabled this function for now
 function difficulty(){
 //as the game progresses, increase magnitude of the vertical speed
 if(currentScore % 1000 == 0){
 if(ballDy > 0)
 ballDy += 1;
 else
 ballDy -= 1;
 }
 }
 */
