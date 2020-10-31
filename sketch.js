
var trex, trex_running, trex_collided,restart,restartImage;
var ground, invisibleGround, groundImage,gameOV,gameImage,jumpSound,crashingSound,scoreSound;
var Obstacles;
var cloud, cloudsGroup, cloudImage;
var O1,O2,O3,O4,O5,O6;
var score=0;
var cloudsGroup,obstaclesGroup;

var newImage;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var message = "Ritvik is doing great in his coding classes";

function preload(){
 trex_running =        loadAnimation("trex1.png","trex3.png","trex4.png");
 trex_collided = loadAnimation("trex_collided.png");
 restartImage = loadImage("restart.png");
 jumpSound = loadSound("jump.mp3");
 scoreSound = loadSound("checkPoint.mp3");
 crashingSound = loadSound("die.mp3");
 gameImage = loadImage("gameOver.png");
 groundImage = loadImage("ground2.png");
 cloudImage = loadImage("cloud.png");
  O1 = loadImage("obstacle1.png");
  O2 = loadImage("obstacle2.png");
  O3 = loadImage("obstacle3.png");
  O4 = loadImage("obstacle4.png");
  O5 = loadImage("obstacle5.png");
  O6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  // sprites created
  
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  restart = createSprite(300,100)
  restart.addImage("restart",restartImage);
  restart.scale = 0.5;
  
  gameOV = createSprite(300,70)
  gameOV.addImage("gameOV",gameImage);
  gameOV.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = createGroup();
  obstaclesGroup = createGroup();
  
  trex.debug = true;
  trex.setCollider("circle",0,0,40);
  
  
}

function draw() {
  // background colored black
  background("black");
  
  //console.log(gameState)
  console.log(message);
  //scre displayed
  text("🥇score:" + score ,400,20);
  // game state play
  if(gameState === PLAY){
     
    restart.visible = false
    gameOV.visible = false
    ground.velocityX = -3;
    score = score +Math.round( getFrameRate()/60 );
     //condition for the game state end of the trex
    if(obstaclesGroup.isTouching(trex)){
     gameState = END
     crashingSound.play()
    }
   // trex jumping
    if(keyDown("space") && trex.y>=161) {
    trex.velocityY = -10;
    jumpSound.play()
    }
    //gravity to trex
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
    ground.x = ground.width/2;
   }
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    if(score%100===0){
       
       scoreSound.play()
       }
  
  }
  
  else if(gameState === END){
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)     
    
    ground.velocityX = 0;
    restart.visible = true
    
    gameOV.visible = true
    trex.changeAnimation("collided",trex_collided)
    
    obstaclesGroup.setVelocityXEach (0)
    cloudsGroup.setVelocityXEach (0)
    
    trex.velocityY = 0;
   //reset the game
    if(mousePressedOver(restart)){
      
      reset();
      
    }
  }
  trex.collide(invisibleGround);
  
 
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
     
    cloud.lifetime = 200; 
    cloudsGroup.add(cloud);
    }
}

function spawnObstacles(){
  if (frameCount % 60 ===0){
Obstacles=createSprite(600,170,10,40)
    Obstacles.velocityX = -(6+score/100)
var rand = Math.round (random(1,6))
  switch(rand) {
  case 1:Obstacles.addImage ("O1",O1)
  break;
  case 2:Obstacles.addImage ("O2",O2)
  break;
  case 3:Obstacles.addImage("O3",O3)
  break;
  case 4: Obstacles.addImage("O4",O4)
  break; 
  case 5: Obstacles.addImage("O5",O5)
  break; 
  case 6: Obstacles.addImage("O6",O6)
  break; 
  default:
  }
    Obstacles.scale = 0.4
    Obstacles.lifetime = 200
    obstaclesGroup.add(Obstacles);
}

}

function reset(){
  
  gameState=PLAY
  
  cloudsGroup.destroyEach()
    obstaclesGroup.destroyEach()
  trex.changeAnimation("running", trex_running)
  score = 0
}
