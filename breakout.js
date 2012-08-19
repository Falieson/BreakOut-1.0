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
// -> Create "try again" button
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
var dx = 6;
var dy = 6;
var currentScore = 0;
var timer;
//set initial conditions for ball and paddle
var paddleLeft = 228;
var ballLeft = 200;
var ballTop = 4;

var paddleW = 64;
//var paddleH = 16;

var boardW = 500;

var playingArea;
window.addEventListener("load", init, false);

function init(){
    playingArea = document.getElementById('playingArea');
    //instantiate HTML object instance vars
    ball = document.getElementById('ball');
    paddle = document.getElementById('paddle');
    score = document.getElementById('score');
    document.onmousemove = mouseListener;
    //start the game loop
    start();
}

function mouseListener(event){
    var x = event.clientX;
    console.log(playingArea.style);
    paddleLeft = x - 100;
    paddle.style.left = paddleLeft + 'px';
    if (paddleLeft <= 0){
        paddleLeft = 0;
        paddle.style.left = paddleLeft + 'px';
    }
    if (paddleLeft >= boardW -paddleW){
        paddleLeft = boardW - paddleW;
        paddle.style.left = paddleLeft + 'px';
    }

}

function start(){
    //game loop
    detectCollisions();
    render();
    //difficulty(); disabling this function for now

    //end conditions
    if(ballTop < 470){
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
        dx = dx * -1;
    if(collisionY())
        dy = dy * -1;
}

function collisionX(){
    return ballLeft < 4 || ballLeft > 480;
}

function collisionY(){
    //check if bill is at top of playing area
    if(ballTop < 4)
        return true;
    //check to see if ball collided with paddle
    if(ballTop > 450){
        if(ballLeft > paddleLeft && ballLeft < paddleLeft + 64)
            return true;
    }
    return false;
}

function render(){
    moveBall();
    updateScore();
}

function moveBall(){
    ballLeft += dx;
    ballTop += dy;
    ball.style.left = ballLeft;
    ball.style.top = ballTop;
}

function updateScore(){
    currentScore += 5;
    score.innerHTML = 'Score: ' + currentScore;
}

function gameOver(){
    //end the game by clearing the timer, modifying the score label
    clearTimeout(timer);
    score.innerHTML += "   Game Over";
    score.style.backgroundColor = 'rgb(128,0,0)';
}


/* disabled this function for now
 function difficulty(){
 //as the game progresses, increase magnitude of the vertical speed
 if(currentScore % 1000 == 0){
 if(dy > 0)
 dy += 1;
 else
 dy -= 1;
 }
 }
 */
