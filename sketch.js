var backImage,backGround;
var player, player_running;
var ground,ground_img;

var bananaGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameState = "play";
var score=0;


function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  player_dead = loadImage("Monkey_04.png");
  

  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  backGround=createSprite(0,0,800,400);
  backGround.addImage(backImage);
  backGround.scale=1.5;
  backGround.x=backGround.width/2;
  backGround.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);

  

  if(gameState === "play"){
    if(ground.x<0) {
      ground.x=ground.width/2;
    }

   

    if(backGround.x<100){
      backGround.x=camera.position.x/2;
    }
    
      if(bananaGroup.isTouching(player)){
        bananaGroup.destroyEach();
      score = score + 2;
      }
      switch(score){
          case 10: player.scale=0.12;
                  break;
          case 20: player.scale=0.14;
                  break;
          case 30: player.scale=0.16;
                  break;
          case 40: player.scale=0.18;
                  break;
          default: break;
      }
    
      if(keyDown("space") && player.y > 200  ) {
        player.velocityY = -12;
      }
      player.velocityY = player.velocityY + 0.8;
    
      player.collide(ground);
      Food();
      Obstacles();
   
  }
  
  
    if(obstaclesGroup.isTouching(player)){ 
        gameState = "end";
        backGround.velocityX = 0;
        player.velocityX = 0;
        bananaGroup.destroyEach();
        obstaclesGroup.destroyEach();
        player.changeAnimation(player_dead);
        textSize(30);
        fill("black")
        text("YOU LOSE",200,400)
    }

   
  console.log(player.y);
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function Food() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    bananaGroup.add(banana);
  }
}

function Obstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  
