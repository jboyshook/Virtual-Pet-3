//Create variables here
var dog, database, foodS;
var fedTime, lastFed;
var gameState = "Hungry";
var changeState, readState;
var bgImg, dogImage, dogImage2, bedroomImg, washroomImg, gardenImg;
var feed, addfood;
var foodObj;

function preload(){
  bgImg = loadImage("bg.jpg");
  dogImage = loadImage("dogImg.png");
  dogImage2 = loadImage("dogImg1.png");
  bedroomImg = loadImage("Bed Room.png");
  washroomImg = loadImage("Wash Room.png");
  gardenImg = loadImage("Garden.png");
}

function setup() {
  database = firebase.database();

  createCanvas(1000, 500);

  
  dog = createSprite(250, 350, 10, 10);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  feed = createButton("Feed the dog");
  feed.position(650, 95);
  feed.mousePressed(feedDog);

  addfood = createButton("Add food");
  addfood.position(750, 95);
  addfood.mousePressed(addFood);

   foodObj = new Food();

   fedTime = database.ref('FeedTime');
   fedTime.on("value", function(data){
     lastFed = data.val();
   })

   
}


function draw() {  
  background(bgImg);

  readState = database.ref('gameState');
   readState.on("value", function(data){
      gameState = data.val();
   })

  foodObj.getFoodStock();
  
  strokeWeight(3);
  stroke(random(0, 255), random(0, 255), random(0, 255));
  textSize(20);
  textFont("Showcard Gothic Regular");
  fill("white");
  text("Food Remaining : " + foodS, 150,150);
  text("Drago is feeling hungry. Could you feed him ?", 50, 475);
  

  if(gameState != "Hungry") {
    feed.hide();
    addfood.hide();
    dog.remove();
  }else {
    feed.show();
    addfood.show();
  }

  currentTime = hour();
   if(currentTime == (lastFed + 1)){
    update("Playing");
    foodObj.garden();

    text("Drago is having fun in the garden !", 200, 100);

    if(currentTime > 12){
      text("Current Time : " + currentTime%12 + " P.M", 500, 30);
    }else if(currentTime == 0){
      text("Current Time : 12 A.M", 500, 30);
    }else{
      text("Current Time : " + currentTime +  " A.M", 500, 30);
    }
  }else if(currentTime == (lastFed + 2)){
    update("Sleeping");
    foodObj.bedroom();

    text("Drago looks like he's taking a short nap.", 200, 100);

    if(currentTime > 12){
      text("Current Time : " + currentTime%12 + " P.M", 500, 30);
    }else if(currentTime == 0){
      text("Current Time : 12 A.M", 500, 30);
    }else{
      text("Current Time : " + currentTime +  " A.M", 500, 30);
    }
  }else if(currentTime > (lastFed + 2) && currentTime <= (lastFed + 4 )){
    update("Bathing");
    foodObj.washroom();

    text("Drago is making sure he is clean and healthy.", 200, 100);

    if(currentTime > 12){
      text("Current Time : " + currentTime%12 + " P.M", 500, 30);
    }else if(currentTime == 0){
      text("Current Time : 12 A.M", 500, 30);
    }else{
      text("Current Time : " + currentTime +  " A.M", 500, 30);
    }
  }else{
    update("Hungry");
    foodObj.display(foodS);
  }

  if(lastFed > 12){
    text(" Last Fed : " + lastFed%12 + " P.M", 300, 30);
  }else if(lastFed == 0){
    text("Last Fed : 12 A.M", 300, 30);
  }else{
    text("Last Fed : " + lastFed +  " A.M", 300, 30);
  }
  
  drawSprites();
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if(x <= 0) {
    x = 0;
  }
  else
  {
    x = x - 1;
  }

  database.ref('/').update({
    Food : x
  })
}

function feedDog() {
  dog.addImage(dogImage2);

  foodObj.updateFoodStock(foodS - 1);
  database.ref('/').update({
      FeedTime : hour()
  })
}

function addFood() {
    foodS++;
    database.ref('/').update({
        Food : foodS
    })
}

function update(state) {
  database.ref('/').update({
    gameState : state
  })
}



