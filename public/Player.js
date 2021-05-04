class Player {
    constructor(x,y,scl,primary) {
        this.pos = createVector(x,y);
        this.relativePos = createVector(x,y); //RElative to the world grid
        this.scl = scl;

        this.speed = scl / 10;

        this.angle = 0;

        this.col = [Math.random() * 255, Math.random() * 255, Math.random() * 255];

        // this.primary = primary;
    }

    display(ctx, xOff, yOff) {
        ctx.save(); //Push the matrix

        ctx.translate(this.pos.x + xOff, this.pos.y + yOff);
        ctx.rotate(this.angle);

        ctx.fillStyle = 'black';

        //Arms
        ctx.fillRect(0, this.scl * -0.20, this.scl * 0.25, this.scl * 0.10);
        ctx.fillRect(0, this.scl * 0.20, this.scl * 0.25, this.scl * -0.10);

        ctx.strokeStyle = 'black';
        ctx.fillStyle = `rgb(${this.col[0]},${this.col[1]},${this.col[2]})`;

        //Head
        ctx.beginPath();
        ctx.arc(0, 0, this.scl / 5, 0, Math.PI * 2);
        ctx.closePath();

        ctx.fill();
        ctx.stroke();

        ctx.restore(); //Pop the matrix



    }

    update() {
        let mouse = createVector(mouseX,mouseY);
        mouse.sub(this.pos);
        this.angle = mouse.heading();
    }

    canMove(mapKey, dx, dy) {


        let newPos = {
            x:this.relativePos.x + dx, 
            y:this.relativePos.y + dy
        };
        let index = {
            x: Math.floor(newPos.x / this.scl),
            y: Math.floor(newPos.y / this.scl)
        }
        if(mapKey[index.y][index.x] == 0) {
            // console.log("GREEN")
            return true;
        } else {
            // console.log("RED")
            return false;
        }
        
    }

}