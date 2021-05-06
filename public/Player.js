class Player {
    constructor(x,y,scl,primary) {
        this.pos = createVector(x,y);
        this.relativePos = createVector(x,y); //RElative to the world grid
        this.scl = scl;

        this.speed = scl / 10;

        this.angle = 0;

        this.col = [Math.random() * 255, Math.random() * 255, Math.random() * 255];

        this.health = 100;

        // this.primary = primary;

        this.gun = new Gun(this.scl);
        this.shooting = false;

        this.score = 0;
    }

    display(ctx, xOff, yOff) {
        ctx.save(); //Push the matrix

        ctx.translate(this.pos.x + xOff, this.pos.y + yOff);

        //Health bar (must be done before rotatoin)
        if(this.health > 20) {
            ctx.fillStyle = "green";
        } else {
            ctx.fillStyle = "red";
        }

        ctx.fillRect(-this.scl / 4, -this.scl / 2.3, map(this.health, 0, 100, 0, this.scl / 2), this.scl / 7);
        ctx.strokeRect(-this.scl / 4, -this.scl / 2.3, this.scl / 2, this.scl / 7);


        
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

        ctx.fillStyle = 'white';
        this.gun.display(ctx, scl / 7,scl / 9);
        
        ctx.restore(); //Pop the matrix
        
        ctx.fillStyle = 'black';
        ctx.font = '28px serif';
        ctx.textAlign = 'center';
        ctx.fillText(this.score,this.pos.x + xOff, this.pos.y + yOff + scl / 9);

    }

    update(socket) {
        let mouse = createVector(mouseX,mouseY);
        mouse.sub(this.pos);
        this.angle = mouse.heading();

        if(this.shooting) {
            this.gun.shoot(this.relativePos.x,this.relativePos.y,this.angle,socket);

        }

        this.gun.update();

        

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
            return true;
        } else {
            return false;
        }
        
    }

}

function map(n, min, max, start, end) {
    let numerator = end * (n - min) + start * (max - n);
    let denom = max - min;

    return numerator / denom;
}