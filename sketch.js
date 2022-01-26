const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var bullet;
var bullets=[] 
var gfish = [];
var shark = [];
var boat, string, bgImg, rod, string1, string3, rod1, gun1, fishImg;
var rodB, gunB, gunB1, rodB1, pos, image1, houqe;
var fish, form;
var seaSound, shootingSound, scream, feedBack, ok;
var visiblity = 255;
var score;
var gameState ="start";

function preload(){

    bgImg = loadImage("assets/bg.gif");
    fishImg = loadImage("assets/goldfish.png");
    gun1 = loadImage("assets/gun.png");
    rod1 = loadImage("assets/net.png");
    scream = loadSound("assets/scream.mp3");
    seaSound = loadSound("assets/sea.mp3");
    shootingSound = loadSound("assets/shoot.mp3");

}

function setup(){
  
    createCanvas(1200,600);

    engine = Engine.create();
    world = engine.world;
    
   // hook = Bodies.rectangle(490,500,10,10,{isStatic:true});
   // World.add(world,hook);
    
    boat = new Boat(150,350,500,70);
   // bullet.push(new Bullet(300,115));
    gfish.push(new Seaf(1200, 420));
    rod= new Fishrod(400,410,200,100,boat.angle);
    net = new Fishrod(400,410,200,100,boat.angle);
    gun = new Fishrod(400,330,200,100,boat.angle)
    string = new Slingshot(boat.body,{x:0,y:0},{x:150,y:350});
    shark.push(new Shark(1200 , 480));
    houqe = new Bullet(400,330);
  
    form = new Form();

    image1 = rod1;
    rod=net;

    score = 0;
    fish = 0;

    
 
    
}

function draw(){

    background(255);

    Engine.update(engine);

    if(gameState==="start"){

        form.display();
        
    }


   if(gameState==="play"){

    background(bgImg);
    
    boat.display();
    rod.display();
    spawnFish();

    for(var i=0;i<gfish.length;i++){
        if(gfish[i] !==undefined && image1 === rod1){
            var collision = Matter.SAT.collides(rod.body,gfish[i].body);

           if(collision.collided){
            
            fish ++;
            Matter.World.remove(world,gfish[i].body);
            gfish.splice(1,i);
            i--;
                      
             }
        }
    }

    for(var i=0;i<shark.length;i++){
        if(shark[i] !==undefined && image1 === rod1){
            var collision = Matter.SAT.collides(rod.body,shark[i].body);

           if(collision.collided){
            Matter.Body.setStatic(rod.body, false);
            Matter.Body.setVelocity(rod.body, { x: 0, y: 10 });
            setTimeout(() => {
                
                rod.remove();
            gameState = "end";
              }, 2000);
            
            
                      
             }
        }
    }

    for (var i = 0; i < bullets.length; i++) {
       bullets[i].display();
        for (var j = 0; j < shark.length; j++) {
          if (bullets[i] !== undefined && shark[j] !== undefined) {
            var collision = Matter.SAT.collides(bullets[i].body, shark[j].body);
            if (collision.collided) {
                score += 5;
                shark[j].remove(j);
                j--;
            
              Matter.World.remove(world, bullets[i].body);
              bullets.splice(i, 1);
              i--;
            }
        }
        else if(boat !== undefined && shark[j] !== undefined){
            
            var collision1 = Matter.SAT.collides(boat.body,shark[i].body);
            if(collision1.collided){
                string.fly();
            }
            

        }
    }
}
    
   // houqe.display();

  /*  if (mouseX > 1124 && mouseX < 1140 && mouseY > 60 && mouseY < 80) {
        robB= true;
        image1 = rod1;
        
    } else if(mouseX > 1124 && mouseX < 1140 && mouseY > 80 && mouseY < 110){
       gunB=true;
       image1 = gun1;
} else {
    rodB = false;
		        gunB = false;
    };
*/

    if(boat.body.position.y>550){
        
        gameState = "end";
        scream.play();
       // feedBack = createInput("FEEDBACK");
        //feedBack.position(500,350);

    }

   }
   

    if(gameState==="end"){

        background(bgImg);
        scream.stop();
        gfish = [];
        shark = [];
        gameOver();
/*
        push();
        fill("red");
        strokeWeight(2);
        stroke(0);
        textSize(30);
        text("THANKS FOR PLAYING !!!",430,300);*/
       // pop();
/*
        ok = createButton('OK');
        ok.position(700,360);
        ok.style('background','skyblue');

       // if(mouseX>499 && mouseX<540 && mouseY>359 && mouseY<369){
           
            if(mouseX>499 && mouseX <730 && mouseY> 350 && mouseY<400){
                //feedBack.hide();
                textSize(20);
                fill("green");
                text("THANKS FOR YOUR KIND FEEDBACK",450,450);              
            }
        //}*/
    }

    push();
    fill(0);
    textSize(20);
    text("Score: "+score,1080,50);
    text("Fish: "+fish,10,50);
    pop();

    

    
} 



function spawnFish(){
if(gameState!=="end"){
    
    if(gfish.length>0 && frameCount%100 ===0){
        gfish.push(new Seaf(1200,random(450,600)));
    }

    if(shark.length>0 && frameCount%400===0){
        shark.push(new Shark(1200, random(450,600)));
    }

    
        for(var i = 0; i<shark.length; i++){
            Matter.Body.setVelocity(shark[i].body,{x:-5,y:0});
            shark[i].display();
        }

    
    

    for(var i =0; i<gfish.length;i++){
        Matter.Body.setVelocity(gfish[i].body,{x:-5,y:0});
        gfish[i].display();
    }
/*
        if(image1===rod1){

          var collision = Matter.SAT.collides(rod.body,gfish[i].body);

           if(collision.collided){
            score = score +5;
            fish = fish+1;
            Matter.World.remove(world,gfish[i].body);
            gfish.splice(1,i);
            i--;
                      
             }
    }
}*/
    
    
  

         
    


}
}  
  
function changeToRod(){
    robB= true;
    image1 = rod1;
    rod = net;
}

function changeToGun(){
    gunB=true;
    image1 = gun1;
    rod= gun;
}

function keyReleased() {
    if (keyCode === 32 && image1===gun1) {
        shootingSound.play();
      bullets[bullets.length - 1].shoot();
    }
  }

  function keyPressed() {
    if (keyCode === 32) {
      var bullet = new Bullet(rod.body.position.x, rod.body.position.y);
      console.log(bullet)
      bullets.push(bullet);
    }
  }


  function gameOver() {
    swal(
      {
        title: `Game Over!!!`,
        text: "Thanks for playing!!",
        
        confirmButtonText: "Play Again"
      },
      function(isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
    );
  }