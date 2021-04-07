class Zombie {
    constructor(scl, x, y) {
        this.scl = scl;
        this.pos = createVector(x, y);
        this.angle = 0;

        this.vel = createVector(0, 0);
        this.maxSpeed = this.scl * 0.05;

        this.damage = 1;
        this.attackCooldown = 50;
        this.timer = 50;

        this.health = 50;
    }

    display() {
        if(!this.dead) {
            ctx.save(); //Push the matrix
    
            ctx.translate(this.pos.x, this.pos.y);
           
            ctx.fillStyle = 'red';
            ctx.strokeStyle = 'black';

            ctx.fillRect(this.scl * -0.5, this.scl * -0.4,map(this.health,0,50,0,this.scl * 1), this.scl * 0.15 );
            ctx.strokeRect(this.scl * -0.5, this.scl * -0.4,this.scl * 1, this.scl * 0.15 )
            ctx.rotate(this.angle);
            

            ctx.fillStyle = 'black';
    
            //Arms
            ctx.fillRect(0, this.scl * -0.25, this.scl * 0.4, this.scl * 0.15);
            ctx.fillRect(0, this.scl * 0.25, this.scl * 0.4, this.scl * -0.15);
    
            ctx.fillStyle = 'green';
    
            //Head
            ctx.beginPath();
            ctx.arc(0, 0, this.scl * 0.25, 0, Math.PI * 2);
            ctx.closePath();
            
            ctx.fill();
            
            ctx.restore(); //Pop the matrix

        }
    }

    update() {
        //make sure he is alive
        if(this.health < 0) {
            this.dead = true;
            return;
        }

        if(this.timer >= 0) {
            this.timer--;
        }

        this.pos.add(this.vel);
        this.vel.mult(0); //Zero the velocity becuase the streering and avoiding behaviors are additive

    }

    seek(target) {
        let dir = target;
        dir.sub(this.pos); //Vector pointing from Zombie to target

        this.angle = dir.heading(); //Face the target

        let d = Math.sqrt(Math.pow(dir.x, 2) + Math.pow(dir.y, 2));

        dir.normalize();
        dir.mult(this.maxSpeed);

        if (d > this.scl / 1.8) {
            this.vel.add(dir);
            return false;
        } else {
            if(this.timer < 0) {
                this.timer += this.attackCooldown;
                return true;
            }
            return false;
        }

    }

    avoid(target) {
        let dir = target;
        dir.sub(this.pos);
        dir.mult(-1); //Vector pointing away from target

        let d = Math.sqrt(Math.pow(dir.x, 2) + Math.pow(dir.y, 2));

        dir.normalize();
        dir.mult(map(d, this.scl, 0, 0, this.maxSpeed)); //Magnitude of dir is proportional to distance to target

        if (d < this.scl / 1.2) {
            this.vel.add(dir);
        } 
    }

    hitBy(bullet) {
        let d = dist(this.pos.x,this.pos.y,bullet.pos.x,bullet.pos.y);
        if(d < this.scl * 0.25 +  this.scl * 0.1) { //Sum of bullet and zombie radii
            this.health -= bullet.damage;
            return true;
        }
        return false
    }
}

function map(x, min, max, newMin, newMax) {
    let slope = (newMax - newMin) / (max - min);
    output = newMin + slope * (x - min)
    return output;
}

function dist(x1,y1,x2,y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;

    return Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
}