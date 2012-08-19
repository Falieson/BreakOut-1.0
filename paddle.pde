//////////////////////////////////////////////////////////////////////////////////
// Original Paddle.pde source comes from
// http://stackoverflow.com/questions/10744756/pong-movement-not-smooth
// Processing.js Version-1.4.1
// Forked by FlorianMettetal
//
// Now we are going to make a Break Out game!
// Log of my edits start here:
// 1. Create a score variable and Display the score in the top right of the canvas
// 2. Turn the paddle into a slapper:
// 2.A. Makes the paddle jump when you click
// -> increases speed/power of the ball
//
// Stopped working on this and going to do raw JS instead becasue there's
// a much larger community.
//
// Can still test the game at: ./index-p5.html
//
//////////////////////////////////////////////////////////////////////////////////

// Initializing the Variables \\


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

// Slapper
int slapV; //The velocity that the ball increases by
int slapH; //The height above the paddle that the slapper can reach
boolean slappable = false;


// The Ball
float ballX;
float ballY;
int ballRad;

int speed;
float velX;
float velY;

boolean playing = false;

int score;



// Define the Variables \\
void setup()
{
    border = 5;

    // Paddle Config
    paddleW = 80;
    paddleH = 10;
    slapV = 5;
    slapH = 10;

    // Ball Config
    ballRad = 15;
    speed = 5;
    velX = velY = speed;

    // Canvas Config
    scrBG = #000000;
    bastards = #F0F8FF;
    size(800, 600);
    background(scrBG);
    noStroke();
    noCursor();
    frameRate(30);
    smooth();
}

// This draws everything onto the canvas
void draw()
{
    // draw background, paddle, and ball
    background(bastards);
    drawPaddle();
    drawBall();
    drawScore();
}

void drawScore()
{
    textSize(14);
    text("Your Score:",670,20);
    text(score,780,20);
}

void drawStats()
{
    //Ball speed
    textSize(14);
    text("Speed:",670,40);
    text(speed,760,40);

    //Is it slappable?
    if(slappable)
    {
        textSize(14);
        text("Slappable:",670,56);
        text(slappable,760,56);
    }
}

// Increases the speed and power of the ball
void bumperSlap()
{
    if(slappable)
    {
        speed += slapV;
        textSize(18);
        text("Slapped that ball!",300,50);
    }
    else
    {
        textSize(18);
        text("No ball to Slap!",300,50);
    }

    paddleH += slapH;
    drawPaddle();
    paddleH += -slapH;
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
            gameOver();
        }

        // Is the ball close enough to the paddle to slap?
        // look below for what all the logic does
        if(ballY < (paddleY + slapH) && ballY > paddleY && ballX < (paddleX + paddleW) && ballX > paddleX)
        {
                slappable = true;
        }

        // If the ball is all of the following
        // 1. above the paddle
        // 2. left of the paddle's (0,0) position + paddle's width
        // 3. right of the paddle's (0,0) position
        // Then the ball hit the paddle
        if(ballY > paddleY && ballX < (paddleX + paddleW) && ballX > paddleX)
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
        drawStats();

        // The ball isn't intersecting the paddle or a wall
        slappable = false;
    }

    fill(0); // The color of the ball
    ellipse(ballX, ballY, ballRad*2, ballRad*2); // The shape of the ball

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

void gameOver()
{
    playing = false;
    resetLevel();
    textSize(24);
    text("Game Over",300,50);
}

void mouseClicked()
{
    if(playing)
    {
        bumperSlap();
    }
    else
    {
        startLevel();
        score = 0;
    }
}