var doge;
var bat;
var hurt;
var bat_hit;
var bg;
var bgOver;

var bonk;
var cute;

var gameover = false;

var image_x; 
var image_y;
let xSpeed = 5; // Horizontal speed
let ySpeed = 5; // Vertical speed
var radius = 60;
let isDogeHit = false;

var hitTimer = 40;

var score = 100;
var lastTime = 0;

var sentences = ["Ouch!"];
function preload()
{
    soundFormats('mp3','wav');

    // Load your images here
    doge = loadImage('assets/doge.png');
    bat = loadImage('assets/bat.png');
    hurt = loadImage('assets/hurt.png');
    bat_hit = loadImage('assets/bat_hit.png');
    bg = loadImage('assets/background.png');
    bgOver = loadImage('assets/gameover.png');

    // Load your sounds here    
    bonk = loadSound('assets/bonk.wav');
    bonk.setVolume(5);
    cute = loadSound('assets/cute.wav')
    cute.setLoop(true);
    cute.setVolume(0.2)
}

function setup()
{
    createCanvas(1024, 576);
    alert("Don't kill doge please");

    image_x = width / 2;
    image_y = height / 2;

    cute.play();

}

function draw() {
    if(gameover == false){
      image(bg, 0, 0, 1024, 576);
    }
    else{
      image(bgOver, 0, 0, 1024, 576);
      image_x = -1000;
      image_y = -1000;
    }


    image_x += xSpeed;
    image_y += ySpeed;
  
    imageMode(CENTER);
    if(isDogeHit){
        image(hurt, image_x, image_y, 140, 140);
        imageMode(CORNER);
        image(bat_hit, mouseX - 50, mouseY - 75, 100, 150);

        timer();


        if (score < 0) {
            score = 0; // Limit the score to 0
            gameover = true;
          }
        fill(255);
        for(var i = 0; i < sentences.length; i++){
            fill(255);
            text(sentences[i], width / 2, height /2);
        }

    } else {
        image(doge, image_x, image_y, 130, 130);
        imageMode(CORNER);
        image(bat, mouseX - 50, mouseY - 75, 100, 150);


    }
  
    // DVD logo animation, 65 for half width
    if (image_x + 65 >= width || image_x - 65 <= 0) {
      xSpeed *= -1;
    }
    if (image_y + 65 >= height || image_y - 65 <= 0) {
      ySpeed *= -1;
    }
 
    
    if (millis() - lastTime >= 2500 && score < 100) {
        score++; 
        lastTime = millis();
      }

    textSize(32);
    fill(255, 0, 0);
    textSize(22);
    text(`${score}`, 135, 53);
}

function timer()
{
    hitTimer--;
    if (hitTimer <= 0) {
      // Reset the timer and doge state
      hitTimer = 40;
      isDogeHit = false;
    }
}

function mousePressed()
{
    // for debugging
    console.log(mouseX, mouseY);
  
    if(dist(mouseX, mouseY, image_x, image_y) < radius){
        console.log("HIT");
        isDogeHit = true;
        bonk.play();
        score -= 5;

        //speed 
        xSpeed = xSpeed * 1.08;
        ySpeed = ySpeed * 1.08;

        console.log(xSpeed, ySpeed);
    }
}
