class Shark{

    constructor(x,y){

        var options={

            'isStatic':false,
            'restitution':0.2,
            'friction':0.15,
            'density':0.1

        }

        this.body = Bodies.rectangle(x,y,300,80,options);
        this.width = 300;
        this.height =80;        
        this.image = loadImage("assets/shark.jpg");
       
        World.add(world,this.body);
       // this.Visiblity = 255;

    }

    remove(index){
       
        Matter.Body.setVelocity(shark[index].body,{x:0,y:20});
        
        setTimeout(() => {
            
            Matter.World.remove(world, shark[index].body);
            shark.splice(index, 1);
          }, 500);


    }

    display(){

        //if(this.body.position.y<500 && this.body.position.y>550){

           // World.remove(world,this.body);
        /*    push();
            this.Visiblity = this.Visiblity - 5;
            tint(255,this.Visiblity);
            image(this.image, this.body.position.x, this.body.position.y,this.radius*15,this.radius*4);
            pop();*/

       // }else{

            var pos = this.body.position; 
            //var angle = this.body.angle; 
       
            push();  
            //translate(pos.x,pos.y);
            //rotate(angle);
            //fill("brown");
            //stroke("brown");
            imageMode(CENTER);
            //ellipseMode(RADIUS);
            image(this.image,pos.x,pos.y,this.width,this.height);
            pop();
           
       // }

    }
}