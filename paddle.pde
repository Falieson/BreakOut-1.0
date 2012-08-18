/////////////////////////////////////////////////////////////////////////////
// Original Paddle.pde source comes from
// http://stackoverflow.com/questions/10744756/pong-movement-not-smooth
// Processing.js Version-1.4.1
// Forked by FlorianMettetal
//
// Now we are going to make a Break Out game!
// Log of my edits start here:
// 1. Create a score variable
// -> Display the score in the top right of the canvas
/////////////////////////////////////////////////////////////////////////////

// First, we Initializing some variables \\


// Colorset
color scrBG;
color bastards;

// Border for the Paddle
int border;

// The Paddle
int paddleW;
int paddleH;
float paddleX;
float paddleY;

// The Ball
float ballX;
float ballY;
int ballRad;

int speed;
float velX;
float velY;

boolean playing = false;

int score;


// This defines the variables \\
void setup()
{
    border = 5;

    scrBG = #000000;
    bastards = #F0F8FF;

    paddleW = 80;
    paddleH = 10;
    ballRad = 15;
    speed = 5;
    velX = velY = speed;

    size(800, 600);
    background(scrBG);
    noStroke();
    noCursor();
    frameRate(30);
    smooth();

    score = 0;
}

// This draws everything onto the canvas
void draw()
{
    // shows score
    font = loadFont
    textSize(14);
    text(score,700,50);

    // draw background, paddle, and ball
    background(bastards);
    drawPaddle();
    drawBall();
}

// This draws the ball
void drawBall()
{

    if(!playing)
    {
        ballX = paddleX+paddleW/2;
        ballY = height-border-paddleH-ballRad/2-2;
    }
    else
    {
        // The ball has fallen below the paddle
        if(ballY > height)
        {
            ballOut();
        }

        // If the ball is all of the following
        // 1. above the paddle
        // 2. left of the paddle's (0,0) position + paddle's width
        // 3. right of the paddle's (0,0) position
        // Then the ball hit the paddle
        if(ballY > paddleY && ballX < paddleX + paddleW && ballX > paddleX)
        {
            velY = -velY;
            ballY = paddleY-ballRad-1;

            score += 1;  //increases the score by 1 point
        }

        // If the ball's (0,0) is less then the Ball's Radius
        // The ball hit the LEFT wall
        if(ballX < ballRad)
        {
            velX = -velX;
            ballX = ballRad+1;
        }

        // If the ball's (0,0) is
        // Greater then the Canvas Width - Ball's Radius
        // The ball hit the RIGHT wall
        if(ballX > width-ballRad)
        {
            velX = -velX;
            ballX = width-ballRad-1;
        }

        // If the ball's (0,0) is
        // Greater then the Canvas Width - Ball's Radius
        // The ball hit the TOP wall
        if(ballY < ballRad)
        {
            velY = -velY;
            ballY = ballRad+1;
        }

        // Changes the ball's position every iteration
        ballY += velY;
        ballX += velX;
    }

    fill(0);
    // The shape of the ball
    ellipse(ballX, ballY, ballRad*2, ballRad*2);

}

void drawPaddle()
{
    paddleX = constrain(mouseX, border, width-paddleW-border);
    paddleY = height-paddleH-border;

    fill(0);
    rect(paddleX, paddleY, paddleW, paddleH);
}

void startLevel()
{
    playing = true;
}

void resetLevel()
{
    playing = false;
}

void ballOut()
{
    playing = false;
}

void mouseClicked()
{
    if(playing)
    {
        resetLevel();
    }
    else
    {
        startLevel();
    }
}