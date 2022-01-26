class Bullet{
    constructor(x,y){
      var  options={
        isStatic:true,
       // restitution: 0.8,
        friction: 0.5,
        density: 1.5,    
        }
        this.body = Bodies.circle(x,y,30,options);
        this.r = 30;
        this.speed = 0.05;
        World.add(world,this.body);
        Matter.Body.setAngle(this.body,PI/6);
    }

    shoot(){

       var newAngle = rod.body.angle - 0.5
    var velocity = p5.Vector.fromAngle(newAngle);
    velocity.mult(5);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, { x: velocity.x, y: velocity.y });
      // Matter.Body.setStatic(bullet.body,false);
        //Matter.Body.setVelocity(bullet.body,{x:5,y:2});
    }

    display(){

        var pos = this.body.position;
        
       //this.body.angle = rod.body.angle;
        var angle = this.body.angle;

        push();
        translate(pos.x,pos.y);
        rotate(angle);
        fill(0);
        ellipseMode(CENTER);
        ellipse(pos.x,pos.y,this.r,this.r);
        pop();
    }
}