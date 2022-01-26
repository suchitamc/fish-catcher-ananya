class Fishrod{

    constructor(x,y,width,height,rodangle){
        var options={
            isStatic: true,
            frictionAir: 0.5

        }
        this.body = Bodies.rectangle(x,y,width,height,options);
        this.width = width;
        this.height = height;
        this.rodangle = rodangle;
        //this.image = loadImage("rod.png");
        World.add(world,this.body);
        Matter.Body.setAngle(this.body,PI/6);

    }

    remove(){
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, { x: 0, y: 10 });
        setTimeout(() => {
            
            Matter.World.remove(world, this.body);
           
          }, 500);

    }


    display(){

        var pos = this.body.position;
        var angle = this.body.angle;

        if(gameState!=="end"){
        if(keyIsDown(DOWN_ARROW) && angle<1.0){
            angle+=0.01;
            Matter.Body.setAngle(this.body,angle);
            //console.log(this.body.angle);
        }
        if(keyIsDown(UP_ARROW) && angle>0.7){
            angle -=0.01;
            Matter.Body.setAngle(this.body,angle);
        }
        if(keyIsDown(RIGHT_ARROW) && this.body.position.x<420){
            this.body.position.x +=5;
            this.body.position.y +=5;
        }
        if(keyIsDown(LEFT_ARROW) && this.body.position.x>415){
            this.body.position.x -=5;
            this.body.position.y -=5;
        }

        push();
        translate(pos.x,pos.y);
        rotate(angle);
        //fill("brown");
        //rectMode(CENTER);
        imageMode(CENTER);
        image(image1,0,0,this.width,this.height);
        pop();
    }
    }

    }
    

