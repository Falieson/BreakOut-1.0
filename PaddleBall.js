/////////////////////////////////////////////////////////////////////////////
// Based on KhanAcademy's Paddle Ball
// http://www.khanacademy.org/cs/paddle-ball-with-scoresimplified/968999128
//
// Forked by Florian Mettetal
// August 17th, 2012
/////////////////////////////////////////////////////////////////////////////
noStroke();
var score = 0;

var paddleWidth = 100;

// the speed of the ball when it first leaves the paddle
var initialSpeedX = 5;
var initialSpeedY = -6;

// the current speed of the ball
var ballSpeedX = initialSpeedX;
var ballSpeedY = initialSpeedY;

// the current location of the ball
var ballX = 0;
var ballY = 0;

// true if ball is moving, false if ball is attached to paddle
var ballMoving = false;

var draw = function() {
    background(0, 108, 135);
    fill(15, 15, 15);
    //shows score
    textSize(100);
    text(score,175,100);
    // draw the paddle
    fill(240, 126, 65);
    rect(mouseX - paddleWidth/2, 350, paddleWidth, 10);

    // move the ball
    if (ballMoving) {
        ballX += ballSpeedX;
        ballY += ballSpeedY;
    }
    else {
        ballX = mouseX;
        ballY = 340;
    }

    // draw the ball
    fill(255, 234, 0);
    ellipse(ballX, ballY, 20, 20);

    // check if ball has hit the top wall
    if (ballY <= 10) {
        ballSpeedY = -ballSpeedY;
        score += 1;
    }
    // check if the ball has hit the left wall
    if (ballX <= 10) {
        ballSpeedX = -ballSpeedX;
    }
    // check if the ball has hit the right wall
    if (ballX >= 390) {
        ballSpeedX = -ballSpeedX;
    }
    // check if the ball has hit the paddle
    if (ballY >= 340 && ballY < 346 && ballX >= mouseX - paddleWidth/2 && ballX <= mouseX + paddleWidth/2) {
        ballSpeedY = -ballSpeedY;
    }
    // check if ball fell out the bottom
    if (ballY >= 400) {
        ballMoving = false;
        score = 0;
    }
};

// this function gets called automatically
// when the mouse is clicked
var mouseClicked = function() {
    if (!ballMoving) {
        // reset the ball speed
        ballSpeedX = initialSpeedX;
        ballSpeedY = initialSpeedY;

        ballMoving = true;
    }
};