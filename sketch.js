var sword,swordImage,alien,alienImage,bg,bgImage;

var fruitImage1,fruitImage2,fruitImage3,fruitImage4,fruit1,fruit2,
    fruit3,fruit4,bouncer;

var fruitGroup1,fruitGroup2,fruitGroup3,fruitGroup4,sound1;
var alien1,alienImage1,alien2,alienImage2,alienGroup;

var score=0,time=60,life=2,hiscore = 0;

var gameoverImage,gameover,gameoversound,timeover,
    timeoverImage,tic;

var gameState ="play"; 


function preload(){
  
  swordImage = loadImage("sword.png");
  bgImage = loadImage("background.jpg");

  fruitImage1 = loadImage("fruit1.png");
  fruitImage2 = loadImage("fruit2.png");
  fruitImage3 = loadImage("fruit3.png");
  fruitImage4 = loadImage("fruit4.png");

  alienImage1 = loadImage("alien1.png");
  alienImage2 = loadImage("alien2.png"); 
  gameoverImage = loadImage("images.png");
  
  timeoverImage = loadImage("timeover.jpg")

  sound1 = loadSound("Cutting.wav");
  gameoversound = loadSound("gammeover.mp3");
  
  tic = loadSound("checkpoint.mp3")
}


function setup(){
  createCanvas(600,400)
  background("white")
  
  bg = createSprite(300,200);
  bg.addImage(bgImage);
  bg.scale = 2.5;
  
  sword = createSprite(300,200);
  sword.addImage(swordImage);
  sword.scale = 0.5;
  
  fruitGroup1 = new Group();
  fruitGroup2 = new Group();
  fruitGroup3 = new Group();
  fruitGroup4 = new Group();
  alienGroup = new Group();
  
  bouncer = createSprite(200,100,800,5);
  bouncer.visible = false;
  
  gameover = createSprite(300,200)
  gameover.addImage(gameoverImage);
  gameover.visible = false;
  
  timeover = createSprite(300,200);
  timeover.addImage(timeoverImage);
  timeover.visible = false;
}


function draw(){
  background("white");
  
 if(keyDown("r")&&gameState == "over"){
  gameState = "play";
  reset();
 }
  
 if(keyDown("r")&&gameState == "timeover"){
  gameState = "play";
  reset();
 }
  
 if(gameState == "play"){
  
   if(frameCount % 20 === 0 && time>0) {
    time = time-1;
  }
    spawnFruit();
    alien();
    
   if(time == 0){
    gameState ="timeover";
  }
   


   
   
  
  sword.y = mouseY;
  sword.x = mouseX;
    
  gameover.visible = false;
  timeover.visible = false;  
}
     
 if(score>hiscore){
  hiscore = score;
}
  
if(gameState === "play"){
  if(time==50 ||time==40||time==30 ||time==20||time==10){
  tic.play();
  }
}
  
 drawSprites();
 
  if(gameState === "timeover"){
    textSize(25)
    text("press 'r' to restart ",200,350);
    timeover.visible = true;
     
  }
  
  if(gameState === "over"){
    textSize(25);
    text("press 'r' to restart",200,350);
      gameover.visible = true;
 
}
  
 if(life === 0){
    gameState = "over";
  }
 
  fill("orange")
  textSize(25);
  text("Score : "+score,10,20);
  
  fill("orange")
  textSize(25);
  text("Time left : "+time,450,20);
  
  fill("orange")
  textSize(25);
  text("Life left  : "+life,455,50);
  
  fill("orange")
  textSize(25);
  text("Hi Score : "+hiscore,10,50);
}


function spawnFruit(){
 
  if (frameCount % 20 === 0){
   fruit1 = createSprite(Math.round(random(5,590)),400,10,40);
   
    fruit1.addImage(fruitImage1);
    fruit1.velocityY = -(10 + score/3);
    fruit1.scale = 0.2;
    fruit1.lifetime = 60;
    fruitGroup1.add(fruit1);
}  

  fruitGroup1.bounceOff(bouncer);
  
  

 if(sword.isTouching(fruitGroup1) ){
   fruitGroup1.destroyEach();
    sound1.play();
    score+=1;
 } 
  
 if (frameCount % 30 === 0){
   fruit2 = createSprite(Math.round(random(5,590)),400,10,40);
   fruit2.velocityY = -(10 + score/3);
   fruit2.addImage(fruitImage2);
   fruit2.lifetime = 60;
   fruit2.scale = 0.2;
   fruitGroup2.add(fruit2);
}  
 
 fruitGroup2.bounceOff(bouncer);
 
  

 if(sword.isTouching(fruitGroup2) ){
   fruitGroup2.destroyEach();
    sound1.play();
   score+=1;
 } 
  
 if(frameCount % 40 === 0){
   fruit3 = createSprite(Math.round(random(5,590)),400,10,40);
   fruit3.velocityY = -(10 + score/3);
   fruit3.addImage(fruitImage3);
   fruit3.lifetime = 60;
   fruit3.scale = 0.2;
   fruitGroup3.add(fruit3);
}  
 
  fruitGroup3.bounceOff(bouncer);
  


 if(sword.isTouching(fruitGroup3) ){
   fruitGroup3.destroyEach();
   score+=1;
   sound1.play();
 } 
  
 if (frameCount % 50 === 0){
  fruit4 = createSprite(Math.round(random(5,590)),400,10,40);
  fruit4.velocityY = -(10 + score/3);
  fruit4.addImage(fruitImage4);
    
  fruit4.scale = 0.2;
  fruit4.lifetime = 60;
    
  fruitGroup4.add(fruit4);
     
}  
 
  fruitGroup4.bounceOff(bouncer);
  


 if(sword.isTouching(fruitGroup4)){
   fruitGroup4.destroyEach();
   sound1.play();
   score+=1;
 } 
}

function alien(){
 
  if(frameCount %70 === 0){
  alien1= createSprite(Math.round(random(5,590)),400);
  alien1.addImage(alienImage1);
  alien1.velocityY = -(10 + score/3);
  alienGroup.add(alien1);
  
}
  
 if(frameCount %150 === 0){
  alien2= createSprite(Math.round(random(5,590)),400);
  alien2.addImage(alienImage2);
  alien2.velocityY = -(10 + score/3);
  alienGroup.add(alien2);
  
}
  
 if(sword.isTouching(alienGroup)){
  if(life ==1){
    gameoversound.play();  
}
   
   life = life-1;
   alienGroup.destroyEach();
   
}

  alienGroup.bounceOff(bouncer);

}

function reset(){
 life = 2;
 time = 60;
 score = 0;
}