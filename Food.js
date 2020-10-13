class Food {
    constructor(){
        this.foodStock = database.ref('Food');
        this.lastFed = 0;
        this.image = loadImage("food.jpg");
    }

    getFoodStock() {
        this.foodStock = database.ref('Food');
        this.foodStock.on("value", readStock);
    }

    updateFoodStock(x) {
        database.ref('/').update({
            Food : x
          })
    }

    detuctFood() {
        if(foodStock != 0){
            foodStock--;
          }
      }

    bedroom() {
        background(bedroomImg, 550, 500);
    }

    washroom() {
        background(washroomImg, 550, 500);
    }

    garden() {
        background(gardenImg, 550, 500);
    }
    
    display( food) {
        var x = 500, y = 270;

        imageMode(CENTER);

        if( this.foodStock != 0) {

            for(var i = 0; i < food; i++) {
                if(i % 10 == 0) {
                    x = 500;
                    y = y + 50;
                }

                image(this.image, x, y, 50, 50);
                x = x + 50;
            }
        }

    }
	
    
   
}

