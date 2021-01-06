
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup
var score
var survivaltime

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 200);

  monkey = createSprite(50,160,20,50);
monkey.addAnimation("running",monkey_running);
  
  monkey.scale = 0.1;
  
  ground = createSprite(200,180,500,5)
  ground.velocityX=-4;
   ground.x = ground.width /2;
  
  console.log(monkey.y);
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  
  survivaltime=0;
  score=0;
  
 FoodGroup = createGroup();
  obstaclesGroup = createGroup();
}


function draw() {
  background("white")
   

   
  if(ground.x < 0) 
  {
    ground.x=ground.width/2;
  }
  

  
  
  if(obstaclesGroup.isTouching(monkey))
  {
    score = score ;
   
    ground.velocityX = 0;
    monkey.velocityY = 0;
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
    
  }
  
  if(FoodGroup.isTouching(monkey))
  {
    FoodGroup.destroyEach();
    score = score + 2;
  }

    if(keyDown("space") && monkey.y >= 160 ) 
    {
      monkey.velocityY = -12;
      
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide( invisibleGround);   
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: "+ score, 450,50);        

  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
}

function spawnFood (){
    if (frameCount % 80 === 0) 
  {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount % 300 === 0){
   var obstacle = createSprite(800,430,10,40);
obstacle.addImage(obstacleImage);
   obstacle.velocityX = -6
     obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
     obstaclesGroup.add(obstacle);
  }
}
