var canvas, farm;
var sticks, rocks;
var platform;
var farmer;
var farmSound;

var score = 0;

var gameState = "play";

var obstaclesGroup, obstacle1,obstacle2;

function preload() {
  farmImage = loadImage ("sprites/cartoon-factory.png");
  farmerImage = loadImage("sprites/farmer.png");
  platformImage = loadImage("sprites/wood.png");
  farmSound = loadSound("sprites/farmSound.wav")
}

function setup() {
  createCanvas(1200,800);

  farm = createSprite(500,500);
  farm.addImage("farm", farmImage);
  farm.scale = 1.5;
  
  farmer = createSprite(200,200,50,50);
  farmer.addImage("farmer",farmerImage);
  farmer.scale = 0.08;

  platformsGroup = new Group();
  invisibleBlockGroup = new Group();

  score = 0;

}

function draw() {
  background("white"); 

  // adding score function to show and increase the score
  text("Score : " + score, 600,200);

  // adding sound while the score is 10
  if(score < 10){
    farmSound.play();
  }
   
  if(gameState === "play"){

    //the score increases by the rae of frames
    score = score + Math.round(getFrameRate()/60);

    // the farmer jumps if you press space
    if(keyDown("space")) {
      farmer.velocityY = -10;
    }
    
    // the farmer moves left if you press left arrow key
    if(keyDown("left_arrow")) {
      farmer.x = farmer.x-3;
    }
    
    // the farmer moves right if you press right arrow key
    if(keyDown("right_arrow")) {
      farmer.x = farmer.x+3;
    }
    
    // the farmers speed jumping increases
    farmer.velocityY = farmer.velocityY + 0.8;
    
    // the farm image never disappears due to infinite scrolling background
    if(farmImage.y>400){
      farmImage.y = 300
    }
    
    // function called to spawn the platforms every 100 frames
    spawnPlatform();

    // if platform/ invisible block touches farmer the farmer is stationary
    if(invisibleBlockGroup.isTouching(farmer)){
      farmer.velocityY = 0;
    }

    // if the farmer falls down the game ends
    if(farmer.y>750){
      farmer.destroy();
      gameState = "end";
    }

    drawSprites();
  }
  
  // when the game ends everything disappears and the score stays and it reads the message, "Game Over , Better Luck Next Time"
  if(gameState === "end"){
    textSize(30);
    text("Game Over , Better Luck Next Time",230,250);
    
  }
}


function spawnPlatform (){
    if (frameCount % 100 === 0) {
       var platform = createSprite(200,100,20,10);
       platform.scale = 0.5;
       var invisibleBlock = createSprite(200,100,20,10);

       invisibleBlock.width = platform.width;
       invisibleBlock.height = 2;

       platform.x = Math.round(random(50,450));
       invisibleBlock.x = platform.x;

       platform.addImage("platform", platformImage);

       platform.velocityY = 4;
       invisibleBlock.velocityY = 4;

       //platform.velocityY = -(6 + 2*score/100);
       //invisibleBlock.velocityY = -(6 + 2*score/100);

       platform.depth = farmer.depth;
       platform.depth = platform.depth + 1;

       platform.lifetime = 600;
       invisibleBlock.lifetime = 600;

       platformsGroup.add(platform);   
       invisibleBlockGroup.add(invisibleBlock);      
    }


}