var tower,towerImage;
var door,doorImage;
var climber,climberImage;
var ghost,ghost_stand,ghost_jump;
var doorsGroup,climbersGroup;
var invisibleBlock,invisibleBlockGroup;
var gameState = "play";
var spookySound;


function preload(){
  
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghost_stand = loadImage("ghost-standing.png");
  ghost_jump = loadImage("ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
  
}

function setup(){
  createCanvas(600,600);
  
  spookySound.loop();
  
  tower = createSprite(300,300,10,10);
  tower.addImage("tower", towerImage);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300,10,10);
  ghost.addImage("jump",ghost_jump );
  ghost.addImage("stand",ghost_stand);
  ghost.scale = 0.3;
  
  //creating the door,climbers and invisibleBlocks group
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
  
  
}

function draw(){
  background(0);
  
  if(gameState === "play"){
   
   ghost.changeImage("jump"); 
    
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
    gameState  = "end";
    
     
  }
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY  = 0;
    ghost.changeImage("stand");
    
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5;
     
  }
  
  if(keyDown("left")){
    ghost.x = ghost.x -3;
    
  }
  
  if(keyDown("right")){
    ghost.x = ghost.x +3;
    
  }
  
  ghost.velocityY = ghost.velocityY + 0.5;
  
  //reseting the tower
  if(tower.y>500){
    tower.y = 300;  
     
  }
  
  //spawning the door and climbers
  spawnDoor();
  spawnClimber();
    
  drawSprites();

 }
  
  if(gameState === "end"){
    stroke("#10C6D9");
    fill("#10C6D9");
    textSize(70);
    text("GameOver", 130,300);
      
    
  }
  
}

function spawnDoor(){
  
  if(frameCount % 250 === 0){
  door = createSprite(Math.round(random(70,540)),-5,10,10);
  door.addImage("door", doorImage);
  door.velocityY = 1;
  door.lifetime = 800;
  ghost.depth = door.depth;
  ghost.depth = ghost.depth+1;     
  doorsGroup.add(door);
 
  
  }
  
}


function spawnClimber(){
  if(frameCount % 250 === 0){
  climber = createSprite(door.x,50,10,10);
  climber.addImage("climber", climberImage);
  climber.velocityY = 1;
  climber.lifetime = 800;
  climbersGroup.add(climber);
  
  invisibleBlock = createSprite(door.x,50,climber.width,2);
  invisibleBlock.lifetime = 800;
  invisibleBlock.debug = true;
  invisibleBlock.velocityY = 1;
  invisibleBlockGroup.add(invisibleBlock);
  
    
  }
  
}





























